// WebSocket helpers. Demo SPA does NOT pass any config query params — the
// /ws and /monitor/ws endpoints read defaults from runtime_config (T3).
//
// Browsers cannot send Authorization on the WS handshake, and CloudFront
// strips it anyway. So we mint a short-lived ?token=... via /api/ws-token
// (the GET still goes over HTTPS with cached Basic Auth) and append it to
// the WS URL.

export function wsBaseUrl() {
  const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${proto}//${location.host}`;
}

async function fetchWsToken() {
  try {
    const res = await fetch('/api/ws-token', { credentials: 'include' });
    if (!res.ok) return '';
    const data = await res.json();
    return data?.token || '';
  } catch {
    return '';
  }
}

/** Open a WS to /ws (Talk mode). No config params — server uses runtime defaults. */
export async function openTalkWs() {
  const token = await fetchWsToken();
  const qs = token ? `?token=${encodeURIComponent(token)}` : '';
  const ws = new WebSocket(`${wsBaseUrl()}/ws${qs}`);
  ws.binaryType = 'arraybuffer';
  return ws;
}

/** Open a WS to /monitor/ws?call_id=... (Monitor mode). */
export async function openMonitorWs(callId) {
  const token = await fetchWsToken();
  const params = new URLSearchParams({ call_id: callId });
  if (token) params.set('token', token);
  const ws = new WebSocket(`${wsBaseUrl()}/monitor/ws?${params}`);
  ws.binaryType = 'arraybuffer';
  return ws;
}
