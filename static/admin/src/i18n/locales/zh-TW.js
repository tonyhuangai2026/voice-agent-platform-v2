// zh-TW — 繁體中文 (台灣用語) bundle for the admin SPA.
//
// Mirrors zh-CN.js key-for-key; values use Taiwan-style vocabulary rather
// than a mechanical character-for-character conversion. Notable choices:
//   設定 / 登入 / 儲存 / 儀表板 / 檢視 / 線上 / 離線 / 歷史紀錄 / 通話 /
//   來電者 / 檔案 / 影片 / 程式 / 使用者 / 資料 / 網路 / 軟體 / 硬體 /
//   螢幕 / 資訊 / 還原 / 重新整理 / 預設.
// Placeholders {n} / {msg} / {time} / {id} are kept verbatim.

export default {
  common: {
    unknown: "(unknown)",
    dash: "—",
    online: '線上',
    offline: '離線',
    refresh: '重新整理',
    save: '儲存',
    cancel: '取消',
    confirm: '確認',
    delete: '刪除',
    edit: '編輯',
    create: '新增',
    reset: '還原',
    loading: '載入中...',
    empty: '暫無資料',
    actions: '操作',
    toggleDark: '切換深色',
    toggleLight: '切換淺色',
    language: '語言',
    yes: '是',
    no: '否',
    all: '全部',
    placeholderDash: '—',
  },

  app: {
    brand: 'Voice Bot Admin',
    sub: '執行階段設定 · Demo 管理',
    nav: {
      groupOverview: '總覽',
      groupConfig: '設定',
      groupCall: '通話',
      groupAdmin: '管理',
      dashboard: 'Dashboard',
      history: '歷史紀錄',
      web: 'Web 預設',
      phone: 'Phone 預設',
      demos: 'Demo 管理',
      mcp: 'MCP 伺服器',
      talk: '通話',
      monitor: '監聽',
      myHistory: '我的歷史',
      users: '使用者管理',
    },
    user: {
      logout: '登出',
    },
  },

  login: {
    subtitle: '請登入以繼續',
    username: '使用者名稱',
    usernamePlaceholder: '請輸入使用者名稱',
    password: '密碼',
    passwordPlaceholder: '請輸入密碼',
    submit: '登入',
    errors: {
      usernameRequired: '請輸入使用者名稱',
      passwordRequired: '請輸入密碼',
      invalidCredentials: '使用者名稱或密碼錯誤',
      generic: '登入失敗：{msg}',
    },
  },

  setup: {
    subtitle: '首次造訪 · 設定管理員',
    intro: '此部署尚未初始化。請建立第一個管理員帳號以繼續；建立後將自動登入。',
    username: '使用者名稱',
    usernamePlaceholder: '請設定管理員使用者名稱',
    password: '密碼',
    passwordPlaceholder: '請設定管理員密碼',
    confirm: '確認密碼',
    confirmPlaceholder: '請再次輸入密碼',
    submit: '建立管理員',
    errors: {
      usernameRequired: '請輸入使用者名稱',
      passwordRequired: '請輸入密碼',
      passwordsMismatch: '兩次輸入的密碼不一致',
      alreadyInitialized: '此部署已初始化，請前往登入頁。',
      invalidInput: '使用者名稱和密碼不能為空。',
      generic: '建立失敗：{msg}',
    },
  },

  dashboard: {
    title: 'Dashboard',
    subtitle: '即時通話指標 · 7 秒輪詢',
    updatedAt: '· 更新於 {time}',
    statusOnline: '指標線上',
    statusFailed: '指標擷取失敗',
    refresh: '重新整理',
    notice: {
      header: '口徑說明',
      body:
        '<strong>Active calls</strong> 來自行程內 ACTIVE_SESSIONS（phone + web 都計入）；' +
        '<strong>Today / 24h 系列指標</strong>（總數、平均時長、Outcome / Engine / Demo 分佈、轉接真人比率、尖峰並行）' +
        '基於 DDB 資料表 <code>genaiic-voicebot-call-history</code>，<strong>僅 phone 通話寫入</strong>，web 工作階段不持久化。',
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
      metricsTitle: '核心指標',
      distributionsTitle: '分佈',
      outcomeTitle: 'Outcome 24h (phone)',
      engineTitle: 'Engine 24h (phone)',
      demoTitle: 'Demo 24h (phone)',
      total: '共 {n}',
      totalLabel: '總計',
      empty: '暫無資料',
    },
    emptyState: '指標載入失敗，請稍後再試或點選右上角重新整理。',
    messages: {
      loadFailed: 'Dashboard 指標載入失敗: {msg}',
    },
  },

  history: {
    title: '歷史紀錄',
    subtitle: '通話歷史瀏覽 · DDB 游標分頁 · 支援篩選 / CSV / Markdown 匯出 / 隨選摘要',
    filters: {
      caller: 'Caller',
      callerPlaceholder: '+12025550123',
      outcome: 'Outcome',
      engine: 'Engine',
      demo: 'Demo',
      dateRange: '日期範圍 (UTC)',
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
    emptyTitle: '未找到通話',
    emptyDesc: '目前篩選條件下沒有符合的通話記錄。請調整上方篩選或等待新通話寫入。',
    actions: {
      refresh: '重新整理',
      view: 'View',
      exportCsv: '匯出 CSV',
      downloadMd: '下載 MD',
      summarize: '產生摘要',
      loadMore: '載入更多',
      noMore: '沒有更多了',
      loadedRows: '已載入 {n} 列',
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
      noTurns: '沒有 turns 資料',
      noSummary: '[未產生]',
    },
    enums: {
      outcome: {
        user_requested: '使用者掛斷',
        task_completed: '任務完成',
        transferred: '已轉接真人',
        timeout: '逾時',
        error: '錯誤',
        unknown: '未知',
      },
      summary: {
        ok: '已產生',
        pending: '待產生',
        failed: '產生失敗',
      },
    },
    messages: {
      loadFailed: '載入失敗: {msg}',
      loadMoreFailed: '載入更多失敗: {msg}',
      detailFailed: '載入詳細資料失敗: {msg}',
      summaryUpdated: '摘要已更新',
      summarizeFailed: '產生摘要失敗: {msg}',
    },
  },

  demos: {
    title: 'Demo 管理',
    subtitle: 'data/<demo>/manifest.yaml + kb.md + 全域工具庫 自動探索',
    actions: {
      rescan: '重新掃描',
      reset: '還原',
      save: '儲存',
    },
    notice:
      '新增 demo: <code>mkdir data/&lt;demo-id&gt;/</code> 放入 ' +
      '<code>manifest.yaml</code> + <code>kb.md</code>，點選「重新掃描」即可生效。' +
      'Tools 由全域工具庫 (<code>tools/registry.py</code>) 提供，每個 demo 在右側抽屜 ' +
      'Tools 分頁勾選啟用。',
    columns: {
      id: 'ID',
      label: 'Label',
      lang: 'Main Language',
      kbChars: 'KB 字元',
      tools: 'Tools',
    },
    emptyTitle: '未發現 Demo',
    emptyDesc: '在 data/ 下新建一個含 manifest.yaml + kb.md 的 demo 目錄，然後點擊重新掃描即可收錄。',
    detail: {
      id: 'ID',
      mainLang: '主要語言',
      kbChars: 'KB 字元數',
      tags: '標籤',
      tabs: {
        system: 'System Prompt',
        greeting: 'Greeting',
        kb: 'KB 摘要',
        tools: 'Tools',
        mcp: 'MCP 伺服器',
        translate: '一鍵翻譯',
      },
      kbHint: '前 500 個字元 · 完整內容請直接看 kb.md',
      toolsHint:
        '勾選要為此 demo 啟用的 LLM 工具。儲存後寫回 ' +
        '<code>data/{id}/manifest.yaml</code> 的 ' +
        '<code>tools:</code> 欄位，並立即生效（下一通新工作階段）。',
      noTools: {
        header: '未發現可用工具',
        body:
          '<code>GET /api/admin/tools</code> 回傳空清單 — 請檢查後端 ' +
          '<code>tools/registry.py</code> 是否已就緒。',
      },
      mcpHint:
        '勾選要為此 demo 掛載的 MCP 伺服器。儲存後寫回 ' +
        '<code>data/{id}/manifest.yaml</code> 的 ' +
        '<code>mcp_servers:</code> 欄位，並在下一通新工作階段生效。',
      mcpDisabledTag: '已停用',
      mcpMissingTag: '不存在',
      noMcp: {
        header: '沒有可用的 MCP 伺服器',
        body:
          '尚未註冊任何 MCP 伺服器 — 請先在 <strong>MCP 伺服器</strong> ' +
          '頁面新增，再回到這裡掛載。',
      },
    },
    messages: {
      loadFailed: '載入 Demo 清單失敗: {msg}',
      toolsLoadFailed: '載入工具庫失敗: {msg}',
      rescanDone: '掃描完成，發現 {n} 個 demo',
      rescanFailed: '掃描失敗: {msg}',
      toolsSaved: 'Tools 已儲存',
      mcpSaved: 'MCP 伺服器已儲存',
      mcpLoadFailed: '載入 MCP 伺服器失敗: {msg}',
      saveFailed: '儲存失敗: {msg}',
      detailFailed: '載入詳細資料失敗: {msg}',
    },
    translate: {
      hint:
        '選擇目標語言一鍵翻譯該 demo 的本地化欄位（system / greeting 等），' +
        '由 LLM 產生後可在下方校對，再確認寫回 ' +
        '<code>data/{id}/manifest.yaml</code>。',
      selectPlaceholder: '選擇目標語言',
      translateBtn: '翻譯',
      optionPresent: '已存在',
      optionMissing: '缺少',
      missingHint: '該 demo 缺 {lang}，點擊翻譯一鍵產生。',
      existsHint: '{lang} 已存在，寫回需確認覆蓋。',
      previewTitle: '譯文預覽（{lang}）',
      previewHint: '請校對以下譯文，確認無誤後點擊寫回。',
      sourceLabel: '來源語言：{lang}',
      writeBackBtn: '確認寫回',
      messages: {
        empty: '該 demo 沒有可翻譯的本地化欄位',
        translateFailed: '翻譯失敗: {msg}',
        badRequest: '無法翻譯: {msg}',
        overwriteNeeded: '{lang} 已存在，請再次點擊以確認覆蓋寫回。',
        writeBackDone: '已寫回 {lang}',
        writeBackFailed: '寫回失敗: {msg}',
      },
    },
  },

  web: {
    title: 'Web 預設設定',
    subtitle: '瀏覽器 /ws 入口的預設引擎、語言、Demo、語音',
    alert: '儲存後，新建瀏覽器工作階段才會生效（重新整理頁面即可拿到新預設值）。已開啟的工作階段不受影響。',
    routeTitle: 'Web 預設',
  },

  phone: {
    title: 'Phone 預設設定',
    subtitle: 'PSTN 來電 /phone/ws 預設引擎、語言、Demo、語音',
    alert: '儲存後，下一通新通話才會生效（per-call hot-reload）。進行中的通話不受影響；不需要重新啟動服務。',
    routeTitle: 'Phone 預設',
  },

  defaultsForm: {
    sections: {
      engineDemo: '對話引擎與 Demo',
      voice: '音色',
      pipeline: 'Pipeline 模式 (LLM / TTS)',
    },
    pipelineHint: '以下 LLM / TTS / MiniMax 欄位僅在 engine = pipeline 時使用; nova-sonic 走端到端不讀取它們(音色仍可在上方選擇)。',
    polyglot: '全語言',
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
      reset: '還原',
      save: '儲存',
    },
    messages: {
      loadFailed: '載入失敗: {msg}',
      noChanges: '沒有變更',
      saved: '已儲存',
      saveFailed: '儲存失敗: {msg}',
      restored: '已還原',
    },
  },

  mcp: {
    title: 'MCP 伺服器',
    subtitle: '全域 Model Context Protocol 伺服器註冊表 · 在 Demo 頁面按需掛載',
    notice:
      '這些伺服器儲存於全域註冊表，可按 demo 掛載。僅允許 ' +
      '<code>sse</code> 與 <code>streamable_http</code> 兩種 transport' +
      '（基於安全考量停用 <code>stdio</code>）。Header 值為唯寫 — ' +
      '已儲存的密鑰會被遮罩，不會回傳到瀏覽器。',
    columns: {
      id: 'ID',
      label: 'Label',
      transport: 'Transport',
      auth: '鑑權',
      url: 'URL',
      enabled: '啟用',
    },
    authType: {
      none: '無',
      header: 'Header',
      sigv4: 'AWS SigV4',
    },
    emptyTitle: '尚無 MCP 伺服器',
    emptyDesc: '註冊一個 Model Context Protocol 伺服器後，可在 Demos 頁面按需掛載到各 demo。',
    actions: {
      add: '新增伺服器',
      test: '測試',
    },
    enabledTag: {
      on: '已啟用',
      off: '已停用',
    },
    form: {
      titleNew: '新增 MCP 伺服器',
      titleEdit: '編輯 MCP 伺服器',
      id: 'ID',
      idHint: '小寫字母、數字與連字號；2–63 字元。建立後不可修改。',
      label: 'Label',
      transport: 'Transport',
      url: 'URL',
      urlPlaceholder: 'https://example.com/mcp',
      enabled: '啟用',
      auth: '鑑權',
      sigv4Hint: '連線時使用實例 IAM 角色以 AWS SigV4 簽署請求，不儲存任何密鑰。',
      sigv4Service: 'Service',
      sigv4Region: 'Region',
      headers: 'Headers',
      headersHint: '選填 HTTP header（如 Authorization）。值會作為密鑰儲存，讀取時遮罩。',
      headerKey: 'Header 名稱',
      headerValuePlaceholder: '*** (保持不變)',
      headerValueNewPlaceholder: '值',
      addHeader: '新增 Header',
    },
    deleteConfirm: {
      title: '刪除 MCP 伺服器',
      body: '刪除 MCP 伺服器 "{id}"？此操作無法復原。',
    },
    test: {
      okTitle: '已連線 "{id}" · {n} 個工具',
      okEmpty: '已連線 "{id}"，但未暴露任何工具',
      failTitle: '連線 "{id}" 失敗',
    },
    messages: {
      loadFailed: '載入 MCP 伺服器失敗: {msg}',
      saved: '已儲存',
      saveFailed: '儲存失敗: {msg}',
      deleted: '已刪除',
      deleteFailed: '刪除失敗: {msg}',
      deleteRefused: '無法刪除 "{id}" — 仍被以下 demo 掛載: {demos}。請先在那裡卸載。',
      testFailed: '測試失敗: {msg}',
    },
  },

  historySummary: {
    moreFields: 'more fields ({n})',
  },

  users: {
    title: '使用者管理',
    subtitle: 'JWT 工作階段帳號 · 角色 + 重設密碼 + 啟用/停用',
    emptyTitle: '尚無使用者',
    emptyDesc: '建立第一個使用者帳號以授予主控台存取權。',
    actions: {
      add: '新增使用者',
      makeAdmin: '設為管理員',
      makeUser: '設為一般使用者',
      resetPw: '重設密碼',
      enable: '啟用',
      disable: '停用',
    },
    columns: {
      username: '使用者名稱',
      role: '角色',
      status: '狀態',
      createdAt: '建立時間',
    },
    roles: {
      admin: '管理員',
      user: '一般使用者',
    },
    status: {
      active: '正常',
      disabled: '已停用',
    },
    form: {
      titleNew: '建立使用者',
      titleResetPw: '重設密碼 · {username}',
      username: '使用者名稱',
      usernameHint: '字母、數字、點、連字號與底線；2 到 64 個字元。',
      password: '密碼',
      newPassword: '新密碼',
      passwordPlaceholder: '請輸入密碼',
      role: '角色',
    },
    deleteConfirm: {
      title: '刪除使用者',
      body: '確定刪除使用者「{username}」嗎？此操作無法復原。',
    },
    messages: {
      loadFailed: '載入使用者失敗：{msg}',
      created: '已建立使用者「{username}」',
      createFailed: '建立失敗：{msg}',
      roleChanged: '「{username}」的角色已改為 {role}',
      pwReset: '已重設「{username}」的密碼',
      enabled: '已啟用使用者「{username}」',
      disabled: '已停用使用者「{username}」',
      updateFailed: '更新失敗：{msg}',
      deleted: '已刪除使用者「{username}」',
      deleteFailed: '刪除失敗：{msg}',
    },
  },

  // --- Call views merged from the demo SPA (tech_design §3) ---
  // talk / monitor / debug come from the demo views verbatim; myHistory is
  // the demo's per-user call-history view (renamed from `history` to avoid
  // colliding with admin's full HistoryView `history` namespace).
  talk: {
    actions: {
      summarize: '產生對話總結 (Markdown)',
      debug: '偵錯 / 事件流',
    },
    status: {
      ready: '準備就緒',
      connecting: '連線中…',
      recording: '錄音中…',
    },
    button: {
      start: '開始',
      connecting: '連線中…',
      stop: '停止',
    },
    defaultsHint: '引擎 / 語言 / 情境由 Admin 設定，要修改預設值請至 {adminLink}',
    defaultsHintAdminLabel: 'Admin',
    bubbles: {
      empty: '點擊中間按鈕開始對話',
      whoUser: '我',
      whoBot: 'Bot',
      partial: '即時',
    },
    drawerTitle: '事件流 (偵錯)',
    summary: {
      title: '對話總結',
      generating: '產生中…',
      failed: '總結失敗：{msg}',
    },
    errors: {
      loadConfig: '載入設定失敗：{msg}',
      mic: '麥克風初始化失敗：{msg}',
      ws: 'WebSocket 連線失敗',
      start: '啟動失敗：{msg}',
    },
  },
  monitor: {
    status: {
      online: '線上',
      ended: '已結束',
      noCalls: '無通話',
      idle: '閒置',
    },
    refreshTooltip: '立即重新整理通話列表',
    empty: {
      noActive: '目前無進行中通話',
      noActiveHint: '撥打 PSTN 號碼或在 /talk 頁面發起 Web 階段，即可在此監聽。',
      noSelection: '請選擇一通通話',
      noSelectionHint: '在左側選擇一通進行中的通話，即可即時檢視其事件流。',
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
      refresh: '重新整理失敗：{msg}',
      ws: '監聽 WebSocket 錯誤',
      callEnded: '通話 {id}… 已結束',
    },
  },
  myHistory: {
    filter: {
      refreshTooltip: '立即重新整理歷史列表',
      counter: '共 {filtered} / {total} 筆',
    },
    window: {
      all: '全部',
      today: '今日',
      last7d: '近 7 天',
      last30d: '近 30 天',
    },
    list: {
      empty: '尚無通話歷史',
      emptyTitle: '尚無通話',
      loadMore: '載入更多',
      end: '— 已載入全部 —',
    },
    detail: {
      empty: '請選擇一筆紀錄',
      emptyTitle: '尚未選擇紀錄',
      notFound: '找不到該筆紀錄。',
      durationLabel: '時長 {value}',
      turnsLabel: '{n} 輪',
      modelPrefix: 'model: {model}',
      panes: {
        turns: '對話內容',
        summary: '摘要',
      },
      turnsEmpty: '無對話資料',
      bubbleWho: {
        user: 'USER',
        bot: 'BOT',
      },
    },
    summaryStatus: {
      ok: '已產生',
      failed: '失敗',
      pending: '產生中',
    },
    summary: {
      pendingHint: '摘要產生中…',
      failedTitle: '摘要產生失敗',
      failedFallback: '未知錯誤',
      empty: '無摘要資料',
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
      minutes: '{n} 分鐘前',
      hours: '{n} 小時前',
      days: '{n} 天前',
    },
    duration: '{m}m {s}s',
    errors: {
      load: '載入失敗：{msg}',
      loadMore: '載入更多失敗：{msg}',
      detail: '詳情載入失敗：{msg}',
    },
  },
  debug: {
    intro: '原始 EventBroadcaster 事件流 (最近 1000 筆)。展示情境通常不需要看這些，保留供排查使用。',
    empty: '尚無事件',
  },
};
