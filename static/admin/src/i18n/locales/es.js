// Español (es) — admin SPA translation bundle.
//
// Key tree mirrors zh-CN.js exactly; only values differ.
// Español de España. Se usa "Llamada" en lugar de "Llamado".

export default {
  common: {
    unknown: "(desconocido)",
    dash: "—",
    online: 'Conectado',
    offline: 'Desconectado',
    refresh: 'Actualizar',
    save: 'Guardar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    delete: 'Eliminar',
    edit: 'Editar',
    create: 'Crear',
    reset: 'Restablecer',
    loading: 'Cargando...',
    empty: 'Sin datos',
    actions: 'Acciones',
    toggleDark: 'Cambiar a modo oscuro',
    toggleLight: 'Cambiar a modo claro',
    language: 'Idioma',
    yes: 'Sí',
    no: 'No',
    all: 'Todos',
    placeholderDash: '—',
  },

  app: {
    brand: 'Voice Bot Admin',
    sub: 'Configuración en tiempo de ejecución · Gestión de Demos',
    nav: {
      groupOverview: 'Resumen',
      groupConfig: 'Configuración',
      groupCall: 'Llamada',
      groupAdmin: 'Administración',
      dashboard: 'Panel',
      history: 'Historial',
      web: 'Predeterminados Web',
      phone: 'Predeterminados Phone',
      demos: 'Gestión de Demos',
      mcp: 'Servidores MCP',
      talk: 'Hablar',
      monitor: 'Monitor',
      myHistory: 'Mi historial',
      users: 'Usuarios',
    },
    user: {
      logout: 'Cerrar sesión',
    },
  },

  login: {
    subtitle: 'Inicia sesión para continuar',
    username: 'Usuario',
    usernamePlaceholder: 'Introduce tu usuario',
    password: 'Contraseña',
    passwordPlaceholder: 'Introduce tu contraseña',
    submit: 'Iniciar sesión',
    errors: {
      usernameRequired: 'Introduce tu usuario',
      passwordRequired: 'Introduce tu contraseña',
      invalidCredentials: 'Usuario o contraseña incorrectos',
      generic: 'Error al iniciar sesión: {msg}',
    },
  },

  dashboard: {
    title: 'Panel',
    subtitle: 'Métricas de llamadas en vivo · sondeo cada 7 s',
    updatedAt: '· Actualizado a las {time}',
    statusOnline: 'Métricas conectadas',
    statusFailed: 'Error al cargar las métricas',
    refresh: 'Actualizar',
    notice: {
      header: 'Definiciones de métricas',
      body:
        '<strong>Active calls</strong> proviene del ACTIVE_SESSIONS interno del proceso (se cuentan tanto phone como web). ' +
        '<strong>Las métricas de la serie Today / 24h</strong> (totales, duración media, distribución de Outcome / Engine / Demo, tasa de transferencia, concurrencia máxima) ' +
        'se basan en la tabla DDB <code>genaiic-voicebot-call-history</code>; <strong>solo se persisten las llamadas phone</strong>; las sesiones web no se almacenan.',
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
      metricsTitle: 'Métricas clave',
      distributionsTitle: 'Distribuciones',
      outcomeTitle: 'Outcome 24h (phone)',
      engineTitle: 'Engine 24h (phone)',
      demoTitle: 'Demo 24h (phone)',
      total: 'Total {n}',
      totalLabel: 'total',
      empty: 'Sin datos',
    },
    emptyState: 'No se han podido cargar las métricas. Inténtelo de nuevo más tarde o pulse Actualizar en la esquina superior derecha.',
    messages: {
      loadFailed: 'Error al cargar las métricas del panel: {msg}',
    },
  },

  history: {
    title: 'Historial',
    subtitle: 'Explorador de historial de llamadas · paginación por cursor en DDB · filtros / exportación CSV / Markdown / resumen bajo demanda',
    filters: {
      caller: 'Caller',
      callerPlaceholder: '+12025550123',
      outcome: 'Outcome',
      engine: 'Engine',
      demo: 'Demo',
      dateRange: 'Rango de fechas (UTC)',
      all: 'Todos',
    },
    columns: {
      startedAt: 'Started (UTC)',
      caller: 'Caller',
      outcome: 'Outcome',
      engine: 'Engine',
      demo: 'Demo',
      duration: 'Duration',
      summary: 'Summary',
      actions: 'Acciones',
    },
    emptyTitle: 'No se encontraron llamadas',
    emptyDesc: 'Ningún historial de llamadas coincide con los filtros actuales. Ajusta los filtros de arriba o espera a que lleguen nuevas llamadas.',
    actions: {
      refresh: 'Actualizar',
      view: 'Ver',
      exportCsv: 'Exportar CSV',
      downloadMd: 'Descargar MD',
      summarize: 'Generar resumen',
      loadMore: 'Cargar más',
      noMore: 'No hay más resultados',
      loadedRows: '{n} filas cargadas',
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
      transferYes: 'Sí',
      transferNo: 'No',
      turns: 'Turns',
      summary: 'Summary',
      transcript: 'Transcript',
      noTurns: 'No hay datos de turns',
      noSummary: '[No generado]',
    },
    enums: {
      outcome: {
        user_requested: 'Colgado por el usuario',
        task_completed: 'Tarea completada',
        transferred: 'Transferida',
        timeout: 'Tiempo agotado',
        error: 'Error',
        unknown: 'Desconocido',
      },
      summary: {
        ok: 'Generado',
        pending: 'Pendiente',
        failed: 'Generación fallida',
      },
    },
    messages: {
      loadFailed: 'Error al cargar: {msg}',
      loadMoreFailed: 'Error al cargar más: {msg}',
      detailFailed: 'Error al cargar los detalles: {msg}',
      summaryUpdated: 'Resumen actualizado',
      summarizeFailed: 'Error al generar el resumen: {msg}',
    },
  },

  demos: {
    title: 'Gestión de Demos',
    subtitle: 'data/<demo>/manifest.yaml + kb.md + biblioteca global de herramientas · descubrimiento automático',
    actions: {
      rescan: 'Volver a escanear',
      reset: 'Restablecer',
      save: 'Guardar',
    },
    notice:
      'Para añadir un nuevo demo: <code>mkdir data/&lt;demo-id&gt;/</code> con ' +
      '<code>manifest.yaml</code> + <code>kb.md</code>, y pulse "Volver a escanear" para aplicar los cambios. ' +
      'Las herramientas las proporciona el registro global (<code>tools/registry.py</code>); ' +
      'cada demo las activa desde la pestaña Tools del panel lateral derecho.',
    columns: {
      id: 'ID',
      label: 'Label',
      lang: 'Main Language',
      kbChars: 'Caracteres de KB',
      tools: 'Tools',
    },
    emptyTitle: 'No se descubrieron demos',
    emptyDesc: 'Crea una carpeta de demo en data/ con manifest.yaml + kb.md y vuelve a escanear para incorporarla.',
    detail: {
      id: 'ID',
      mainLang: 'Idioma principal',
      kbChars: 'Número de caracteres de KB',
      tags: 'Etiquetas',
      tabs: {
        system: 'System Prompt',
        greeting: 'Greeting',
        kb: 'Resumen de KB',
        tools: 'Tools',
        mcp: 'Servidores MCP',
        translate: 'Traducir',
      },
      kbHint: 'Primeros 500 caracteres · para el contenido completo consulte directamente kb.md',
      toolsHint:
        'Seleccione las herramientas LLM que desea habilitar para este demo. Al guardar se escribe en ' +
        'el campo <code>tools:</code> de <code>data/{id}/manifest.yaml</code> ' +
        'y surte efecto de inmediato (en la próxima sesión nueva).',
      noTools: {
        header: 'No se han encontrado herramientas',
        body:
          '<code>GET /api/admin/tools</code> ha devuelto una lista vacía — compruebe si ' +
          '<code>tools/registry.py</code> está listo en el backend.',
      },
      mcpHint:
        'Seleccione los servidores MCP que desea montar para este demo. Al guardar se escribe en ' +
        'el campo <code>mcp_servers:</code> de <code>data/{id}/manifest.yaml</code> ' +
        'y surte efecto en la próxima sesión nueva.',
      mcpDisabledTag: 'Deshabilitado',
      mcpMissingTag: 'No existe',
      noMcp: {
        header: 'No hay servidores MCP disponibles',
        body:
          'Aún no hay ningún servidor MCP registrado — añada uno primero desde la página ' +
          '<strong>Servidores MCP</strong> y luego vuelva aquí para montarlo.',
      },
    },
    messages: {
      loadFailed: 'Error al cargar la lista de Demos: {msg}',
      toolsLoadFailed: 'Error al cargar la biblioteca de herramientas: {msg}',
      rescanDone: 'Escaneo completado, se han encontrado {n} demos',
      rescanFailed: 'Error en el escaneo: {msg}',
      toolsSaved: 'Tools guardadas',
      mcpSaved: 'Servidores MCP guardados',
      mcpLoadFailed: 'Error al cargar los servidores MCP: {msg}',
      saveFailed: 'Error al guardar: {msg}',
      detailFailed: 'Error al cargar los detalles: {msg}',
    },
    translate: {
      hint:
        'Elija un idioma de destino para traducir con un clic los campos ' +
        'localizados de este demo (system / greeting, etc.). El LLM genera un ' +
        'borrador que puede revisar abajo antes de confirmar la escritura en ' +
        '<code>data/{id}/manifest.yaml</code>.',
      selectPlaceholder: 'Seleccione un idioma de destino',
      translateBtn: 'Traducir',
      optionPresent: 'presente',
      optionMissing: 'ausente',
      missingHint: 'Este demo carece de {lang}; haga clic en Traducir para generarlo.',
      existsHint: '{lang} ya existe; la escritura requiere confirmar la sobrescritura.',
      previewTitle: 'Vista previa de la traducción ({lang})',
      previewHint: 'Revise las traducciones a continuación y luego haga clic en escribir.',
      sourceLabel: 'origen: {lang}',
      writeBackBtn: 'Confirmar escritura',
      messages: {
        empty: 'Este demo no tiene campos localizados para traducir',
        translateFailed: 'Error en la traducción: {msg}',
        badRequest: 'No se puede traducir: {msg}',
        overwriteNeeded: '{lang} ya existe; haga clic de nuevo para confirmar la sobrescritura.',
        writeBackDone: '{lang} escrito',
        writeBackFailed: 'Error al escribir: {msg}',
      },
    },
  },

  web: {
    title: 'Configuración predeterminada Web',
    subtitle: 'Engine, idioma, Demo y voz predeterminados para la entrada del navegador /ws',
    alert: 'Tras guardar, las nuevas sesiones del navegador aplicarán los nuevos valores predeterminados (recargue la página para obtenerlos). Las sesiones ya abiertas no se verán afectadas.',
    routeTitle: 'Predeterminados Web',
  },

  phone: {
    title: 'Configuración predeterminada Phone',
    subtitle: 'Engine, idioma, Demo y voz predeterminados para la entrada PSTN /phone/ws',
    alert: 'Tras guardar, la siguiente llamada nueva aplicará los nuevos valores predeterminados (hot-reload por llamada). Las llamadas en curso no cambian; no es necesario reiniciar el servicio.',
    routeTitle: 'Predeterminados Phone',
  },

  defaultsForm: {
    sections: {
      engineDemo: 'Motor de conversación y Demo',
      voice: 'Voz',
      pipeline: 'Modo Pipeline (LLM / TTS)',
    },
    pipelineHint: 'Los campos LLM / TTS / MiniMax de abajo solo se utilizan cuando engine = pipeline; nova-sonic funciona de extremo a extremo y no los lee (la voz se sigue eligiendo arriba).',
    polyglot: 'Políglota',
    fields: {
      engine: 'Engine',
      lang: 'Language',
      demo: 'Demo',
      llmModel: 'LLM Model',
      ttsProvider: 'TTS Provider',
      voiceId: 'Voice ID',
      novaVoiceId: 'Voz Nova Sonic',
      minimaxModel: 'MiniMax Model',
    },
    actions: {
      reset: 'Restablecer',
      save: 'Guardar',
    },
    messages: {
      loadFailed: 'Error al cargar: {msg}',
      noChanges: 'No hay cambios',
      saved: 'Guardado',
      saveFailed: 'Error al guardar: {msg}',
      restored: 'Restablecido',
    },
  },

  mcp: {
    title: 'Servidores MCP',
    subtitle: 'Registro global de servidores Model Context Protocol · móntelos por demo desde la página de Demos',
    notice:
      'Estos servidores se almacenan en el registro global y pueden montarse por demo. ' +
      'Solo se permiten los transportes <code>sse</code> y <code>streamable_http</code> ' +
      '(<code>stdio</code> está deshabilitado por seguridad). Los valores de las cabeceras son de solo escritura: ' +
      'los secretos almacenados se enmascaran y nunca se devuelven al navegador.',
    columns: {
      id: 'ID',
      label: 'Label',
      transport: 'Transport',
      auth: 'Autenticación',
      url: 'URL',
      enabled: 'Habilitado',
    },
    authType: {
      none: 'Ninguna',
      header: 'Header',
      sigv4: 'AWS SigV4',
    },
    emptyTitle: 'Sin servidores MCP',
    emptyDesc: 'Registra un servidor Model Context Protocol para montarlo en las demos desde la página Demos.',
    actions: {
      add: 'Añadir servidor',
      test: 'Probar',
    },
    enabledTag: {
      on: 'Habilitado',
      off: 'Deshabilitado',
    },
    form: {
      titleNew: 'Añadir servidor MCP',
      titleEdit: 'Editar servidor MCP',
      id: 'ID',
      idHint: 'Letras minúsculas, dígitos y guiones; 2 a 63 caracteres. No se puede cambiar tras la creación.',
      label: 'Label',
      transport: 'Transport',
      url: 'URL',
      urlPlaceholder: 'https://example.com/mcp',
      enabled: 'Habilitado',
      auth: 'Autenticación',
      sigv4Hint: 'Las solicitudes se firman con AWS SigV4 al conectar usando el rol IAM de la instancia. No se almacena ningún secreto.',
      sigv4Service: 'Service',
      sigv4Region: 'Region',
      headers: 'Headers',
      headersHint: 'Cabeceras HTTP opcionales (p. ej. Authorization). Los valores se almacenan como secretos y se enmascaran al leerlos.',
      headerKey: 'Nombre de cabecera',
      headerValuePlaceholder: '*** (sin cambios)',
      headerValueNewPlaceholder: 'Valor',
      addHeader: 'Añadir cabecera',
    },
    deleteConfirm: {
      title: 'Eliminar servidor MCP',
      body: '¿Eliminar el servidor MCP "{id}"? Esta acción no se puede deshacer.',
    },
    test: {
      okTitle: 'Conectado a "{id}" · {n} herramientas',
      okEmpty: 'Conectado a "{id}", pero no expone ninguna herramienta',
      failTitle: 'No se pudo conectar a "{id}"',
    },
    messages: {
      loadFailed: 'No se pudieron cargar los servidores MCP: {msg}',
      saved: 'Guardado',
      saveFailed: 'Error al guardar: {msg}',
      deleted: 'Eliminado',
      deleteFailed: 'Error al eliminar: {msg}',
      deleteRefused: 'No se puede eliminar "{id}" — todavía está montado por los demos: {demos}. Desmóntelo allí primero.',
      testFailed: 'Error en la prueba: {msg}',
    },
  },

  historySummary: {
    moreFields: 'more fields ({n})',
  },

  users: {
    title: 'Gestión de usuarios',
    subtitle: 'Cuentas con sesión JWT · roles + restablecimiento de contraseña + habilitar/deshabilitar',
    emptyTitle: 'No hay usuarios',
    emptyDesc: 'Crea la primera cuenta de usuario para conceder acceso al panel.',
    actions: {
      add: 'Nuevo usuario',
      makeAdmin: 'Hacer admin',
      makeUser: 'Hacer usuario',
      resetPw: 'Restablecer contraseña',
      enable: 'Habilitar',
      disable: 'Deshabilitar',
    },
    columns: {
      username: 'Usuario',
      role: 'Rol',
      status: 'Estado',
      createdAt: 'Creado',
    },
    roles: {
      admin: 'Administrador',
      user: 'Usuario',
    },
    status: {
      active: 'Activo',
      disabled: 'Deshabilitado',
    },
    form: {
      titleNew: 'Crear usuario',
      titleResetPw: 'Restablecer contraseña · {username}',
      username: 'Usuario',
      usernameHint: 'Letras, dígitos, punto, guion y guion bajo; 2 a 64 caracteres.',
      password: 'Contraseña',
      newPassword: 'Nueva contraseña',
      passwordPlaceholder: 'Introduce una contraseña',
      role: 'Rol',
    },
    deleteConfirm: {
      title: 'Eliminar usuario',
      body: '¿Eliminar el usuario "{username}"? Esta acción no se puede deshacer.',
    },
    messages: {
      loadFailed: 'Error al cargar los usuarios: {msg}',
      created: 'Usuario "{username}" creado',
      createFailed: 'Error al crear: {msg}',
      roleChanged: 'Rol de "{username}" cambiado a {role}',
      pwReset: 'Contraseña de "{username}" restablecida',
      enabled: 'Usuario "{username}" habilitado',
      disabled: 'Usuario "{username}" deshabilitado',
      updateFailed: 'Error al actualizar: {msg}',
      deleted: 'Usuario "{username}" eliminado',
      deleteFailed: 'Error al eliminar: {msg}',
    },
  },

  // --- Call views merged from the demo SPA (tech_design §3) ---
  // talk / monitor / debug come from the demo views verbatim; myHistory is
  // the demo's per-user call-history view (renamed from `history` to avoid
  // colliding with admin's full HistoryView `history` namespace).
  talk: {
    actions: {
      summarize: 'Generar resumen de la conversación (Markdown)',
      debug: 'Depurar / flujo de eventos',
    },
    status: {
      ready: 'Listo',
      connecting: 'Conectando…',
      recording: 'Grabando…',
    },
    button: {
      start: 'Iniciar',
      connecting: 'Conectando…',
      stop: 'Detener',
    },
    defaultsHint: 'El motor / idioma / escenario se configuran en Admin. Para cambiar los valores predeterminados, vaya a {adminLink}',
    defaultsHintAdminLabel: 'Admin',
    bubbles: {
      empty: 'Pulse el botón central para iniciar la conversación',
      whoUser: 'Yo',
      whoBot: 'Bot',
      partial: 'En vivo',
    },
    drawerTitle: 'Flujo de eventos (depuración)',
    summary: {
      title: 'Resumen de la conversación',
      generating: 'Generando…',
      failed: 'Error al generar el resumen: {msg}',
    },
    errors: {
      loadConfig: 'Error al cargar la configuración: {msg}',
      mic: 'Error al inicializar el micrófono: {msg}',
      ws: 'Error de conexión WebSocket',
      start: 'Error al iniciar: {msg}',
    },
  },
  monitor: {
    status: {
      online: 'Conectado',
      ended: 'Finalizada',
      noCalls: 'Sin llamadas',
      idle: 'Inactivo',
    },
    refreshTooltip: 'Actualizar la lista de llamadas ahora',
    empty: {
      noActive: 'No hay llamadas activas',
      noActiveHint: 'Llame a un número PSTN o inicie una sesión web en /talk para verla aquí.',
      noSelection: 'Seleccione una llamada',
      noSelectionHint: 'Elija una llamada en curso a la izquierda para transmitir sus eventos.',
      noEvents: 'Esperando eventos…',
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
      refresh: 'Error al actualizar: {msg}',
      ws: 'Error de WebSocket del monitor',
      callEnded: 'La llamada {id}… ha finalizado',
    },
  },
  myHistory: {
    filter: {
      refreshTooltip: 'Actualizar el historial ahora',
      counter: '{filtered} / {total} mostrados',
    },
    window: {
      all: 'Todo',
      today: 'Hoy',
      last7d: 'Últimos 7 días',
      last30d: 'Últimos 30 días',
    },
    list: {
      empty: 'Sin historial de llamadas',
      emptyTitle: 'Aún no hay llamadas',
      loadMore: 'Cargar más',
      end: '— Todo cargado —',
    },
    detail: {
      empty: 'Seleccione un registro',
      emptyTitle: 'Ningún registro seleccionado',
      notFound: 'Registro no encontrado.',
      durationLabel: 'Duración {value}',
      turnsLabel: '{n} turnos',
      modelPrefix: 'model: {model}',
      panes: {
        turns: 'Conversación',
        summary: 'Resumen',
      },
      turnsEmpty: 'Sin datos de conversación',
      bubbleWho: {
        user: 'USER',
        bot: 'BOT',
      },
    },
    summaryStatus: {
      ok: 'Generado',
      failed: 'Fallido',
      pending: 'Generando',
    },
    summary: {
      pendingHint: 'Generando resumen…',
      failedTitle: 'Error al generar el resumen',
      failedFallback: 'Error desconocido',
      empty: 'Sin datos de resumen',
      sections: {
        intent: 'Intent',
        keyQuestions: 'Key Questions',
        actionItems: 'Action Items',
        sentiment: 'Sentiment',
      },
      sentimentNeutral: 'neutral',
    },
    rel: {
      seconds: 'hace {n} s',
      minutes: 'hace {n} min',
      hours: 'hace {n} h',
      days: 'hace {n} d',
    },
    duration: '{m}m {s}s',
    errors: {
      load: 'Error al cargar: {msg}',
      loadMore: 'Error al cargar más: {msg}',
      detail: 'Error al cargar el detalle: {msg}',
    },
  },
  debug: {
    intro: 'Flujo bruto de eventos de EventBroadcaster (últimos 1000). No es necesario para demos normales — se conserva para diagnóstico.',
    empty: 'Aún no hay eventos',
  },
};
