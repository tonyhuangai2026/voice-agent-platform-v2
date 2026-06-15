// 한국어 (ko) — admin SPA translation bundle.
//
// Key tree mirrors zh-CN.js exactly; only values differ.
// 합쇼체 사용.

export default {
  common: {
    unknown: "(알 수 없음)",
    dash: "—",
    online: '온라인',
    offline: '오프라인',
    refresh: '새로고침',
    save: '저장',
    cancel: '취소',
    confirm: '확인',
    delete: '삭제',
    edit: '편집',
    create: '새로 만들기',
    reset: '되돌리기',
    loading: '불러오는 중...',
    empty: '데이터 없음',
    actions: '작업',
    toggleDark: '다크 모드로 전환',
    toggleLight: '라이트 모드로 전환',
    language: '언어',
    yes: '예',
    no: '아니요',
    all: '전체',
    placeholderDash: '—',
  },

  app: {
    brand: 'Voice Bot Admin',
    sub: '런타임 설정 · Demo 관리',
    nav: {
      groupOverview: '개요',
      groupConfig: '구성',
      groupCall: '통화',
      groupAdmin: '관리',
      dashboard: '대시보드',
      history: '통화 기록',
      web: 'Web 기본값',
      phone: 'Phone 기본값',
      demos: 'Demo 관리',
      mcp: 'MCP 서버',
      talk: '통화',
      monitor: '모니터',
      myHistory: '내 기록',
      users: '사용자 관리',
    },
    user: {
      logout: '로그아웃',
    },
  },

  login: {
    subtitle: '계속하려면 로그인하세요',
    username: '사용자 이름',
    usernamePlaceholder: '사용자 이름을 입력하세요',
    password: '비밀번호',
    passwordPlaceholder: '비밀번호를 입력하세요',
    submit: '로그인',
    errors: {
      usernameRequired: '사용자 이름을 입력하세요',
      passwordRequired: '비밀번호를 입력하세요',
      invalidCredentials: '사용자 이름 또는 비밀번호가 올바르지 않습니다',
      generic: '로그인 실패: {msg}',
    },
  },

  dashboard: {
    title: '대시보드',
    subtitle: '실시간 통화 지표 · 7초 폴링',
    updatedAt: '· {time} 업데이트',
    statusOnline: '지표 온라인',
    statusFailed: '지표 가져오기 실패',
    refresh: '새로고침',
    notice: {
      header: '지표 정의',
      body:
        '<strong>Active calls</strong> 는 프로세스 내 ACTIVE_SESSIONS 에서 가져오며, phone 과 web 모두 포함합니다. ' +
        '<strong>Today / 24h 계열 지표</strong>(전체 건수, 평균 통화 시간, Outcome / Engine / Demo 분포, 전환율, 최대 동시 통화 수)는 ' +
        'DDB 테이블 <code>genaiic-voicebot-call-history</code> 를 기반으로 하며, <strong>phone 통화만 저장됩니다</strong>. web 세션은 영속화되지 않습니다.',
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
      metricsTitle: '핵심 지표',
      distributionsTitle: '분포',
      outcomeTitle: 'Outcome 24h (phone)',
      engineTitle: 'Engine 24h (phone)',
      demoTitle: 'Demo 24h (phone)',
      total: '총 {n} 건',
      totalLabel: '합계',
      empty: '데이터 없음',
    },
    emptyState: '지표를 불러오지 못했습니다. 잠시 후 다시 시도하거나 우측 상단의 새로고침을 눌러 주십시오.',
    messages: {
      loadFailed: '대시보드 지표 로드 실패: {msg}',
    },
  },

  history: {
    title: '통화 기록',
    subtitle: '통화 기록 조회 · DDB 커서 페이지네이션 · 필터 / CSV / Markdown 내보내기 / 온디맨드 요약 지원',
    filters: {
      caller: 'Caller',
      callerPlaceholder: '+12025550123',
      outcome: 'Outcome',
      engine: 'Engine',
      demo: 'Demo',
      dateRange: '날짜 범위 (UTC)',
      all: '전체',
    },
    columns: {
      startedAt: 'Started (UTC)',
      caller: 'Caller',
      outcome: 'Outcome',
      engine: 'Engine',
      demo: 'Demo',
      duration: 'Duration',
      summary: 'Summary',
      actions: '작업',
    },
    emptyTitle: '통화를 찾을 수 없습니다',
    emptyDesc: '현재 필터 조건과 일치하는 통화 기록이 없습니다. 위 필터를 조정하거나 새 통화가 기록될 때까지 기다리세요.',
    actions: {
      refresh: '새로고침',
      view: '보기',
      exportCsv: 'CSV 내보내기',
      downloadMd: 'MD 다운로드',
      summarize: '요약 생성',
      loadMore: '더 불러오기',
      noMore: '더 이상 없습니다',
      loadedRows: '{n} 행 로드됨',
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
      transferYes: '예',
      transferNo: '아니요',
      turns: 'Turns',
      summary: 'Summary',
      transcript: 'Transcript',
      noTurns: 'turns 데이터가 없습니다',
      noSummary: '[생성되지 않음]',
    },
    enums: {
      outcome: {
        user_requested: '사용자 종료',
        task_completed: '작업 완료',
        transferred: '전달됨',
        timeout: '시간 초과',
        error: '오류',
        unknown: '알 수 없음',
      },
      summary: {
        ok: '생성됨',
        pending: '생성 대기',
        failed: '생성 실패',
      },
    },
    messages: {
      loadFailed: '로드 실패: {msg}',
      loadMoreFailed: '추가 로드 실패: {msg}',
      detailFailed: '상세 로드 실패: {msg}',
      summaryUpdated: '요약이 업데이트되었습니다',
      summarizeFailed: '요약 생성 실패: {msg}',
    },
  },

  demos: {
    title: 'Demo 관리',
    subtitle: 'data/<demo>/manifest.yaml + kb.md + 글로벌 도구 라이브러리 자동 검색',
    actions: {
      rescan: '다시 스캔',
      reset: '되돌리기',
      save: '저장',
    },
    notice:
      '새 demo 추가: <code>mkdir data/&lt;demo-id&gt;/</code> 에 ' +
      '<code>manifest.yaml</code> 과 <code>kb.md</code> 를 배치한 뒤 "다시 스캔" 을 클릭하면 적용됩니다. ' +
      'Tools 는 글로벌 레지스트리 (<code>tools/registry.py</code>) 에서 제공되며, 각 demo 의 우측 드로어 ' +
      'Tools 탭에서 활성화할 수 있습니다.',
    columns: {
      id: 'ID',
      label: 'Label',
      lang: 'Main Language',
      kbChars: 'KB 글자수',
      tools: 'Tools',
    },
    emptyTitle: '데모를 찾을 수 없습니다',
    emptyDesc: 'data/ 아래에 manifest.yaml 과 kb.md 를 포함한 데모 폴더를 만든 뒤 다시 스캔하면 인식됩니다.',
    detail: {
      id: 'ID',
      mainLang: '주 언어',
      kbChars: 'KB 글자 수',
      tags: '태그',
      tabs: {
        system: 'System Prompt',
        greeting: 'Greeting',
        kb: 'KB 요약',
        tools: 'Tools',
        mcp: 'MCP 서버',
        translate: '원클릭 번역',
      },
      kbHint: '처음 500자 · 전체 내용은 kb.md 를 직접 확인하시기 바랍니다',
      toolsHint:
        '이 demo 에 활성화할 LLM 도구를 선택하십시오. 저장하면 ' +
        '<code>data/{id}/manifest.yaml</code> 의 <code>tools:</code> 필드에 기록되며 ' +
        '다음 새 세션부터 즉시 적용됩니다.',
      noTools: {
        header: '사용 가능한 도구가 없습니다',
        body:
          '<code>GET /api/admin/tools</code> 가 빈 목록을 반환했습니다 — 백엔드의 ' +
          '<code>tools/registry.py</code> 가 준비되어 있는지 확인하시기 바랍니다.',
      },
      mcpHint:
        '이 demo 에 마운트할 MCP 서버를 선택하십시오. 저장하면 ' +
        '<code>data/{id}/manifest.yaml</code> 의 <code>mcp_servers:</code> 필드에 기록되며 ' +
        '다음 새 세션부터 적용됩니다.',
      mcpDisabledTag: '비활성',
      mcpMissingTag: '없음',
      noMcp: {
        header: '사용 가능한 MCP 서버가 없습니다',
        body:
          '아직 등록된 MCP 서버가 없습니다 — 먼저 <strong>MCP 서버</strong> ' +
          '페이지에서 추가한 다음 여기로 돌아와 마운트하십시오.',
      },
    },
    messages: {
      loadFailed: 'Demo 목록 로드 실패: {msg}',
      toolsLoadFailed: '도구 라이브러리 로드 실패: {msg}',
      rescanDone: '스캔 완료, {n} 개의 demo 발견',
      rescanFailed: '스캔 실패: {msg}',
      toolsSaved: 'Tools 저장됨',
      mcpSaved: 'MCP 서버 저장됨',
      mcpLoadFailed: 'MCP 서버 로드 실패: {msg}',
      saveFailed: '저장 실패: {msg}',
      detailFailed: '상세 로드 실패: {msg}',
    },
    translate: {
      hint:
        '대상 언어를 선택하면 이 demo 의 현지화 필드(system / greeting 등)를 ' +
        '원클릭으로 번역합니다. LLM 이 생성한 초안을 아래에서 교정한 뒤 ' +
        '<code>data/{id}/manifest.yaml</code> 에 기록(write-back)을 확인할 수 있습니다.',
      selectPlaceholder: '대상 언어 선택',
      translateBtn: '번역',
      optionPresent: '존재',
      optionMissing: '없음',
      missingHint: '이 demo 에는 {lang} 이(가) 없습니다. 번역을 클릭하여 생성하십시오.',
      existsHint: '{lang} 이(가) 이미 존재합니다. 기록하려면 덮어쓰기 확인이 필요합니다.',
      previewTitle: '번역 미리보기({lang})',
      previewHint: '아래 번역을 교정한 뒤 기록을 클릭하십시오.',
      sourceLabel: '원본 언어: {lang}',
      writeBackBtn: '기록 확인',
      messages: {
        empty: '이 demo 에는 번역할 현지화 필드가 없습니다',
        translateFailed: '번역 실패: {msg}',
        badRequest: '번역할 수 없습니다: {msg}',
        overwriteNeeded: '{lang} 이(가) 이미 존재합니다. 다시 클릭하여 덮어쓰기를 확인하십시오.',
        writeBackDone: '{lang} 기록 완료',
        writeBackFailed: '기록 실패: {msg}',
      },
    },
  },

  web: {
    title: 'Web 기본 설정',
    subtitle: '브라우저 /ws 엔트리의 기본 엔진, 언어, Demo, 음성',
    alert: '저장하면 새 브라우저 세션부터 적용됩니다(페이지 새로고침 시 새 기본값 적용). 진행 중인 세션은 영향을 받지 않습니다.',
    routeTitle: 'Web 기본값',
  },

  phone: {
    title: 'Phone 기본 설정',
    subtitle: 'PSTN 인바운드 /phone/ws 의 기본 엔진, 언어, Demo, 음성',
    alert: '저장하면 다음 새 통화부터 적용됩니다(per-call hot-reload). 진행 중인 통화는 변경되지 않으며 서비스 재시작이 필요하지 않습니다.',
    routeTitle: 'Phone 기본값',
  },

  defaultsForm: {
    sections: {
      engineDemo: '대화 엔진 및 Demo',
      voice: '음색',
      pipeline: 'Pipeline 모드 (LLM / TTS)',
    },
    pipelineHint: '아래 LLM / TTS / MiniMax 필드는 engine = pipeline 일 때만 사용됩니다. nova-sonic 은 엔드투엔드로 동작하며 이를 참조하지 않습니다(음색은 위에서 계속 선택할 수 있습니다).',
    polyglot: '다국어',
    fields: {
      engine: 'Engine',
      lang: 'Language',
      demo: 'Demo',
      llmModel: 'LLM Model',
      ttsProvider: 'TTS Provider',
      voiceId: 'Voice ID',
      novaVoiceId: 'Nova Sonic 보이스',
      minimaxModel: 'MiniMax Model',
    },
    actions: {
      reset: '되돌리기',
      save: '저장',
    },
    messages: {
      loadFailed: '로드 실패: {msg}',
      noChanges: '변경 사항이 없습니다',
      saved: '저장되었습니다',
      saveFailed: '저장 실패: {msg}',
      restored: '복원되었습니다',
    },
  },

  mcp: {
    title: 'MCP 서버',
    subtitle: '전역 Model Context Protocol 서버 레지스트리 · Demo 페이지에서 demo 별로 마운트',
    notice:
      '이 서버들은 전역 레지스트리에 저장되며 demo 별로 마운트할 수 있습니다. ' +
      'transport 는 <code>sse</code> 와 <code>streamable_http</code> 만 허용됩니다' +
      '(보안상 <code>stdio</code> 는 비활성화). 헤더 값은 쓰기 전용이며 ' +
      '저장된 시크릿은 마스킹되어 브라우저로 다시 전송되지 않습니다.',
    columns: {
      id: 'ID',
      label: 'Label',
      transport: 'Transport',
      auth: '인증',
      url: 'URL',
      enabled: '활성',
    },
    authType: {
      none: '없음',
      header: 'Header',
      sigv4: 'AWS SigV4',
    },
    emptyTitle: 'MCP 서버 없음',
    emptyDesc: 'Model Context Protocol 서버를 등록하면 Demos 페이지에서 각 데모에 마운트할 수 있습니다.',
    actions: {
      add: '서버 추가',
      test: '테스트',
    },
    enabledTag: {
      on: '활성',
      off: '비활성',
    },
    form: {
      titleNew: 'MCP 서버 추가',
      titleEdit: 'MCP 서버 편집',
      id: 'ID',
      idHint: '소문자, 숫자, 하이픈. 2~63자. 생성 후에는 변경할 수 없습니다.',
      label: 'Label',
      transport: 'Transport',
      url: 'URL',
      urlPlaceholder: 'https://example.com/mcp',
      enabled: '활성',
      auth: '인증',
      sigv4Hint: '연결 시 인스턴스 IAM 역할로 AWS SigV4 서명을 사용합니다. 시크릿은 저장되지 않습니다.',
      sigv4Service: 'Service',
      sigv4Region: 'Region',
      headers: 'Headers',
      headersHint: '선택적 HTTP 헤더(예: Authorization). 값은 시크릿으로 저장되며 읽을 때 마스킹됩니다.',
      headerKey: '헤더 이름',
      headerValuePlaceholder: '*** (변경 없음)',
      headerValueNewPlaceholder: '값',
      addHeader: '헤더 추가',
    },
    deleteConfirm: {
      title: 'MCP 서버 삭제',
      body: 'MCP 서버 "{id}" 을(를) 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    },
    test: {
      okTitle: '"{id}" 에 연결됨 · 도구 {n} 개',
      okEmpty: '"{id}" 에 연결되었으나 노출된 도구가 없습니다',
      failTitle: '"{id}" 연결에 실패했습니다',
    },
    messages: {
      loadFailed: 'MCP 서버 로드에 실패했습니다: {msg}',
      saved: '저장되었습니다',
      saveFailed: '저장에 실패했습니다: {msg}',
      deleted: '삭제되었습니다',
      deleteFailed: '삭제에 실패했습니다: {msg}',
      deleteRefused: '"{id}" 을(를) 삭제할 수 없습니다 — 아직 다음 demo 에 마운트되어 있습니다: {demos}. 먼저 거기서 마운트를 해제하십시오.',
      testFailed: '테스트에 실패했습니다: {msg}',
    },
  },

  historySummary: {
    moreFields: 'more fields ({n})',
  },

  users: {
    title: '사용자 관리',
    subtitle: 'JWT 세션 계정 · 역할 + 비밀번호 재설정 + 활성화/비활성화',
    emptyTitle: '사용자 없음',
    emptyDesc: '첫 사용자 계정을 만들어 콘솔 접근 권한을 부여하세요.',
    actions: {
      add: '새 사용자',
      makeAdmin: '관리자로 지정',
      makeUser: '일반 사용자로 지정',
      resetPw: '비밀번호 재설정',
      enable: '활성화',
      disable: '비활성화',
    },
    columns: {
      username: '사용자 이름',
      role: '역할',
      status: '상태',
      createdAt: '생성일',
    },
    roles: {
      admin: '관리자',
      user: '사용자',
    },
    status: {
      active: '활성',
      disabled: '비활성',
    },
    form: {
      titleNew: '사용자 생성',
      titleResetPw: '비밀번호 재설정 · {username}',
      username: '사용자 이름',
      usernameHint: '영문자, 숫자, 마침표, 하이픈, 밑줄; 2~64자.',
      password: '비밀번호',
      newPassword: '새 비밀번호',
      passwordPlaceholder: '비밀번호를 입력하세요',
      role: '역할',
    },
    deleteConfirm: {
      title: '사용자 삭제',
      body: '사용자 "{username}"을(를) 삭제할까요? 이 작업은 취소할 수 없습니다.',
    },
    messages: {
      loadFailed: '사용자 로드 실패: {msg}',
      created: '사용자 "{username}" 생성됨',
      createFailed: '생성 실패: {msg}',
      roleChanged: '"{username}"의 역할이 {role}(으)로 변경됨',
      pwReset: '"{username}"의 비밀번호가 재설정됨',
      enabled: '사용자 "{username}" 활성화됨',
      disabled: '사용자 "{username}" 비활성화됨',
      updateFailed: '업데이트 실패: {msg}',
      deleted: '사용자 "{username}" 삭제됨',
      deleteFailed: '삭제 실패: {msg}',
    },
  },

  // --- Call views merged from the demo SPA (tech_design §3) ---
  // talk / monitor / debug come from the demo views verbatim; myHistory is
  // the demo's per-user call-history view (renamed from `history` to avoid
  // colliding with admin's full HistoryView `history` namespace).
  talk: {
    actions: {
      summarize: '대화 요약 생성 (Markdown)',
      debug: '디버그 / 이벤트 스트림',
    },
    status: {
      ready: '준비됨',
      connecting: '연결 중…',
      recording: '녹음 중…',
    },
    button: {
      start: '시작',
      connecting: '연결 중…',
      stop: '중지',
    },
    defaultsHint: '엔진 / 언어 / 시나리오는 Admin 에서 설정합니다. 기본값을 변경하시려면 {adminLink} 으로 이동하십시오',
    defaultsHintAdminLabel: 'Admin',
    bubbles: {
      empty: '중앙 버튼을 클릭하여 대화를 시작하십시오',
      whoUser: '나',
      whoBot: 'Bot',
      partial: '실시간',
    },
    drawerTitle: '이벤트 스트림 (디버그)',
    summary: {
      title: '대화 요약',
      generating: '생성 중…',
      failed: '요약 실패: {msg}',
    },
    errors: {
      loadConfig: '구성 로드에 실패했습니다: {msg}',
      mic: '마이크 초기화에 실패했습니다: {msg}',
      ws: 'WebSocket 연결에 실패했습니다',
      start: '시작에 실패했습니다: {msg}',
    },
  },
  monitor: {
    status: {
      online: '온라인',
      ended: '종료됨',
      noCalls: '통화 없음',
      idle: '대기 중',
    },
    refreshTooltip: '통화 목록을 즉시 새로고침',
    empty: {
      noActive: '활성 통화가 없습니다',
      noActiveHint: 'PSTN 번호로 전화를 걸거나 /talk 페이지에서 웹 세션을 시작하시면 여기에 표시됩니다.',
      noSelection: '통화를 선택하십시오',
      noSelectionHint: '왼쪽의 진행 중인 통화를 선택하면 해당 이벤트가 스트리밍됩니다.',
      noEvents: '이벤트 대기 중…',
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
      refresh: '새로고침에 실패했습니다: {msg}',
      ws: '모니터 WebSocket 오류',
      callEnded: '통화 {id}… 가 종료되었습니다',
    },
  },
  myHistory: {
    filter: {
      refreshTooltip: '기록을 즉시 새로고침',
      counter: '{filtered} / {total} 건',
    },
    window: {
      all: '전체',
      today: '오늘',
      last7d: '최근 7 일',
      last30d: '최근 30 일',
    },
    list: {
      empty: '통화 기록이 없습니다',
      emptyTitle: '아직 통화가 없습니다',
      loadMore: '더 불러오기',
      end: '— 모두 불러왔습니다 —',
    },
    detail: {
      empty: '기록을 선택하십시오',
      emptyTitle: '선택된 기록이 없습니다',
      notFound: '기록을 찾을 수 없습니다.',
      durationLabel: '시간 {value}',
      turnsLabel: '{n} 턴',
      modelPrefix: 'model: {model}',
      panes: {
        turns: '대화 내용',
        summary: '요약',
      },
      turnsEmpty: '대화 데이터가 없습니다',
      bubbleWho: {
        user: 'USER',
        bot: 'BOT',
      },
    },
    summaryStatus: {
      ok: '생성됨',
      failed: '실패',
      pending: '생성 중',
    },
    summary: {
      pendingHint: '요약 생성 중…',
      failedTitle: '요약 생성에 실패했습니다',
      failedFallback: '알 수 없는 오류',
      empty: '요약 데이터가 없습니다',
      sections: {
        intent: 'Intent',
        keyQuestions: 'Key Questions',
        actionItems: 'Action Items',
        sentiment: 'Sentiment',
      },
      sentimentNeutral: 'neutral',
    },
    rel: {
      seconds: '{n} 초 전',
      minutes: '{n} 분 전',
      hours: '{n} 시간 전',
      days: '{n} 일 전',
    },
    duration: '{m}m {s}s',
    errors: {
      load: '로드에 실패했습니다: {msg}',
      loadMore: '추가 로드에 실패했습니다: {msg}',
      detail: '상세 정보 로드에 실패했습니다: {msg}',
    },
  },
  debug: {
    intro: '원시 EventBroadcaster 이벤트 스트림 (최근 1000 건). 일반 데모에는 필요하지 않으며 문제 해결용입니다.',
    empty: '아직 이벤트가 없습니다',
  },
};
