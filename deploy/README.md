# Deploy

One-click deploy of the voice bot to AWS:

- EC2 (Ubuntu 24.04, Python 3.12, `bot.py` under systemd)
- CloudFront (HTTPS, `*.cloudfront.net`, restricted origin access)
- IAM Role: Bedrock / Transcribe / Polly / Secrets Manager read
- Elastic IP + Security Group locked to CloudFront's origin-facing prefix list
- MiniMax API key kept in Secrets Manager
- **Inbound phone (PSTN)** via AWS Chime SDK Voice Connector → `voice-server/`
  (Node, SIP UAS) → `bot.py /phone/ws`. UDP 5060 (SIP) and UDP 10000-10999
  (RTP) are opened on the EC2 SG.

## Prerequisites

- AWS CLI v2 configured with credentials that can create IAM roles, EC2, CloudFront, S3, Secrets Manager.
- Region must be `us-east-1` (Nova Sonic availability + the hardcoded CloudFront prefix list).
  To deploy elsewhere, change `SourcePrefixListId` in `cloudformation.yaml`.

## Deploy

```bash
cd deploy
./deploy.sh
# or non-interactive:
MINIMAX_API_KEY=sk-... ./deploy.sh
```

The script:

1. Creates (or reuses) an S3 bucket `<stack>-deploy-<account>-<region>`.
2. Tars the project (excluding `.venv`, `pipecat/`, `.env`, `__pycache__`, etc.) and uploads it.
3. Deploys the CloudFormation stack. First deploy takes ~5-8 min (EC2 boot + pip install).
4. Prints the CloudFront URL.

## After deploy

Open the `URL` output in a browser. CloudFront needs 3-5 min to propagate after the stack finishes.

## Inbound phone setup (Chime SDK Voice Connector — manual)

CloudFormation can't fully automate Chime number provisioning, so do this once
in the AWS console after the stack is up:

1. **Chime SDK → Voice Connectors → Create Voice Connector** (region: `us-east-1`).
2. **Termination** tab — *not used* (we only do inbound). Leave defaults.
3. **Origination** tab → add a route to your EC2 instance:
   - Host: the EC2 public IP from CloudFormation outputs (`PublicIP`).
   - Port: `5060`, Protocol: `UDP`, Priority: `1`, Weight: `100`.
4. **Phone numbers** tab → assign or order a number → set its inbound
   route to this Voice Connector.
5. Update the EC2 SG (or the CFN template) to also allow Chime's media IP
   ranges if you want to lock down 0.0.0.0/0 — see
   <https://docs.aws.amazon.com/chime-sdk/latest/dg/network-config.html>.

Place a call to that number; you should hear the bot greet you in
Cantonese (PHONE_LANG default). Open the web UI in **Monitor** mode to
watch the conversation in real time.

To change phone defaults, edit the `PHONE_*` block in `/opt/voicebot/.env`
on the EC2 instance and `systemctl restart voicebot voiceserver`. (These
defaults are written by the CFN template's user-data; long-term, edit them
in `cloudformation.yaml` and redeploy.)

## Updating code

Just re-run `./deploy.sh`. A new tarball is uploaded; CloudFormation sees a parameter change and
re-runs the user-data on a replacement instance.

For faster iteration during dev:

```bash
# grab the running instance id
INSTANCE_ID=$(aws cloudformation describe-stacks --stack-name genaiic-voicebot \
  --query 'Stacks[0].Outputs[?OutputKey==`InstanceId`].OutputValue' --output text)

# open a session
aws ssm start-session --target "$INSTANCE_ID"

# pull fresh code and restart on the box
sudo -i
cd /opt/voicebot
aws s3 cp s3://<bucket>/<key>.tar.gz /tmp/code.tar.gz
tar -xzf /tmp/code.tar.gz -C /opt/voicebot
systemctl restart voicebot
tail -f /var/log/voicebot.log
```

## Tearing down

```bash
aws cloudformation delete-stack --stack-name genaiic-voicebot --region us-east-1
# S3 bucket keeps the code tarballs; delete it manually if you want:
aws s3 rb s3://genaiic-voicebot-deploy-<account>-us-east-1 --force
```

## Cost (rough, us-east-1)

- EC2 t3.medium: ~$30/month on-demand (cheaper with Savings Plan)
- Elastic IP: free while attached
- CloudFront: first 1 TB free, typical demo < $1/month
- Secrets Manager: $0.40/secret/month
- S3: pennies

Plus usage: Bedrock / Transcribe / Polly / Nova Sonic / MiniMax are billed by the call.

## Troubleshooting

- **Stack waits 15 min then fails at Instance signal**: bootstrap script crashed.
  `aws ssm start-session --target <InstanceId>` then `sudo tail /var/log/user-data.log`.
- **`curl https://<cloudfront>/` returns 502/504**: instance not up yet, or 7860 not listening.
  Check `sudo systemctl status voicebot` and `sudo tail /var/log/voicebot.log`.
- **Browser 403 on WebSocket**: CloudFront propagation not complete; wait a few minutes.
- **MiniMax TTS 401**: secret is empty or wrong. Update in Secrets Manager or redeploy with `MINIMAX_API_KEY=... ./deploy.sh`.

## Security notes

- SSH is **not** exposed. Use **SSM Session Manager** (`aws ssm start-session --target <id>`).
- EC2 inbound: only port 7860 from CloudFront's AWS-managed origin-facing prefix list.
- The S3 deploy bucket is created with all public access blocked.
- `MinimaxApiKey` is `NoEcho: true` in the template and stored in Secrets Manager, not as a plain
  environment variable in the task definition.
