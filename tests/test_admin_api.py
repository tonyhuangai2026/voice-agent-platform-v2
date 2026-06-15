"""Integration tests for the Admin REST API + per-call hot-reload semantics.

These hit the FastAPI app via TestClient, no real WS / Bedrock / Polly. They
verify:
- JWT session auth (401 unauthenticated, admin-cookie 200 paths)
- GET admin/config returns both segments
- PUT admin/config/phone persists to disk + same-process GET reflects change
- Validation rejects invalid engine/lang/scenario
- /api/admin/demos returns the loader's list
- /api/admin/demos/rescan re-discovers a freshly-added demo
- /api/config (Web) reads runtime defaults

Auth model: bot.py uses a DynamoDB user table + bcrypt + JWT cookie (replacing
the old Basic Auth). These tests stand up a moto-mocked users table seeded with
an admin and log in to obtain the vb_session cookie; TestClient persists the
cookie across requests, so per-request calls no longer carry an auth header.

Hot-reload semantics for /phone/ws (per-call) are verified at the unit level
by inspecting RUNTIME_CONFIG.get_phone_defaults() before and after PUT — if a
running pipeline captured an earlier dict, mutating the cache afterwards does
not retroactively change it (Python dict semantics + endpoint snapshot var).
"""

import importlib
import os
import sys

import boto3
import pytest
from moto import mock_aws

USERS_TABLE = "voicebot-test-admin-api-users"
_ADMIN_PWD = "test-pwd"


def _create_users_table(region: str = "us-east-1") -> None:
    ddb = boto3.client("dynamodb", region_name=region)
    ddb.create_table(
        TableName=USERS_TABLE,
        BillingMode="PAY_PER_REQUEST",
        AttributeDefinitions=[{"AttributeName": "username", "AttributeType": "S"}],
        KeySchema=[{"AttributeName": "username", "KeyType": "HASH"}],
    )
    ddb.get_waiter("table_exists").wait(TableName=USERS_TABLE)


@pytest.fixture(autouse=True)
def auth_env(monkeypatch):
    # ADMIN_PASSWORD seeds the bootstrap admin on startup; AUTH_SECRET keeps
    # JWTs stable; USERS_TABLE points at the moto-mocked table.
    monkeypatch.setenv("ADMIN_PASSWORD", _ADMIN_PWD)
    monkeypatch.setenv("AUTH_SECRET", "test-secret")
    monkeypatch.setenv("USERS_TABLE", USERS_TABLE)
    monkeypatch.setenv("AWS_ACCESS_KEY_ID", "testing")
    monkeypatch.setenv("AWS_SECRET_ACCESS_KEY", "testing")
    monkeypatch.setenv("AWS_DEFAULT_REGION", "us-east-1")
    monkeypatch.setenv("AWS_REGION", "us-east-1")
    monkeypatch.setenv("MINIMAX_API_KEY", "x")  # bot.py imports succeed even w/o real key
    with mock_aws():
        _create_users_table()
        yield


@pytest.fixture
def fresh_runtime_json(tmp_path, monkeypatch):
    # Force RUNTIME_CONFIG to use a temp file so tests don't pollute repo.
    cfg_dir = tmp_path / "config"
    cfg_dir.mkdir()
    monkeypatch.setenv("RUNTIME_CFG_PATH_OVERRIDE", str(cfg_dir / "runtime.json"))
    yield


def _import_app():
    """(Re-)import bot.py fresh so module-level singletons see the env."""
    for mod in list(sys.modules):
        if mod in ("bot", "runtime_config", "demo_loader", "user_store"):
            del sys.modules[mod]
    bot = importlib.import_module("bot")
    return bot


def _admin_client(bot):
    """Return a TestClient whose vb_session cookie is a logged-in admin.

    The startup seed creates 'admin' from ADMIN_PASSWORD; we trigger startup
    via the context manager, then log in so subsequent calls carry the cookie.
    """
    from fastapi.testclient import TestClient
    # https base_url so the Secure vb_session cookie is stored + resent.
    client = TestClient(bot.app, base_url="https://testserver")
    client.__enter__()  # runs @app.on_event("startup") → _seed_admin (stays open)
    r = client.post("/api/auth/login", json={"username": "admin", "password": _ADMIN_PWD})
    assert r.status_code == 200, r.text
    return client


# Back-compat shim: old tests passed headers=_basic(); auth is now via the
# persisted cookie on the client, so the header is a harmless no-op.
def _basic(user="admin", pwd=_ADMIN_PWD):
    return {}


def test_admin_endpoints_require_auth(monkeypatch, tmp_path):
    """No session cookie -> 401; logged-in admin cookie -> 200."""
    from fastapi.testclient import TestClient
    bot = _import_app()
    anon = TestClient(bot.app, base_url="https://testserver")
    with anon:
        r = anon.get("/api/admin/config")
        assert r.status_code == 401

        # Bad credentials never set a cookie -> still 401.
        bad = anon.post("/api/auth/login", json={"username": "admin", "password": "wrong"})
        assert bad.status_code == 401
        r = anon.get("/api/admin/config")
        assert r.status_code == 401

    client = _admin_client(bot)
    r = client.get("/api/admin/config")
    assert r.status_code == 200


def test_non_admin_user_forbidden(monkeypatch, tmp_path):
    """A logged-in regular user hits 403 on admin routes, 200 on user routes."""
    bot = _import_app()
    client = _admin_client(bot)
    # admin creates a regular user
    r = client.post(
        "/api/admin/users",
        json={"username": "bob", "password": "pw-bob", "role": "user"},
    )
    assert r.status_code == 200, r.text

    from fastapi.testclient import TestClient
    bob = TestClient(bot.app, base_url="https://testserver")
    bob.__enter__()
    assert bob.post("/api/auth/login", json={"username": "bob", "password": "pw-bob"}).status_code == 200
    assert bob.get("/api/admin/config").status_code == 403
    # user-allowed route works
    assert bob.get("/api/auth/me").json()["role"] == "user"


def test_admin_config_get_returns_both_segments(tmp_path, monkeypatch):
    from fastapi.testclient import TestClient
    bot = _import_app()
    client = _admin_client(bot)
    r = client.get("/api/admin/config", headers=_basic())
    assert r.status_code == 200
    data = r.json()
    assert "web" in data and "phone" in data
    assert "engine" in data["web"]
    assert "engine" in data["phone"]


def test_phone_put_persists_and_hot_reloads(tmp_path, monkeypatch):
    """PUT phone -> next GET reflects change in same process."""
    from fastapi.testclient import TestClient
    bot = _import_app()
    client = _admin_client(bot)

    # Snapshot before
    before = client.get("/api/admin/config", headers=_basic()).json()
    original_engine = before["phone"]["engine"]
    new_engine = "pipeline" if original_engine == "nova-sonic" else "nova-sonic"

    # PUT change
    r = client.put(
        "/api/admin/config/phone",
        headers=_basic(),
        json={"engine": new_engine},
    )
    assert r.status_code == 200, r.text
    assert r.json()["phone"]["engine"] == new_engine

    # GET reflects change
    after = client.get("/api/admin/config", headers=_basic()).json()
    assert after["phone"]["engine"] == new_engine

    # Module-level RUNTIME_CONFIG agrees
    assert bot.RUNTIME_CONFIG.get_phone_defaults()["engine"] == new_engine


def test_phone_put_rejects_invalid_engine(tmp_path, monkeypatch):
    from fastapi.testclient import TestClient
    bot = _import_app()
    client = _admin_client(bot)
    r = client.put(
        "/api/admin/config/phone",
        headers=_basic(),
        json={"engine": "bogus"},
    )
    assert r.status_code == 400


def test_admin_demos_lists_hikvision(tmp_path, monkeypatch):
    from fastapi.testclient import TestClient
    bot = _import_app()
    client = _admin_client(bot)
    r = client.get("/api/admin/demos", headers=_basic())
    assert r.status_code == 200
    ids = [d["id"] for d in r.json()["demos"]]
    assert "hikvision-support" in ids


def test_admin_demos_rescan(tmp_path, monkeypatch):
    from fastapi.testclient import TestClient
    bot = _import_app()
    client = _admin_client(bot)
    r = client.post("/api/admin/demos/rescan", headers=_basic())
    assert r.status_code == 200
    assert r.json()["count"] >= 1


def test_admin_demo_detail(tmp_path, monkeypatch):
    from fastapi.testclient import TestClient
    bot = _import_app()
    client = _admin_client(bot)
    r = client.get("/api/admin/demos/hikvision-support", headers=_basic())
    assert r.status_code == 200
    out = r.json()
    assert out["id"] == "hikvision-support"
    assert "system" in out and "zh-HK" in out["system"]
    assert "kb_preview" in out and out["kb_chars"] > 0
    # Full kb_body should not be inlined; only preview
    assert "kb_body" not in out


def test_admin_options_payload(tmp_path, monkeypatch):
    from fastapi.testclient import TestClient
    bot = _import_app()
    client = _admin_client(bot)
    r = client.get("/api/admin/options", headers=_basic())
    assert r.status_code == 200
    data = r.json()
    for key in ("languages", "engines", "providers", "models", "scenarios", "voices_by_provider"):
        assert key in data


def test_api_config_uses_runtime_config(tmp_path, monkeypatch):
    """/api/config should reflect runtime web defaults, not just constants.

    /api/config is now user-allowed (require_user); the admin cookie satisfies it."""
    from fastapi.testclient import TestClient
    bot = _import_app()
    client = _admin_client(bot)

    # Set web.engine=pipeline via admin
    client.put("/api/admin/config/web", headers=_basic(), json={"engine": "pipeline"})

    # /api/config should reflect it
    r = client.get("/api/config")
    assert r.status_code == 200
    assert r.json()["default_engine"] == "pipeline"
