#!/usr/bin/env bash
# One-shot deploy: tars local code, uploads to S3, creates/updates the stack.
#
# Usage:
#   cd deploy/
#   ./deploy.sh                                # interactive
#   MINIMAX_API_KEY=sk-... ./deploy.sh         # non-interactive
#   STACK_NAME=foo REGION=us-west-2 ./deploy.sh
#
# Requirements: aws CLI v2, bash, tar.

set -euo pipefail

STACK_NAME=${STACK_NAME:-genaiic-voicebot}
REGION=${REGION:-us-east-1}
INSTANCE_TYPE=${INSTANCE_TYPE:-t3.medium}

cd "$(dirname "$0")"
PROJECT_ROOT="$(cd .. && pwd)"

echo "-- Stack: $STACK_NAME  Region: $REGION  InstanceType: $INSTANCE_TYPE"

ACCOUNT=$(aws sts get-caller-identity --query Account --output text --region "$REGION")
BUCKET="${STACK_NAME}-deploy-${ACCOUNT}-${REGION}"

# 1. Ensure S3 bucket for code exists.
if ! aws s3api head-bucket --bucket "$BUCKET" --region "$REGION" 2>/dev/null; then
  echo "-- Creating S3 bucket: $BUCKET"
  if [ "$REGION" = "us-east-1" ]; then
    aws s3api create-bucket --bucket "$BUCKET" --region "$REGION"
  else
    aws s3api create-bucket --bucket "$BUCKET" --region "$REGION" \
      --create-bucket-configuration "LocationConstraint=$REGION"
  fi
  aws s3api put-public-access-block --bucket "$BUCKET" --region "$REGION" \
    --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
fi

# 2a. Build admin SPA (Vue 3 + Naive UI). dist/ ships in the tarball so the
# EC2 user-data does not need a separate build step. node_modules/ is excluded.
if [ -f "$PROJECT_ROOT/static/admin/package.json" ]; then
  echo "-- Building admin SPA (static/admin)"
  (
    cd "$PROJECT_ROOT/static/admin"
    if [ ! -d node_modules ]; then
      npm install --no-fund --no-audit
    fi
    npm run build
  )
fi

# 2b. Package the code (exclude dev junk).
TS=$(date +%Y%m%d-%H%M%S)
TARBALL=/tmp/voicebot-${TS}.tar.gz
echo "-- Packaging code -> $TARBALL"
tar -czf "$TARBALL" \
  --exclude='.venv' \
  --exclude='__pycache__' \
  --exclude='pipecat' \
  --exclude='.env' \
  --exclude='.git' \
  --exclude='.claude' \
  --exclude='*.wav' \
  --exclude='deploy' \
  --exclude='memory' \
  --exclude='voice-server/node_modules' \
  --exclude='voice-server/dist' \
  --exclude='static/admin/node_modules' \
  --exclude='static/admin/dist/.vite' \
  --exclude='config/runtime.json' \
  --exclude='tests/__pycache__' \
  -C "$PROJECT_ROOT" .

CODE_KEY="voicebot-${TS}.tar.gz"
echo "-- Uploading to s3://$BUCKET/$CODE_KEY"
aws s3 cp "$TARBALL" "s3://$BUCKET/$CODE_KEY" --region "$REGION"
rm -f "$TARBALL"

# 3. Prompt for MiniMax key if not in env.
MINIMAX_KEY="${MINIMAX_API_KEY:-}"
if [ -z "$MINIMAX_KEY" ]; then
  echo
  read -rsp "MiniMax API key (or blank to skip MiniMax TTS): " MINIMAX_KEY
  echo
fi

if [ -z "${SITE_PASSWORD:-}" ]; then
  echo
  read -rsp "Site password (blank = no auth): " SITE_PASSWORD
  echo
fi
export SITE_PASSWORD

if [ -z "${ADMIN_PASSWORD:-}" ]; then
  echo
  read -rsp "Admin UI password (blank = admin disabled): " ADMIN_PASSWORD
  echo
fi
export ADMIN_PASSWORD

# 4. Deploy.
echo "-- Deploying CloudFormation stack..."
aws cloudformation deploy \
  --stack-name "$STACK_NAME" \
  --template-file cloudformation.yaml \
  --region "$REGION" \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    "CodeBucket=$BUCKET" \
    "CodeKey=$CODE_KEY" \
    "MinimaxApiKey=$MINIMAX_KEY" \
    "SitePassword=${SITE_PASSWORD:-}" \
    "AdminPassword=${ADMIN_PASSWORD:-}" \
    "InstanceType=$INSTANCE_TYPE" \
  --no-fail-on-empty-changeset

echo
echo "-- Stack outputs:"
aws cloudformation describe-stacks --stack-name "$STACK_NAME" --region "$REGION" \
  --query 'Stacks[0].Outputs[*].[OutputKey,OutputValue]' --output table

echo
echo "-- CloudFront distribution may take 3-5 min to become fully available."
echo "   Tail the bot's boot log on the instance with:"
echo "     aws ssm start-session --target \$(aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION --query 'Stacks[0].Outputs[?OutputKey==\`InstanceId\`].OutputValue' --output text)"
echo "     sudo tail -f /var/log/user-data.log   # bootstrap"
echo "     sudo tail -f /var/log/voicebot.log    # running service"
