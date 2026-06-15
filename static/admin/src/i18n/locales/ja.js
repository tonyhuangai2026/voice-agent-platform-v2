// 日本語 (ja) — admin SPA translation bundle.
//
// Key tree mirrors zh-CN.js exactly; only values differ.
// 説明文は敬体、ボタンは簡潔体。

export default {
  common: {
    unknown: "(不明)",
    dash: "—",
    online: 'オンライン',
    offline: 'オフライン',
    refresh: '更新',
    save: '保存',
    cancel: 'キャンセル',
    confirm: '確認',
    delete: '削除',
    edit: '編集',
    create: '新規作成',
    reset: '元に戻す',
    loading: '読み込み中...',
    empty: 'データがありません',
    actions: '操作',
    toggleDark: 'ダークモードに切替',
    toggleLight: 'ライトモードに切替',
    language: '言語',
    yes: 'はい',
    no: 'いいえ',
    all: 'すべて',
    placeholderDash: '—',
  },

  app: {
    brand: 'Voice Bot Admin',
    sub: 'ランタイム設定 · Demo 管理',
    nav: {
      groupOverview: '概要',
      groupConfig: '設定',
      groupCall: '通話',
      groupAdmin: '管理',
      dashboard: 'ダッシュボード',
      history: '通話履歴',
      web: 'Web デフォルト',
      phone: 'Phone デフォルト',
      demos: 'Demo 管理',
      mcp: 'MCP サーバー',
      talk: '通話',
      monitor: 'モニター',
      myHistory: 'マイ履歴',
      users: 'ユーザー管理',
    },
    user: {
      logout: 'ログアウト',
    },
  },

  login: {
    subtitle: '続行するにはログインしてください',
    username: 'ユーザー名',
    usernamePlaceholder: 'ユーザー名を入力',
    password: 'パスワード',
    passwordPlaceholder: 'パスワードを入力',
    submit: 'ログイン',
    errors: {
      usernameRequired: 'ユーザー名を入力してください',
      passwordRequired: 'パスワードを入力してください',
      invalidCredentials: 'ユーザー名またはパスワードが正しくありません',
      generic: 'ログインに失敗しました：{msg}',
    },
  },

  dashboard: {
    title: 'ダッシュボード',
    subtitle: 'リアルタイム通話メトリクス · 7秒ごとに更新',
    updatedAt: '· 更新時刻 {time}',
    statusOnline: 'メトリクス取得中',
    statusFailed: 'メトリクスの取得に失敗しました',
    refresh: '更新',
    notice: {
      header: '指標の定義',
      body:
        '<strong>Active calls</strong> はプロセス内の ACTIVE_SESSIONS から取得します（phone と web の両方を含みます）。' +
        '<strong>Today / 24h 系列の指標</strong>（合計件数、平均通話時間、Outcome / Engine / Demo の分布、転送率、ピーク同時接続数）は ' +
        'DDB テーブル <code>genaiic-voicebot-call-history</code> に基づき、<strong>phone 通話のみが永続化</strong>されます。web セッションは保存されません。',
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
      metricsTitle: '主要メトリクス',
      distributionsTitle: '分布',
      outcomeTitle: 'Outcome 24h (phone)',
      engineTitle: 'Engine 24h (phone)',
      demoTitle: 'Demo 24h (phone)',
      total: '合計 {n} 件',
      totalLabel: '合計',
      empty: 'データがありません',
    },
    emptyState: 'メトリクスの読み込みに失敗しました。しばらくしてから再度お試しいただくか、右上の更新ボタンを押してください。',
    messages: {
      loadFailed: 'ダッシュボード指標の読み込みに失敗しました: {msg}',
    },
  },

  history: {
    title: '通話履歴',
    subtitle: '通話履歴の閲覧 · DDB カーソルページング · フィルタ / CSV / Markdown エクスポート / オンデマンド要約をサポート',
    filters: {
      caller: 'Caller',
      callerPlaceholder: '+12025550123',
      outcome: 'Outcome',
      engine: 'Engine',
      demo: 'Demo',
      dateRange: '日付範囲 (UTC)',
      all: 'すべて',
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
    emptyTitle: '通話が見つかりません',
    emptyDesc: '現在のフィルター条件に一致する通話履歴がありません。上のフィルターを調整するか、新しい通話が記録されるのをお待ちください。',
    actions: {
      refresh: '更新',
      view: '表示',
      exportCsv: 'CSV エクスポート',
      downloadMd: 'MD ダウンロード',
      summarize: '要約を生成',
      loadMore: 'さらに読み込む',
      noMore: 'これ以上ありません',
      loadedRows: '{n} 行を読み込み済み',
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
      transferYes: 'はい',
      transferNo: 'いいえ',
      turns: 'Turns',
      summary: 'Summary',
      transcript: 'Transcript',
      noTurns: 'turns データがありません',
      noSummary: '[未生成]',
    },
    enums: {
      outcome: {
        user_requested: 'ユーザー切断',
        task_completed: 'タスク完了',
        transferred: '転送済み',
        timeout: 'タイムアウト',
        error: 'エラー',
        unknown: '不明',
      },
      summary: {
        ok: '生成済み',
        pending: '生成待ち',
        failed: '生成失敗',
      },
    },
    messages: {
      loadFailed: '読み込みに失敗しました: {msg}',
      loadMoreFailed: '追加読み込みに失敗しました: {msg}',
      detailFailed: '詳細の読み込みに失敗しました: {msg}',
      summaryUpdated: '要約を更新しました',
      summarizeFailed: '要約の生成に失敗しました: {msg}',
    },
  },

  demos: {
    title: 'Demo 管理',
    subtitle: 'data/<demo>/manifest.yaml + kb.md + グローバルツールライブラリを自動検出',
    actions: {
      rescan: '再スキャン',
      reset: '元に戻す',
      save: '保存',
    },
    notice:
      '新しい demo を追加するには: <code>mkdir data/&lt;demo-id&gt;/</code> に ' +
      '<code>manifest.yaml</code> と <code>kb.md</code> を配置し、「再スキャン」をクリックしてください。' +
      'Tools はグローバルレジストリ (<code>tools/registry.py</code>) から提供され、demo ごとに右側ドロワーの ' +
      'Tools タブで有効化できます。',
    columns: {
      id: 'ID',
      label: 'Label',
      lang: 'Main Language',
      kbChars: 'KB 文字数',
      tools: 'Tools',
    },
    emptyTitle: 'デモが見つかりません',
    emptyDesc: 'data/ 配下に manifest.yaml と kb.md を含むデモフォルダを作成し、再スキャンすると取り込まれます。',
    detail: {
      id: 'ID',
      mainLang: 'メイン言語',
      kbChars: 'KB 文字数',
      tags: 'タグ',
      tabs: {
        system: 'System Prompt',
        greeting: 'Greeting',
        kb: 'KB 抜粋',
        tools: 'Tools',
        mcp: 'MCP サーバー',
        translate: 'ワンクリック翻訳',
      },
      kbHint: '先頭 500 文字 · 全文は kb.md を直接ご確認ください',
      toolsHint:
        'この demo で有効化する LLM ツールを選択してください。保存すると ' +
        '<code>data/{id}/manifest.yaml</code> の <code>tools:</code> フィールドに書き戻され、' +
        '次回の新規セッションから即時に反映されます。',
      noTools: {
        header: '利用可能なツールがありません',
        body:
          '<code>GET /api/admin/tools</code> が空のリストを返しました — バックエンドの ' +
          '<code>tools/registry.py</code> が正しく構成されているかご確認ください。',
      },
      mcpHint:
        'この demo にマウントする MCP サーバーを選択してください。保存すると ' +
        '<code>data/{id}/manifest.yaml</code> の <code>mcp_servers:</code> フィールドに書き戻され、' +
        '次回の新規セッションから反映されます。',
      mcpDisabledTag: '無効',
      mcpMissingTag: '存在しません',
      noMcp: {
        header: '利用可能な MCP サーバーがありません',
        body:
          'MCP サーバーがまだ登録されていません — まず <strong>MCP サーバー</strong> ' +
          'ページで追加してから、ここに戻ってマウントしてください。',
      },
    },
    messages: {
      loadFailed: 'Demo リストの読み込みに失敗しました: {msg}',
      toolsLoadFailed: 'ツールライブラリの読み込みに失敗しました: {msg}',
      rescanDone: 'スキャンが完了しました。{n} 件の demo を検出しました',
      rescanFailed: 'スキャンに失敗しました: {msg}',
      toolsSaved: 'Tools を保存しました',
      mcpSaved: 'MCP サーバーを保存しました',
      mcpLoadFailed: 'MCP サーバーの読み込みに失敗しました: {msg}',
      saveFailed: '保存に失敗しました: {msg}',
      detailFailed: '詳細の読み込みに失敗しました: {msg}',
    },
    translate: {
      hint:
        '対象言語を選ぶと、この demo のローカライズ項目（system / greeting など）を' +
        'ワンクリックで翻訳します。LLM が生成した下書きを下で校正し、' +
        '<code>data/{id}/manifest.yaml</code> への書き戻しを確認できます。',
      selectPlaceholder: '対象言語を選択',
      translateBtn: '翻訳',
      optionPresent: '存在',
      optionMissing: '未登録',
      missingHint: 'この demo には {lang} がありません。翻訳をクリックして生成してください。',
      existsHint: '{lang} は既に存在します。書き戻すには上書きの確認が必要です。',
      previewTitle: '翻訳プレビュー（{lang}）',
      previewHint: '以下の翻訳を校正し、問題なければ書き戻しをクリックしてください。',
      sourceLabel: 'ソース言語：{lang}',
      writeBackBtn: '書き戻しを確認',
      messages: {
        empty: 'この demo には翻訳可能なローカライズ項目がありません',
        translateFailed: '翻訳に失敗しました: {msg}',
        badRequest: '翻訳できません: {msg}',
        overwriteNeeded: '{lang} は既に存在します。もう一度クリックして上書きを確認してください。',
        writeBackDone: '{lang} を書き戻しました',
        writeBackFailed: '書き戻しに失敗しました: {msg}',
      },
    },
  },

  web: {
    title: 'Web デフォルト設定',
    subtitle: 'ブラウザ /ws エントリのデフォルトエンジン、言語、Demo、音声',
    alert: '保存すると、新しいブラウザセッションに反映されます（ページを更新すると新しいデフォルトが適用されます）。既存のセッションには影響しません。',
    routeTitle: 'Web デフォルト',
  },

  phone: {
    title: 'Phone デフォルト設定',
    subtitle: 'PSTN 着信 /phone/ws のデフォルトエンジン、言語、Demo、音声',
    alert: '保存すると、次回の新規通話に反映されます（per-call ホットリロード）。進行中の通話には影響せず、サービスの再起動も不要です。',
    routeTitle: 'Phone デフォルト',
  },

  defaultsForm: {
    sections: {
      engineDemo: '対話エンジンと Demo',
      voice: '音声',
      pipeline: 'Pipeline モード (LLM / TTS)',
    },
    pipelineHint: '以下の LLM / TTS / MiniMax フィールドは engine = pipeline の場合のみ使用されます。nova-sonic はエンドツーエンドで動作しこれらを参照しません(音声は上で引き続き選択できます)。',
    polyglot: '多言語',
    fields: {
      engine: 'Engine',
      lang: 'Language',
      demo: 'Demo',
      llmModel: 'LLM Model',
      ttsProvider: 'TTS Provider',
      voiceId: 'Voice ID',
      novaVoiceId: 'Nova Sonic ボイス',
      minimaxModel: 'MiniMax Model',
    },
    actions: {
      reset: '元に戻す',
      save: '保存',
    },
    messages: {
      loadFailed: '読み込みに失敗しました: {msg}',
      noChanges: '変更はありません',
      saved: '保存しました',
      saveFailed: '保存に失敗しました: {msg}',
      restored: '元に戻しました',
    },
  },

  mcp: {
    title: 'MCP サーバー',
    subtitle: 'グローバルな Model Context Protocol サーバーレジストリ · Demo ページから demo ごとにマウント',
    notice:
      'これらのサーバーはグローバルレジストリに保存され、demo ごとにマウントできます。' +
      'transport は <code>sse</code> と <code>streamable_http</code> のみ許可されます' +
      '（セキュリティ上 <code>stdio</code> は無効）。ヘッダー値は書き込み専用で、' +
      '保存済みのシークレットはマスクされ、ブラウザーへは返されません。',
    columns: {
      id: 'ID',
      label: 'Label',
      transport: 'Transport',
      auth: '認証',
      url: 'URL',
      enabled: '有効',
    },
    authType: {
      none: 'なし',
      header: 'Header',
      sigv4: 'AWS SigV4',
    },
    emptyTitle: 'MCP サーバーがありません',
    emptyDesc: 'Model Context Protocol サーバーを登録すると、Demos ページから各デモにマウントできます。',
    actions: {
      add: 'サーバーを追加',
      test: 'テスト',
    },
    enabledTag: {
      on: '有効',
      off: '無効',
    },
    form: {
      titleNew: 'MCP サーバーを追加',
      titleEdit: 'MCP サーバーを編集',
      id: 'ID',
      idHint: '小文字・数字・ハイフン。2〜63 文字。作成後は変更できません。',
      label: 'Label',
      transport: 'Transport',
      url: 'URL',
      urlPlaceholder: 'https://example.com/mcp',
      enabled: '有効',
      auth: '認証',
      sigv4Hint: '接続時にインスタンスの IAM ロールを使って AWS SigV4 でリクエストに署名します。シークレットは保存しません。',
      sigv4Service: 'Service',
      sigv4Region: 'Region',
      headers: 'Headers',
      headersHint: '任意の HTTP ヘッダー（例: Authorization）。値はシークレットとして保存され、読み取り時にマスクされます。',
      headerKey: 'ヘッダー名',
      headerValuePlaceholder: '*** (変更なし)',
      headerValueNewPlaceholder: '値',
      addHeader: 'ヘッダーを追加',
    },
    deleteConfirm: {
      title: 'MCP サーバーを削除',
      body: 'MCP サーバー "{id}" を削除しますか？この操作は元に戻せません。',
    },
    test: {
      okTitle: '"{id}" に接続しました · ツール {n} 個',
      okEmpty: '"{id}" に接続しましたが、ツールが公開されていません',
      failTitle: '"{id}" への接続に失敗しました',
    },
    messages: {
      loadFailed: 'MCP サーバーの読み込みに失敗しました: {msg}',
      saved: '保存しました',
      saveFailed: '保存に失敗しました: {msg}',
      deleted: '削除しました',
      deleteFailed: '削除に失敗しました: {msg}',
      deleteRefused: '"{id}" は削除できません — まだ次の demo にマウントされています: {demos}。先にそちらでアンマウントしてください。',
      testFailed: 'テストに失敗しました: {msg}',
    },
  },

  historySummary: {
    moreFields: 'more fields ({n})',
  },

  users: {
    title: 'ユーザー管理',
    subtitle: 'JWT セッションアカウント · ロール + パスワードリセット + 有効/無効',
    emptyTitle: 'ユーザーがいません',
    emptyDesc: '最初のユーザーアカウントを作成してコンソールへのアクセスを許可します。',
    actions: {
      add: '新規ユーザー',
      makeAdmin: '管理者にする',
      makeUser: '一般ユーザーにする',
      resetPw: 'パスワードをリセット',
      enable: '有効化',
      disable: '無効化',
    },
    columns: {
      username: 'ユーザー名',
      role: 'ロール',
      status: 'ステータス',
      createdAt: '作成日時',
    },
    roles: {
      admin: '管理者',
      user: '一般ユーザー',
    },
    status: {
      active: '有効',
      disabled: '無効',
    },
    form: {
      titleNew: 'ユーザーを作成',
      titleResetPw: 'パスワードをリセット · {username}',
      username: 'ユーザー名',
      usernameHint: '英数字・ピリオド・ハイフン・アンダースコア、2〜64 文字。',
      password: 'パスワード',
      newPassword: '新しいパスワード',
      passwordPlaceholder: 'パスワードを入力',
      role: 'ロール',
    },
    deleteConfirm: {
      title: 'ユーザーを削除',
      body: 'ユーザー "{username}" を削除しますか？この操作は取り消せません。',
    },
    messages: {
      loadFailed: 'ユーザーの読み込みに失敗しました: {msg}',
      created: 'ユーザー "{username}" を作成しました',
      createFailed: '作成に失敗しました: {msg}',
      roleChanged: '"{username}" のロールを {role} に変更しました',
      pwReset: '"{username}" のパスワードをリセットしました',
      enabled: 'ユーザー "{username}" を有効化しました',
      disabled: 'ユーザー "{username}" を無効化しました',
      updateFailed: '更新に失敗しました: {msg}',
      deleted: 'ユーザー "{username}" を削除しました',
      deleteFailed: '削除に失敗しました: {msg}',
    },
  },

  // --- Call views merged from the demo SPA (tech_design §3) ---
  // talk / monitor / debug come from the demo views verbatim; myHistory is
  // the demo's per-user call-history view (renamed from `history` to avoid
  // colliding with admin's full HistoryView `history` namespace).
  talk: {
    actions: {
      summarize: '対話サマリーを生成 (Markdown)',
      debug: 'デバッグ / イベントストリーム',
    },
    status: {
      ready: '準備完了',
      connecting: '接続中…',
      recording: '録音中…',
    },
    button: {
      start: '開始',
      connecting: '接続中…',
      stop: '停止',
    },
    defaultsHint: 'エンジン / 言語 / シナリオは Admin で設定します。デフォルトを変更するには {adminLink} へ',
    defaultsHintAdminLabel: 'Admin',
    bubbles: {
      empty: '中央のボタンをクリックして対話を開始してください',
      whoUser: '自分',
      whoBot: 'Bot',
      partial: 'リアルタイム',
    },
    drawerTitle: 'イベントストリーム (デバッグ)',
    summary: {
      title: '対話サマリー',
      generating: '生成中…',
      failed: 'サマリー生成に失敗しました: {msg}',
    },
    errors: {
      loadConfig: '設定の読み込みに失敗しました: {msg}',
      mic: 'マイクの初期化に失敗しました: {msg}',
      ws: 'WebSocket 接続に失敗しました',
      start: '開始に失敗しました: {msg}',
    },
  },
  monitor: {
    status: {
      online: 'オンライン',
      ended: '終了',
      noCalls: '通話なし',
      idle: 'アイドル',
    },
    refreshTooltip: '通話リストをすぐに更新',
    empty: {
      noActive: 'アクティブな通話はありません',
      noActiveHint: 'PSTN 番号に発信するか、/talk ページから Web セッションを開始するとここに表示されます。',
      noSelection: '通話を選択してください',
      noSelectionHint: '左側の進行中の通話を選択すると、そのイベントがストリーミングされます。',
      noEvents: 'イベントを待機中…',
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
      refresh: '更新に失敗しました: {msg}',
      ws: 'モニター WebSocket エラー',
      callEnded: '通話 {id}… が終了しました',
    },
  },
  myHistory: {
    filter: {
      refreshTooltip: '履歴をすぐに更新',
      counter: '{filtered} / {total} 件',
    },
    window: {
      all: 'すべて',
      today: '今日',
      last7d: '過去 7 日間',
      last30d: '過去 30 日間',
    },
    list: {
      empty: '通話履歴がありません',
      emptyTitle: 'まだ通話がありません',
      loadMore: 'さらに読み込む',
      end: '— すべて読み込みました —',
    },
    detail: {
      empty: '記録を選択してください',
      emptyTitle: '記録が選択されていません',
      notFound: '記録が見つかりませんでした。',
      durationLabel: '時間 {value}',
      turnsLabel: '{n} ターン',
      modelPrefix: 'model: {model}',
      panes: {
        turns: '対話内容',
        summary: 'サマリー',
      },
      turnsEmpty: '対話データがありません',
      bubbleWho: {
        user: 'USER',
        bot: 'BOT',
      },
    },
    summaryStatus: {
      ok: '生成済み',
      failed: '失敗',
      pending: '生成中',
    },
    summary: {
      pendingHint: 'サマリーを生成中…',
      failedTitle: 'サマリー生成に失敗しました',
      failedFallback: '不明なエラー',
      empty: 'サマリーデータがありません',
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
      minutes: '{n} 分前',
      hours: '{n} 時間前',
      days: '{n} 日前',
    },
    duration: '{m}m {s}s',
    errors: {
      load: '読み込みに失敗しました: {msg}',
      loadMore: 'さらに読み込みに失敗しました: {msg}',
      detail: '詳細の読み込みに失敗しました: {msg}',
    },
  },
  debug: {
    intro: '生の EventBroadcaster イベントストリーム (直近 1000 件)。通常のデモには不要で、トラブルシューティング用です。',
    empty: 'イベントはまだありません',
  },
};
