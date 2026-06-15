// zh-CN — ground truth bundle for the admin SPA.
//
// Every hard-coded Chinese string currently in static/admin/src/**.vue (and
// the user-facing strings in router/index.js) lives here. T3 will replace
// the in-template literals with t('namespace.key') calls; T5 will translate
// these values into en/ja/ko/es/fr.
//
// Namespace layout follows tech_design §3.5:
//   common         — generic verbs / states reused across pages
//   app            — top-level shell (brand, nav, header tags)
//   dashboard      — DashboardView
//   history        — HistoryView (filters, columns, drawer, enums, toast msgs)
//   demos          — DemosView
//   web            — WebDefaultsView wrapper
//   phone          — PhoneDefaultsView wrapper
//   defaultsForm   — DefaultsForm (shared by web + phone)
//   historySummary — _HistorySummary (Summary block extras toggle)

export default {
  common: {
    unknown: "(unknown)",
    dash: "—",
    online: '在线',
    offline: '离线',
    refresh: '刷新',
    save: '保存',
    cancel: '取消',
    confirm: '确认',
    delete: '删除',
    edit: '编辑',
    create: '新建',
    reset: '恢复',
    loading: '加载中...',
    empty: '暂无数据',
    actions: '操作',
    toggleDark: '切换深色',
    toggleLight: '切换浅色',
    language: '语言',
    yes: '是',
    no: '否',
    all: '全部',
    placeholderDash: '—',
  },

  app: {
    brand: 'Voice Bot Admin',
    sub: '运行时配置 · Demo 管理',
    nav: {
      groupOverview: '概览',
      groupConfig: '配置',
      groupCall: '通话',
      groupAdmin: '管理',
      dashboard: 'Dashboard',
      history: '历史记录',
      web: 'Web 默认',
      phone: 'Phone 默认',
      demos: 'Demo 管理',
      mcp: 'MCP 服务器',
      talk: '通话',
      monitor: '监听',
      myHistory: '我的历史',
      users: '用户管理',
    },
    user: {
      logout: '退出登录',
    },
  },

  login: {
    subtitle: '请登录以继续',
    username: '用户名',
    usernamePlaceholder: '请输入用户名',
    password: '密码',
    passwordPlaceholder: '请输入密码',
    submit: '登录',
    errors: {
      usernameRequired: '请输入用户名',
      passwordRequired: '请输入密码',
      invalidCredentials: '用户名或密码错误',
      generic: '登录失败：{msg}',
    },
  },

  setup: {
    subtitle: '首次访问 · 设置管理员',
    intro: '该部署尚未初始化。请创建第一个管理员账号以继续；创建后将自动登录。',
    username: '用户名',
    usernamePlaceholder: '请设置管理员用户名',
    password: '密码',
    passwordPlaceholder: '请设置管理员密码',
    confirm: '确认密码',
    confirmPlaceholder: '请再次输入密码',
    submit: '创建管理员',
    errors: {
      usernameRequired: '请输入用户名',
      passwordRequired: '请输入密码',
      passwordsMismatch: '两次输入的密码不一致',
      alreadyInitialized: '该部署已初始化，请前往登录页。',
      invalidInput: '用户名和密码不能为空。',
      generic: '创建失败：{msg}',
    },
  },

  dashboard: {
    title: 'Dashboard',
    subtitle: '实时通话指标 · 7s 轮询',
    updatedAt: '· 更新于 {time}',
    statusOnline: '指标在线',
    statusFailed: '指标拉取失败',
    refresh: '刷新',
    notice: {
      header: '口径说明',
      body:
        '<strong>Active calls</strong> 来自进程内 ACTIVE_SESSIONS（phone + web 都计入）；' +
        '<strong>Today / 24h 系列指标</strong>（总数、平均时长、Outcome / Engine / Demo 分布、转人工率、峰值并发）' +
        '基于 DDB 表 <code>genaiic-voicebot-call-history</code>，<strong>仅 phone 通话落表</strong>，web 会话不持久化。',
    },
    cards: {
      activeCalls: 'Active calls (phone + web)',
      activeCallsSuffix: 'in-process',
      todayCalls: 'Today phone calls',
      todayCallsSuffix: 'UTC day',
      avgDuration: 'Avg duration today (phone)',
      avgDurationSuffix: 's',
      transferRate: 'Transfer rate 24h (phone)',
      transferRateSuffix: '%',
      topDemo: 'Top demo 24h (phone)',
      peakConcurrent: 'Peak concurrent 24h (phone)',
      peakConcurrentSuffix: 'sweep-line',
    },
    sections: {
      metricsTitle: '核心指标',
      distributionsTitle: '分布',
      outcomeTitle: 'Outcome 24h (phone)',
      engineTitle: 'Engine 24h (phone)',
      demoTitle: 'Demo 24h (phone)',
      total: '共 {n}',
      totalLabel: '总计',
      empty: '暂无数据',
    },
    emptyState: '指标加载失败,请稍后再试或点右上角刷新。',
    messages: {
      loadFailed: 'Dashboard 指标加载失败: {msg}',
    },
  },

  history: {
    title: '历史记录',
    subtitle: '通话历史浏览 · DDB 游标分页 · 支持筛选 / CSV / Markdown 导出 / 按需摘要',
    filters: {
      caller: 'Caller',
      callerPlaceholder: '+12025550123',
      outcome: 'Outcome',
      engine: 'Engine',
      demo: 'Demo',
      dateRange: '日期范围 (UTC)',
      all: '全部',
    },
    columns: {
      startedAt: 'Started (UTC)',
      caller: 'Caller',
      outcome: 'Outcome',
      engine: 'Engine',
      demo: 'Demo',
      duration: 'Duration',
      summary: 'Summary',
      actions: '操作',
    },
    emptyTitle: '未找到通话',
    emptyDesc: '当前筛选条件下没有匹配的通话记录。请调整上方筛选或等待新通话写入。',
    actions: {
      refresh: '刷新',
      view: 'View',
      exportCsv: '导出 CSV',
      downloadMd: '下载 MD',
      summarize: '生成摘要',
      loadMore: '加载更多',
      noMore: '没有更多了',
      loadedRows: '已加载 {n} 行',
    },
    detail: {
      titlePrefix: 'Call {id}',
      caller: 'Caller',
      startedAt: 'Started (UTC)',
      endedAt: 'Ended (UTC)',
      duration: 'Duration',
      engine: 'Engine',
      demo: 'Demo',
      lang: 'Lang',
      outcome: 'Outcome',
      transferred: 'Transferred',
      transferYes: '是',
      transferNo: '否',
      turns: 'Turns',
      summary: 'Summary',
      transcript: 'Transcript',
      noTurns: '没有 turns 数据',
      noSummary: '[未生成]',
    },
    enums: {
      outcome: {
        user_requested: '用户挂断',
        task_completed: '任务完成',
        transferred: '已转人工',
        timeout: '超时',
        error: '错误',
        unknown: '未知',
      },
      summary: {
        ok: '已生成',
        pending: '待生成',
        failed: '生成失败',
      },
    },
    messages: {
      loadFailed: '加载失败: {msg}',
      loadMoreFailed: '加载更多失败: {msg}',
      detailFailed: '加载详情失败: {msg}',
      summaryUpdated: '摘要已更新',
      summarizeFailed: '生成摘要失败: {msg}',
    },
  },

  demos: {
    title: 'Demo 管理',
    subtitle: 'data/<demo>/manifest.yaml + kb.md + 全局工具库 自动发现',
    actions: {
      rescan: '重新扫描',
      reset: '恢复',
      save: '保存',
    },
    notice:
      '添加新 demo: <code>mkdir data/&lt;demo-id&gt;/</code> 放入 ' +
      '<code>manifest.yaml</code> + <code>kb.md</code>，点"重新扫描"即可生效。' +
      'Tools 由全局工具库 (<code>tools/registry.py</code>) 提供，每个 demo 在右侧抽屉 ' +
      'Tools 标签页勾选启用。',
    columns: {
      id: 'ID',
      label: 'Label',
      lang: 'Main Language',
      kbChars: 'KB 字符',
      tools: 'Tools',
    },
    emptyTitle: '未发现 Demo',
    emptyDesc: '在 data/ 下新建一个含 manifest.yaml + kb.md 的 demo 目录，然后点击重新扫描即可收录。',
    detail: {
      id: 'ID',
      mainLang: '主语言',
      kbChars: 'KB 字符数',
      tags: '标签',
      tabs: {
        system: 'System Prompt',
        greeting: 'Greeting',
        kb: 'KB 摘要',
        tools: 'Tools',
        mcp: 'MCP 服务器',
        translate: '一键翻译',
      },
      kbHint: '前 500 字符 · 完整内容请直接看 kb.md',
      toolsHint:
        '勾选要为该 demo 启用的 LLM 工具。保存后写回 ' +
        '<code>data/{id}/manifest.yaml</code> 的 ' +
        '<code>tools:</code> 字段，并立即生效（下一通新会话）。',
      noTools: {
        header: '未发现可用工具',
        body:
          '<code>GET /api/admin/tools</code> 返回空列表 — 请检查后端 ' +
          '<code>tools/registry.py</code> 是否已就绪。',
      },
      mcpHint:
        '勾选要为该 demo 挂载的 MCP 服务器。保存后写回 ' +
        '<code>data/{id}/manifest.yaml</code> 的 ' +
        '<code>mcp_servers:</code> 字段，并在下一通新会话生效。',
      mcpDisabledTag: '已禁用',
      mcpMissingTag: '不存在',
      noMcp: {
        header: '没有可用的 MCP 服务器',
        body:
          '尚未注册任何 MCP 服务器 — 请先在 <strong>MCP 服务器</strong> ' +
          '页面添加，再回到这里挂载。',
      },
    },
    messages: {
      loadFailed: '加载 Demo 列表失败: {msg}',
      toolsLoadFailed: '加载工具库失败: {msg}',
      rescanDone: '扫描完成，发现 {n} 个 demo',
      rescanFailed: '扫描失败: {msg}',
      toolsSaved: 'Tools 已保存',
      mcpSaved: 'MCP 服务器已保存',
      mcpLoadFailed: '加载 MCP 服务器失败: {msg}',
      saveFailed: '保存失败: {msg}',
      detailFailed: '加载详情失败: {msg}',
    },
    translate: {
      hint:
        '选择目标语言一键翻译该 demo 的本地化字段（system / greeting 等），' +
        '由 LLM 生成后可在下方校对，再确认写回 ' +
        '<code>data/{id}/manifest.yaml</code>。',
      selectPlaceholder: '选择目标语言',
      translateBtn: '翻译',
      optionPresent: '已存在',
      optionMissing: '缺失',
      missingHint: '该 demo 缺 {lang}，点击翻译一键生成。',
      existsHint: '{lang} 已存在，写回需确认覆盖。',
      previewTitle: '译文预览（{lang}）',
      previewHint: '请校对以下译文，确认无误后点击写回。',
      sourceLabel: '源语言：{lang}',
      writeBackBtn: '确认写回',
      messages: {
        empty: '该 demo 没有可翻译的本地化字段',
        translateFailed: '翻译失败: {msg}',
        badRequest: '无法翻译: {msg}',
        overwriteNeeded: '{lang} 已存在，请再次点击以确认覆盖写回。',
        writeBackDone: '已写回 {lang}',
        writeBackFailed: '写回失败: {msg}',
      },
    },
  },

  web: {
    title: 'Web 默认配置',
    subtitle: '浏览器 /ws 入口的默认引擎、语言、Demo、音色',
    alert: '保存后，新建浏览器会话生效（刷新页面即拿新默认）。已打开的会话不受影响。',
    routeTitle: 'Web 默认',
  },

  phone: {
    title: 'Phone 默认配置',
    subtitle: 'PSTN 呼入 /phone/ws 默认引擎、语言、Demo、音色',
    alert: '保存后，下一通新通话生效（per-call hot-reload）。进行中的通话不变；不需要重启服务。',
    routeTitle: 'Phone 默认',
  },

  defaultsForm: {
    sections: {
      engineDemo: '对话引擎与 Demo',
      voice: '音色',
      pipeline: 'Pipeline 模式 (LLM / TTS)',
    },
    pipelineHint: '以下 LLM / TTS / MiniMax 字段仅在 engine = pipeline 时使用; nova-sonic 走端到端不读取它们(音色仍可在上方选择)。',
    polyglot: '全语言',
    fields: {
      engine: 'Engine',
      lang: 'Language',
      demo: 'Demo',
      llmModel: 'LLM Model',
      ttsProvider: 'TTS Provider',
      voiceId: 'Voice ID',
      novaVoiceId: 'Nova Sonic 音色',
      minimaxModel: 'MiniMax Model',
    },
    actions: {
      reset: '恢复',
      save: '保存',
    },
    messages: {
      loadFailed: '加载失败: {msg}',
      noChanges: '没有改动',
      saved: '已保存',
      saveFailed: '保存失败: {msg}',
      restored: '已恢复',
    },
  },

  mcp: {
    title: 'MCP 服务器',
    subtitle: '全局 Model Context Protocol 服务器注册表 · 在 Demo 页面按需挂载',
    notice:
      '这些服务器保存在全局注册表中，可按 demo 挂载。仅允许 ' +
      '<code>sse</code> 与 <code>streamable_http</code> 两种 transport' +
      '（出于安全考虑禁用 <code>stdio</code>）。Header 值为只写 — ' +
      '已存密钥会被掩码，不会回传到浏览器。',
    columns: {
      id: 'ID',
      label: 'Label',
      transport: 'Transport',
      auth: '鉴权',
      url: 'URL',
      enabled: '启用',
    },
    authType: {
      none: '无',
      header: 'Header',
      sigv4: 'AWS SigV4',
    },
    emptyTitle: '暂无 MCP 服务器',
    emptyDesc: '注册一个 Model Context Protocol 服务器后，可在 Demos 页面按需挂载到各 demo。',
    actions: {
      add: '添加服务器',
      test: '测试',
    },
    enabledTag: {
      on: '已启用',
      off: '已禁用',
    },
    form: {
      titleNew: '添加 MCP 服务器',
      titleEdit: '编辑 MCP 服务器',
      id: 'ID',
      idHint: '小写字母、数字与连字符；2–63 字符。创建后不可修改。',
      label: 'Label',
      transport: 'Transport',
      url: 'URL',
      urlPlaceholder: 'https://example.com/mcp',
      enabled: '启用',
      auth: '鉴权',
      sigv4Hint: '连接时使用实例 IAM 角色以 AWS SigV4 签名请求，不保存任何密钥。',
      sigv4Service: 'Service',
      sigv4Region: 'Region',
      headers: 'Headers',
      headersHint: '可选 HTTP header（如 Authorization）。值作为密钥保存，读取时掩码。',
      headerKey: 'Header 名称',
      headerValuePlaceholder: '*** (保持不变)',
      headerValueNewPlaceholder: '值',
      addHeader: '添加 Header',
    },
    deleteConfirm: {
      title: '删除 MCP 服务器',
      body: '删除 MCP 服务器 "{id}"？此操作不可撤销。',
    },
    test: {
      okTitle: '已连接 "{id}" · {n} 个工具',
      okEmpty: '已连接 "{id}"，但未暴露任何工具',
      failTitle: '连接 "{id}" 失败',
    },
    messages: {
      loadFailed: '加载 MCP 服务器失败: {msg}',
      saved: '已保存',
      saveFailed: '保存失败: {msg}',
      deleted: '已删除',
      deleteFailed: '删除失败: {msg}',
      deleteRefused: '无法删除 "{id}" — 仍被以下 demo 挂载: {demos}。请先在那里卸载。',
      testFailed: '测试失败: {msg}',
    },
  },

  historySummary: {
    moreFields: 'more fields ({n})',
  },

  users: {
    title: '用户管理',
    subtitle: 'JWT 会话账号 · 角色 + 重置密码 + 启用/禁用',
    emptyTitle: '暂无用户',
    emptyDesc: '创建第一个用户账号以授予控制台访问权限。',
    actions: {
      add: '新建用户',
      makeAdmin: '设为管理员',
      makeUser: '设为普通用户',
      resetPw: '重置密码',
      enable: '启用',
      disable: '禁用',
    },
    columns: {
      username: '用户名',
      role: '角色',
      status: '状态',
      createdAt: '创建时间',
    },
    roles: {
      admin: '管理员',
      user: '普通用户',
    },
    status: {
      active: '正常',
      disabled: '已禁用',
    },
    form: {
      titleNew: '创建用户',
      titleResetPw: '重置密码 · {username}',
      username: '用户名',
      usernameHint: '字母、数字、点、连字符和下划线；2 到 64 个字符。',
      password: '密码',
      newPassword: '新密码',
      passwordPlaceholder: '请输入密码',
      role: '角色',
    },
    deleteConfirm: {
      title: '删除用户',
      body: '确定删除用户 “{username}” 吗？此操作不可撤销。',
    },
    messages: {
      loadFailed: '加载用户失败：{msg}',
      created: '已创建用户 “{username}”',
      createFailed: '创建失败：{msg}',
      roleChanged: '“{username}” 的角色已改为 {role}',
      pwReset: '已重置 “{username}” 的密码',
      enabled: '已启用用户 “{username}”',
      disabled: '已禁用用户 “{username}”',
      updateFailed: '更新失败：{msg}',
      deleted: '已删除用户 “{username}”',
      deleteFailed: '删除失败：{msg}',
    },
  },

  // --- Call views merged from the demo SPA (tech_design §3) ---
  // talk / monitor / debug come from the demo views verbatim; myHistory is
  // the demo's per-user call-history view (renamed from `history` to avoid
  // colliding with admin's full HistoryView `history` namespace).
  talk: {
    actions: {
      summarize: '生成对话总结 (Markdown)',
      debug: '调试 / 事件流',
    },
    status: {
      ready: '准备就绪',
      connecting: '连接中…',
      recording: '录音中…',
    },
    button: {
      start: '开始',
      connecting: '连接中…',
      stop: '停止',
    },
    defaultsHint: '引擎 / 语言 / 场景由 Admin 配置, 改默认请去 {adminLink}',
    defaultsHintAdminLabel: 'Admin',
    bubbles: {
      empty: '点击中间按钮开始对话',
      whoUser: '我',
      whoBot: 'Bot',
      partial: '实时',
    },
    drawerTitle: '事件流 (调试)',
    summary: {
      title: '对话总结',
      generating: '生成中…',
      failed: '总结失败: {msg}',
    },
    errors: {
      loadConfig: '加载配置失败: {msg}',
      mic: '麦克风初始化失败: {msg}',
      ws: 'WebSocket 连接失败',
      start: '启动失败: {msg}',
    },
  },
  monitor: {
    status: {
      online: '在线',
      ended: '已结束',
      noCalls: '无通话',
      idle: '空闲',
    },
    refreshTooltip: '立即刷新通话列表',
    empty: {
      noActive: '当前无活跃通话',
      noActiveHint: '拨打 PSTN 号码或在 /talk 页面发起 Web 会话即可在此监听。',
      noSelection: '请选择一通通话',
      noSelectionHint: '在左侧选择一通进行中的通话即可实时查看其事件流。',
      noEvents: '等待事件…',
    },
    callItem: {
      live: 'LIVE',
    },
    rel: {
      seconds: '{n}s ago',
      minutes: '{n}m ago',
      hours: '{n}h ago',
    },
    eventBody: {
      start: '▶ start',
      end: '■ end',
    },
    errors: {
      refresh: '刷新失败: {msg}',
      ws: '监听 WebSocket 错误',
      callEnded: '通话 {id}… 已结束',
    },
  },
  myHistory: {
    filter: {
      refreshTooltip: '立即刷新历史列表',
      counter: '共 {filtered} / {total} 条',
    },
    window: {
      all: '全部',
      today: '今日',
      last7d: '近 7 天',
      last30d: '近 30 天',
    },
    list: {
      empty: '暂无通话历史',
      emptyTitle: '暂无通话',
      loadMore: '加载更多',
      end: '— 已加载全部 —',
    },
    detail: {
      empty: '请选择一条记录',
      emptyTitle: '未选择记录',
      notFound: '未找到该记录。',
      durationLabel: '时长 {value}',
      turnsLabel: '{n} 轮',
      modelPrefix: 'model: {model}',
      panes: {
        turns: '对话内容',
        summary: '摘要',
      },
      turnsEmpty: '无对话数据',
      bubbleWho: {
        user: 'USER',
        bot: 'BOT',
      },
    },
    summaryStatus: {
      ok: '已生成',
      failed: '失败',
      pending: '生成中',
    },
    summary: {
      pendingHint: '摘要生成中…',
      failedTitle: '摘要生成失败',
      failedFallback: '未知错误',
      empty: '无摘要数据',
      sections: {
        intent: 'Intent',
        keyQuestions: 'Key Questions',
        actionItems: 'Action Items',
        sentiment: 'Sentiment',
      },
      sentimentNeutral: 'neutral',
    },
    rel: {
      seconds: '{n} 秒前',
      minutes: '{n} 分钟前',
      hours: '{n} 小时前',
      days: '{n} 天前',
    },
    duration: '{m}m {s}s',
    errors: {
      load: '加载失败: {msg}',
      loadMore: '加载更多失败: {msg}',
      detail: '详情加载失败: {msg}',
    },
  },
  debug: {
    intro: '原始 EventBroadcaster 事件流 (最近 1000 条). 业务演示通常不需要看这些, 留给排查用.',
    empty: '尚无事件',
  },
};
