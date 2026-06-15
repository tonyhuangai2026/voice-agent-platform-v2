"""Demo loader: scan data/<demo>/ and expose them as scenario configs.

A demo is a directory containing:
  - manifest.yaml — id, label, lang, system / greeting / kb_intro / kb_ack as
    per-language dicts (key = language code: zh-HK / zh-CN / en-US / ja-JP).
    Optional `tools: [...]` field listing tool ids from
    :mod:`tools.registry`.
    Optional `mcp_servers: [...]` field listing MCP server ids from
    config/mcp_servers.json (see :mod:`mcp_config`). Ids are NOT
    validated against the registry at load time — servers can be
    created after the demo, so unknown ids are skipped (with a
    WARNING) at pipeline-build time instead.
  - kb.md — the knowledge base body, injected as a synthetic first user
    message into the LLM context. Optional now: a demo with no readable
    KB file is still loaded with ``kb_body = ""`` (or per-language empty
    strings) so that pure tool-only demos work.

Adding a new demo at runtime: drop a folder under data/, then call rescan().
The Admin UI exposes this via POST /api/admin/demos/rescan.

Skipped demos (validation failures) are recorded on
``DemoLoader.last_skipped`` as ``[{id, reason}, ...]`` for admin REST
diagnostics. The list is reset at the start of every :meth:`rescan`.
"""

from __future__ import annotations

import logging
import os
from typing import Any

import yaml

logger = logging.getLogger(__name__)


REQUIRED_FIELDS = ("id", "label", "lang")
LOCALIZED_REQUIRED = ("system", "greeting")  # must be per-language dicts
LOCALIZED_OPTIONAL = ("kb_intro", "kb_ack")  # also per-language if present


class DemoLoader:
    """Scans `data_root` for demos. Each subdirectory with a valid
    manifest.yaml becomes a usable demo. Invalid manifests are logged
    and skipped (with a reason recorded on ``last_skipped``); they don't
    crash the loader."""

    def __init__(self, data_root: str):
        self._data_root = data_root
        self._cache: dict[str, dict[str, Any]] = {}
        self.last_skipped: list[dict[str, str]] = []
        self.rescan()

    # ---- public API ----------------------------------------------------

    def list(self) -> list[dict[str, Any]]:
        """Return demo summaries (id, label, lang, kb_chars).

        For per-language KBs, kb_chars reports the total across all variants.
        """
        out = []
        for demo in self._cache.values():
            kb = demo.get("kb_body")
            if isinstance(kb, dict):
                kb_chars = sum(len(v or "") for v in kb.values())
            else:
                kb_chars = len(kb or "")
            out.append({
                "id": demo["id"],
                "label": demo["label"],
                "lang": demo["lang"],
                "kb_chars": kb_chars,
            })
        out.sort(key=lambda x: x["id"])
        return out

    def get(self, demo_id: str) -> dict[str, Any] | None:
        """Return the full demo dict (with system/greeting/kb_body) or None."""
        return self._cache.get(demo_id)

    def rescan(self) -> int:
        """Re-scan data_root, rebuild the cache. Returns count of demos found.

        Resets ``self.last_skipped`` to an empty list at the start, then
        appends ``{id, reason}`` entries for each demo that is rejected
        during this scan.
        """
        new_cache: dict[str, dict[str, Any]] = {}
        self.last_skipped = []
        if not os.path.isdir(self._data_root):
            logger.info(f"demo_loader: data root {self._data_root} missing, no demos")
            self._cache = new_cache
            return 0
        for entry in sorted(os.listdir(self._data_root)):
            sub = os.path.join(self._data_root, entry)
            if not os.path.isdir(sub):
                continue
            demo = self._load_one(sub)
            if demo is None:
                continue
            if demo["id"] in new_cache:
                reason = f"duplicate id {demo['id']} (in {sub})"
                logger.warning(f"demo_loader: {reason}; skipping")
                self.last_skipped.append({"id": demo["id"], "reason": reason})
                continue
            new_cache[demo["id"]] = demo
        self._cache = new_cache
        logger.info(
            f"demo_loader: scanned {self._data_root}, found {len(new_cache)} demos, "
            f"skipped {len(self.last_skipped)}"
        )
        return len(new_cache)

    # ---- internals -----------------------------------------------------

    def _record_skip(self, demo_id: str, reason: str) -> None:
        """Append a skip entry. ``demo_id`` may be the manifest id or a
        directory-derived placeholder when the id couldn't be parsed."""
        self.last_skipped.append({"id": demo_id, "reason": reason})

    def _load_one(self, dir_path: str) -> dict[str, Any] | None:
        manifest_path = os.path.join(dir_path, "manifest.yaml")
        # Use the directory basename as a fallback id for skip records when
        # we can't even parse the manifest. The real manifest id (if any)
        # overrides this once we have it.
        fallback_id = os.path.basename(dir_path.rstrip(os.sep)) or dir_path

        if not os.path.isfile(manifest_path):
            logger.info(f"demo_loader: no manifest.yaml in {dir_path}, skipping")
            # Not recorded in last_skipped: a directory with no manifest is
            # not a demo at all (might just be a stray folder), so it would
            # be noise in the admin "why was this skipped?" view.
            return None

        try:
            with open(manifest_path, "r", encoding="utf-8") as f:
                manifest = yaml.safe_load(f)
        except Exception as e:
            reason = f"failed to parse manifest.yaml: {type(e).__name__}: {e}"
            logger.warning(f"demo_loader: {manifest_path}: {reason}")
            self._record_skip(fallback_id, reason)
            return None

        if not isinstance(manifest, dict):
            reason = "manifest.yaml is not a YAML mapping"
            logger.warning(f"demo_loader: {manifest_path}: {reason}; skipping")
            self._record_skip(fallback_id, reason)
            return None

        # Use the manifest id for skip records once available.
        skip_id = manifest.get("id") or fallback_id

        for f in REQUIRED_FIELDS:
            if not manifest.get(f):
                reason = f"missing required field '{f}'"
                logger.warning(f"demo_loader: {manifest_path}: {reason}; skipping")
                self._record_skip(skip_id, reason)
                return None

        for f in LOCALIZED_REQUIRED:
            v = manifest.get(f)
            if not isinstance(v, dict) or not v:
                reason = (
                    f"field '{f}' must be a non-empty per-language dict "
                    f"(got {type(v).__name__})"
                )
                logger.warning(f"demo_loader: {manifest_path}: {reason}; skipping")
                self._record_skip(skip_id, reason)
                return None

        for f in LOCALIZED_OPTIONAL:
            v = manifest.get(f)
            if v is not None and not isinstance(v, dict):
                reason = f"field '{f}' if present must be a dict (got {type(v).__name__})"
                logger.warning(f"demo_loader: {manifest_path}: {reason}; skipping")
                self._record_skip(skip_id, reason)
                return None

        # ---- tools field -------------------------------------------------
        # Optional list of tool ids from tools.registry.REGISTRY. Unknown
        # ids are dropped with a warning so a typo'd manifest still loads
        # the rest of the demo (consistent with registry.get_tool_defs).
        tool_ids: list[str] = []
        raw_tools = manifest.get("tools")
        if raw_tools is None:
            tool_ids = []
        elif isinstance(raw_tools, list):
            # Lazy import to avoid a hard dep cycle if registry imports
            # something heavy. Today registry only pulls FunctionSchema +
            # call_control_tools, both lightweight, but the indirection
            # keeps demo_loader importable from migration scripts.
            try:
                from tools.registry import REGISTRY as _TOOL_REGISTRY  # noqa: WPS433
            except Exception as e:  # pragma: no cover — defensive
                logger.warning(
                    f"demo_loader: cannot import tools.registry "
                    f"({type(e).__name__}: {e}); accepting tool ids unvalidated"
                )
                _TOOL_REGISTRY = None  # type: ignore[assignment]
            for t in raw_tools:
                if not isinstance(t, str) or not t:
                    logger.warning(
                        f"demo_loader: {manifest_path}: ignoring non-string "
                        f"tool entry {t!r}"
                    )
                    continue
                if _TOOL_REGISTRY is not None and t not in _TOOL_REGISTRY:
                    logger.warning(
                        f"demo_loader: {manifest_path}: dropping unknown tool "
                        f"id {t!r} (not in tools.registry.REGISTRY)"
                    )
                    continue
                tool_ids.append(t)
        else:
            logger.warning(
                f"demo_loader: {manifest_path}: 'tools' must be a list of "
                f"strings (got {type(raw_tools).__name__}); using empty list"
            )
            tool_ids = []

        # ---- mcp_servers field --------------------------------------------
        # Optional list of MCP server ids from config/mcp_servers.json.
        # Unlike tools, ids are NOT validated here: servers may be created
        # in the admin UI *after* the demo manifest exists. Unknown /
        # disabled ids are skipped with a WARNING at pipeline-build time.
        mcp_server_ids: list[str] = []
        raw_mcp = manifest.get("mcp_servers")
        if raw_mcp is None:
            mcp_server_ids = []
        elif isinstance(raw_mcp, list):
            for m in raw_mcp:
                if not isinstance(m, str) or not m:
                    logger.warning(
                        f"demo_loader: {manifest_path}: ignoring non-string "
                        f"mcp_servers entry {m!r}"
                    )
                    continue
                mcp_server_ids.append(m)
        else:
            logger.warning(
                f"demo_loader: {manifest_path}: 'mcp_servers' must be a list "
                f"of strings (got {type(raw_mcp).__name__}); using empty list"
            )
            mcp_server_ids = []

        # ---- kb_path -----------------------------------------------------
        # `kb_path` accepts either:
        #   "kb.md"                                    — single file (legacy)
        #   {"en-US": "kb.en.md", "zh-HK": "kb.zh.md"} — per-language (preferred)
        # Missing / unreadable KB files are NOT a hard error any more —
        # they downgrade kb_body for that lang (or the whole demo) to "",
        # so a pure tool-only demo with no kb_path still loads.
        kb_path = manifest.get("kb_path")
        kb_body: Any
        if kb_path is None:
            # Manifest didn't declare a kb_path at all -> empty body.
            kb_body = ""
        elif isinstance(kb_path, dict):
            kb_body = {}
            for lang, rel in kb_path.items():
                if not isinstance(rel, str) or not rel:
                    logger.warning(
                        f"demo_loader: {manifest_path}: kb_path[{lang!r}] is "
                        f"not a non-empty string; using empty body for that lang"
                    )
                    kb_body[lang] = ""
                    continue
                full = os.path.join(dir_path, rel)
                if not os.path.isfile(full):
                    logger.warning(
                        f"demo_loader: kb file {full} not found for "
                        f"{manifest['id']}/{lang}; using empty kb_body for that lang"
                    )
                    kb_body[lang] = ""
                    continue
                try:
                    with open(full, "r", encoding="utf-8") as f:
                        kb_body[lang] = f.read()
                except Exception as e:
                    logger.warning(
                        f"demo_loader: failed to read {full}: {e}; "
                        f"using empty kb_body for {manifest['id']}/{lang}"
                    )
                    kb_body[lang] = ""
        else:
            kb_full = os.path.join(dir_path, str(kb_path))
            if not os.path.isfile(kb_full):
                logger.warning(
                    f"demo_loader: kb file {kb_full} not found for "
                    f"{manifest['id']}; using empty kb_body"
                )
                kb_body = ""
            else:
                try:
                    with open(kb_full, "r", encoding="utf-8") as f:
                        kb_body = f.read()
                except Exception as e:
                    logger.warning(
                        f"demo_loader: failed to read {kb_full}: {e}; "
                        f"using empty kb_body for {manifest['id']}"
                    )
                    kb_body = ""

        return {
            "id": manifest["id"],
            "label": manifest["label"],
            "lang": manifest["lang"],
            "system": manifest["system"],
            "greeting": manifest["greeting"],
            "kb_intro": manifest.get("kb_intro"),
            "kb_ack": manifest.get("kb_ack"),
            "kb_body": kb_body,  # str OR dict[lang -> str]
            "tool_ids": tool_ids,  # list[str], possibly empty
            "mcp_servers": mcp_server_ids,  # list[str], possibly empty
            "tags": manifest.get("tags") or [],
            "_dir": dir_path,
        }
