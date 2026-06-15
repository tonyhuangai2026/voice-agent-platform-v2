import { createRouter, createWebHashHistory } from 'vue-router';
import { api } from '../api.js';

const DashboardView = () => import('../views/DashboardView.vue');
const HistoryView = () => import('../views/HistoryView.vue');
const WebDefaultsView = () => import('../views/WebDefaultsView.vue');
const PhoneDefaultsView = () => import('../views/PhoneDefaultsView.vue');
const DemosView = () => import('../views/DemosView.vue');
const McpServersView = () => import('../views/McpServersView.vue');
const UsersView = () => import('../views/UsersView.vue');
const LoginView = () => import('../views/LoginView.vue');
// Call views merged in from the old demo SPA (tech_design §3). MyHistoryView is
// the per-user "my calls" view (GET /api/history) — distinct from the admin-only
// full HistoryView above (GET /api/admin/history).
const TalkView = () => import('../views/TalkView.vue');
const MonitorView = () => import('../views/MonitorView.vue');
const MyHistoryView = () => import('../views/MyHistoryView.vue');

// SPA now serves at the site root (single-page merge, tech_design §2). Hash
// history with base '/' keeps client-side routing working under the FastAPI
// StaticFiles catch-all mount without a server rewrite.
export const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    { path: '/login', name: 'login', component: LoginView, meta: { public: true, title: 'Login' } },
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { title: 'Dashboard' } },
    { path: '/history', name: 'history', component: HistoryView, meta: { title: '历史记录' } },
    { path: '/web', name: 'web', component: WebDefaultsView, meta: { title: 'Web 默认' } },
    { path: '/phone', name: 'phone', component: PhoneDefaultsView, meta: { title: 'Phone 默认' } },
    { path: '/demos', name: 'demos', component: DemosView, meta: { title: 'Demo 管理' } },
    { path: '/mcp-servers', name: 'mcp', component: McpServersView, meta: { title: 'MCP Servers' } },
    { path: '/users', name: 'users', component: UsersView, meta: { title: '用户管理' } },
    // Call views (tech_design §3). Route names talk / monitor / my-history do
    // not collide with existing admin routes; menu wiring/role gating is T4.
    { path: '/talk', name: 'talk', component: TalkView, meta: { title: '通话演示' } },
    { path: '/monitor', name: 'monitor', component: MonitorView, meta: { title: '通话监听' } },
    { path: '/my-history', name: 'my-history', component: MyHistoryView, meta: { title: '我的通话历史' } },
  ],
});

// Global auth guard (tech_design §2). Every non-public route checks the
// session via GET /api/auth/me (cookie-based). Unauthenticated → /login.
// Visiting /login while already authenticated bounces to the home page.
router.beforeEach(async (to) => {
  let authed = false;
  try {
    await api.me();
    authed = true;
  } catch (e) {
    // Only a 401 means "not logged in"; treat other errors (network/5xx) as
    // unauthenticated too so the guard fails safe to the login page.
    authed = false;
  }

  if (to.meta?.public) {
    // Already signed in? Skip the login page.
    if (to.name === 'login' && authed) return { path: '/' };
    return true;
  }

  if (!authed) {
    return { name: 'login', query: to.fullPath !== '/' ? { redirect: to.fullPath } : undefined };
  }
  return true;
});
