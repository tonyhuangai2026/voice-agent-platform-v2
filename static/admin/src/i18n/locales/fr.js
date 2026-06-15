// Français (fr) — admin SPA translation bundle.
//
// Key tree mirrors zh-CN.js exactly; only values differ.
// Français standard, vouvoiement.

export default {
  common: {
    unknown: "(inconnu)",
    dash: "—",
    online: 'En ligne',
    offline: 'Hors ligne',
    refresh: 'Actualiser',
    save: 'Enregistrer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    delete: 'Supprimer',
    edit: 'Modifier',
    create: 'Créer',
    reset: 'Réinitialiser',
    loading: 'Chargement...',
    empty: 'Aucune donnée',
    actions: 'Actions',
    toggleDark: 'Passer en mode sombre',
    toggleLight: 'Passer en mode clair',
    language: 'Langue',
    yes: 'Oui',
    no: 'Non',
    all: 'Tous',
    placeholderDash: '—',
  },

  app: {
    brand: 'Voice Bot Admin',
    sub: 'Configuration d’exécution · Gestion des démos',
    nav: {
      groupOverview: 'Vue d’ensemble',
      groupConfig: 'Configuration',
      groupCall: 'Appel',
      groupAdmin: 'Administration',
      dashboard: 'Tableau de bord',
      history: 'Historique',
      web: 'Valeurs par défaut Web',
      phone: 'Valeurs par défaut Phone',
      demos: 'Gestion des démos',
      mcp: 'Serveurs MCP',
      talk: 'Parler',
      monitor: 'Superviser',
      myHistory: 'Mon historique',
      users: 'Utilisateurs',
    },
    user: {
      logout: 'Se déconnecter',
    },
  },

  login: {
    subtitle: 'Connectez-vous pour continuer',
    username: 'Nom d’utilisateur',
    usernamePlaceholder: 'Saisissez votre nom d’utilisateur',
    password: 'Mot de passe',
    passwordPlaceholder: 'Saisissez votre mot de passe',
    submit: 'Se connecter',
    errors: {
      usernameRequired: 'Saisissez votre nom d’utilisateur',
      passwordRequired: 'Saisissez votre mot de passe',
      invalidCredentials: 'Nom d’utilisateur ou mot de passe incorrect',
      generic: 'Échec de la connexion : {msg}',
    },
  },

  setup: {
    subtitle: 'Première utilisation · Configurer l’administrateur',
    intro: 'Ce déploiement n’a pas encore été initialisé. Créez le premier compte administrateur pour continuer ; vous serez connecté automatiquement.',
    username: 'Nom d’utilisateur',
    usernamePlaceholder: 'Choisissez un nom d’utilisateur administrateur',
    password: 'Mot de passe',
    passwordPlaceholder: 'Choisissez un mot de passe administrateur',
    confirm: 'Confirmer le mot de passe',
    confirmPlaceholder: 'Saisissez à nouveau le mot de passe',
    submit: 'Créer l’administrateur',
    errors: {
      usernameRequired: 'Saisissez un nom d’utilisateur',
      passwordRequired: 'Saisissez un mot de passe',
      passwordsMismatch: 'Les deux mots de passe ne correspondent pas',
      alreadyInitialized: 'Ce déploiement est déjà initialisé. Veuillez aller à la page de connexion.',
      invalidInput: 'Le nom d’utilisateur et le mot de passe ne peuvent pas être vides.',
      generic: 'Échec de la création : {msg}',
    },
  },

  dashboard: {
    title: 'Tableau de bord',
    subtitle: 'Métriques d’appels en direct · sondage 7 s',
    updatedAt: '· Mis à jour à {time}',
    statusOnline: 'Métriques en ligne',
    statusFailed: 'Échec de récupération des métriques',
    refresh: 'Actualiser',
    notice: {
      header: 'Définitions des indicateurs',
      body:
        '<strong>Active calls</strong> provient des ACTIVE_SESSIONS internes au processus (phone et web sont comptabilisés). ' +
        '<strong>Les indicateurs de la série Today / 24h</strong> (totaux, durée moyenne, répartition Outcome / Engine / Demo, taux de transfert, pic de concurrence) ' +
        's’appuient sur la table DDB <code>genaiic-voicebot-call-history</code> ; <strong>seuls les appels phone sont persistés</strong>, les sessions web ne le sont pas.',
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
      metricsTitle: 'Indicateurs clés',
      distributionsTitle: 'Répartitions',
      outcomeTitle: 'Outcome 24h (phone)',
      engineTitle: 'Engine 24h (phone)',
      demoTitle: 'Demo 24h (phone)',
      total: 'Total {n}',
      totalLabel: 'total',
      empty: 'Aucune donnée',
    },
    emptyState: 'Échec du chargement des métriques. Veuillez réessayer plus tard ou cliquer sur Actualiser en haut à droite.',
    messages: {
      loadFailed: 'Échec du chargement des métriques du tableau de bord : {msg}',
    },
  },

  history: {
    title: 'Historique',
    subtitle: 'Explorateur de l’historique des appels · pagination par curseur DDB · filtres / export CSV / Markdown / résumé à la demande',
    filters: {
      caller: 'Caller',
      callerPlaceholder: '+12025550123',
      outcome: 'Outcome',
      engine: 'Engine',
      demo: 'Demo',
      dateRange: 'Plage de dates (UTC)',
      all: 'Tous',
    },
    columns: {
      startedAt: 'Started (UTC)',
      caller: 'Caller',
      outcome: 'Outcome',
      engine: 'Engine',
      demo: 'Demo',
      duration: 'Duration',
      summary: 'Summary',
      actions: 'Actions',
    },
    emptyTitle: 'Aucun appel trouvé',
    emptyDesc: 'Aucun historique d\'appels ne correspond aux filtres actuels. Ajustez les filtres ci-dessus ou attendez l\'arrivée de nouveaux appels.',
    actions: {
      refresh: 'Actualiser',
      view: 'Afficher',
      exportCsv: 'Exporter en CSV',
      downloadMd: 'Télécharger le MD',
      summarize: 'Générer un résumé',
      loadMore: 'Charger plus',
      noMore: 'Aucun autre résultat',
      loadedRows: '{n} lignes chargées',
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
      transferYes: 'Oui',
      transferNo: 'Non',
      turns: 'Turns',
      summary: 'Summary',
      transcript: 'Transcript',
      noTurns: 'Aucune donnée turns',
      noSummary: '[Non généré]',
    },
    enums: {
      outcome: {
        user_requested: 'Raccroché par l’utilisateur',
        task_completed: 'Tâche terminée',
        transferred: 'Transférée',
        timeout: 'Délai dépassé',
        error: 'Erreur',
        unknown: 'Inconnu',
      },
      summary: {
        ok: 'Généré',
        pending: 'En attente',
        failed: 'Échec de génération',
      },
    },
    messages: {
      loadFailed: 'Échec du chargement : {msg}',
      loadMoreFailed: 'Échec du chargement supplémentaire : {msg}',
      detailFailed: 'Échec du chargement des détails : {msg}',
      summaryUpdated: 'Résumé mis à jour',
      summarizeFailed: 'Échec de génération du résumé : {msg}',
    },
  },

  demos: {
    title: 'Gestion des démos',
    subtitle: 'data/<demo>/manifest.yaml + kb.md + bibliothèque d’outils globale · découverte automatique',
    actions: {
      rescan: 'Rescanner',
      reset: 'Réinitialiser',
      save: 'Enregistrer',
    },
    notice:
      'Pour ajouter une nouvelle démo : <code>mkdir data/&lt;demo-id&gt;/</code> contenant ' +
      '<code>manifest.yaml</code> + <code>kb.md</code>, puis cliquez sur « Rescanner » pour l’activer. ' +
      'Les outils sont fournis par le registre global (<code>tools/registry.py</code>) ; ' +
      'chaque démo les active depuis l’onglet Tools du tiroir latéral droit.',
    columns: {
      id: 'ID',
      label: 'Label',
      lang: 'Main Language',
      kbChars: 'Caractères de KB',
      tools: 'Tools',
    },
    emptyTitle: 'Aucune démo découverte',
    emptyDesc: 'Créez un dossier de démo dans data/ avec manifest.yaml + kb.md, puis relancez le scan pour le prendre en compte.',
    detail: {
      id: 'ID',
      mainLang: 'Langue principale',
      kbChars: 'Nombre de caractères de KB',
      tags: 'Étiquettes',
      tabs: {
        system: 'System Prompt',
        greeting: 'Greeting',
        kb: 'Extrait de KB',
        tools: 'Tools',
        mcp: 'Serveurs MCP',
        translate: 'Traduire',
      },
      kbHint: 'Premiers 500 caractères · pour le contenu complet, consultez directement kb.md',
      toolsHint:
        'Sélectionnez les outils LLM à activer pour cette démo. L’enregistrement écrit dans ' +
        'le champ <code>tools:</code> de <code>data/{id}/manifest.yaml</code> ' +
        'et prend effet immédiatement (à la prochaine nouvelle session).',
      noTools: {
        header: 'Aucun outil disponible',
        body:
          '<code>GET /api/admin/tools</code> a renvoyé une liste vide — veuillez vérifier que ' +
          '<code>tools/registry.py</code> est bien en place côté backend.',
      },
      mcpHint:
        'Sélectionnez les serveurs MCP à monter pour cette démo. L’enregistrement écrit dans ' +
        'le champ <code>mcp_servers:</code> de <code>data/{id}/manifest.yaml</code> ' +
        'et prend effet à la prochaine nouvelle session.',
      mcpDisabledTag: 'Désactivé',
      mcpMissingTag: 'Introuvable',
      noMcp: {
        header: 'Aucun serveur MCP disponible',
        body:
          'Aucun serveur MCP n’est encore enregistré — ajoutez-en un d’abord depuis la page ' +
          '<strong>Serveurs MCP</strong>, puis revenez ici pour le monter.',
      },
    },
    messages: {
      loadFailed: 'Échec du chargement de la liste des démos : {msg}',
      toolsLoadFailed: 'Échec du chargement de la bibliothèque d’outils : {msg}',
      rescanDone: 'Scan terminé, {n} démo(s) détectée(s)',
      rescanFailed: 'Échec du scan : {msg}',
      toolsSaved: 'Outils enregistrés',
      mcpSaved: 'Serveurs MCP enregistrés',
      mcpLoadFailed: 'Échec du chargement des serveurs MCP : {msg}',
      saveFailed: 'Échec de l’enregistrement : {msg}',
      detailFailed: 'Échec du chargement des détails : {msg}',
    },
    translate: {
      hint:
        'Choisissez une langue cible pour traduire en un clic les champs ' +
        'localisés de cette démo (system / greeting, etc.). Le LLM génère un ' +
        'brouillon que vous pouvez relire ci-dessous avant de confirmer ' +
        'l’écriture dans <code>data/{id}/manifest.yaml</code>.',
      selectPlaceholder: 'Choisir une langue cible',
      translateBtn: 'Traduire',
      optionPresent: 'présente',
      optionMissing: 'absente',
      missingHint: 'Cette démo n’a pas {lang} ; cliquez sur Traduire pour le générer.',
      existsHint: '{lang} existe déjà ; l’écriture nécessite une confirmation d’écrasement.',
      previewTitle: 'Aperçu de la traduction ({lang})',
      previewHint: 'Relisez les traductions ci-dessous, puis cliquez sur écrire.',
      sourceLabel: 'source : {lang}',
      writeBackBtn: 'Confirmer l’écriture',
      messages: {
        empty: 'Cette démo n’a aucun champ localisé à traduire',
        translateFailed: 'Échec de la traduction : {msg}',
        badRequest: 'Traduction impossible : {msg}',
        overwriteNeeded: '{lang} existe déjà ; cliquez à nouveau pour confirmer l’écrasement.',
        writeBackDone: '{lang} écrit',
        writeBackFailed: 'Échec de l’écriture : {msg}',
      },
    },
  },

  web: {
    title: 'Configuration par défaut Web',
    subtitle: 'Moteur, langue, démo et voix par défaut pour le point d’entrée navigateur /ws',
    alert: 'Après l’enregistrement, les nouvelles sessions navigateur prennent en compte les nouveaux paramètres (rechargez la page pour les obtenir). Les sessions ouvertes ne sont pas affectées.',
    routeTitle: 'Valeurs par défaut Web',
  },

  phone: {
    title: 'Configuration par défaut Phone',
    subtitle: 'Moteur, langue, démo et voix par défaut pour les appels PSTN entrants /phone/ws',
    alert: 'Après l’enregistrement, le prochain nouvel appel utilise les nouveaux paramètres (hot-reload par appel). Les appels en cours restent inchangés ; aucun redémarrage de service n’est nécessaire.',
    routeTitle: 'Valeurs par défaut Phone',
  },

  defaultsForm: {
    sections: {
      engineDemo: 'Moteur de conversation et démo',
      voice: 'Voix',
      pipeline: 'Mode Pipeline (LLM / TTS)',
    },
    pipelineHint: 'Les champs LLM / TTS / MiniMax ci-dessous ne sont utilisés que lorsque engine = pipeline ; nova-sonic fonctionne de bout en bout et ne les lit pas (la voix reste sélectionnable ci-dessus).',
    polyglot: 'Polyglotte',
    fields: {
      engine: 'Engine',
      lang: 'Language',
      demo: 'Demo',
      llmModel: 'LLM Model',
      ttsProvider: 'TTS Provider',
      voiceId: 'Voice ID',
      novaVoiceId: 'Voix Nova Sonic',
      minimaxModel: 'MiniMax Model',
    },
    actions: {
      reset: 'Réinitialiser',
      save: 'Enregistrer',
    },
    messages: {
      loadFailed: 'Échec du chargement : {msg}',
      noChanges: 'Aucune modification',
      saved: 'Enregistré',
      saveFailed: 'Échec de l’enregistrement : {msg}',
      restored: 'Réinitialisé',
    },
  },

  mcp: {
    title: 'Serveurs MCP',
    subtitle: 'Registre global des serveurs Model Context Protocol · à monter par démo depuis la page Démos',
    notice:
      'Ces serveurs sont stockés dans le registre global et peuvent être montés par démo. ' +
      'Seuls les transports <code>sse</code> et <code>streamable_http</code> sont autorisés ' +
      '(<code>stdio</code> est désactivé pour des raisons de sécurité). Les valeurs d’en-tête sont en écriture seule : ' +
      'les secrets stockés sont masqués et ne sont jamais renvoyés au navigateur.',
    columns: {
      id: 'ID',
      label: 'Label',
      transport: 'Transport',
      auth: 'Authentification',
      url: 'URL',
      enabled: 'Activé',
    },
    authType: {
      none: 'Aucune',
      header: 'Header',
      sigv4: 'AWS SigV4',
    },
    emptyTitle: 'Aucun serveur MCP',
    emptyDesc: 'Enregistrez un serveur Model Context Protocol pour le monter sur les démos depuis la page Démos.',
    actions: {
      add: 'Ajouter un serveur',
      test: 'Tester',
    },
    enabledTag: {
      on: 'Activé',
      off: 'Désactivé',
    },
    form: {
      titleNew: 'Ajouter un serveur MCP',
      titleEdit: 'Modifier le serveur MCP',
      id: 'ID',
      idHint: 'Lettres minuscules, chiffres et traits d’union ; 2 à 63 caractères. Non modifiable après création.',
      label: 'Label',
      transport: 'Transport',
      url: 'URL',
      urlPlaceholder: 'https://example.com/mcp',
      enabled: 'Activé',
      auth: 'Authentification',
      sigv4Hint: 'Les requêtes sont signées avec AWS SigV4 à la connexion via le rôle IAM de l’instance. Aucun secret n’est stocké.',
      sigv4Service: 'Service',
      sigv4Region: 'Region',
      headers: 'Headers',
      headersHint: 'En-têtes HTTP facultatifs (par ex. Authorization). Les valeurs sont stockées comme des secrets et masquées à la lecture.',
      headerKey: 'Nom de l’en-tête',
      headerValuePlaceholder: '*** (inchangé)',
      headerValueNewPlaceholder: 'Valeur',
      addHeader: 'Ajouter un en-tête',
    },
    deleteConfirm: {
      title: 'Supprimer le serveur MCP',
      body: 'Supprimer le serveur MCP « {id} » ? Cette action est irréversible.',
    },
    test: {
      okTitle: 'Connecté à « {id} » · {n} outils',
      okEmpty: 'Connecté à « {id} », mais aucun outil n’est exposé',
      failTitle: 'Échec de la connexion à « {id} »',
    },
    messages: {
      loadFailed: 'Échec du chargement des serveurs MCP : {msg}',
      saved: 'Enregistré',
      saveFailed: 'Échec de l’enregistrement : {msg}',
      deleted: 'Supprimé',
      deleteFailed: 'Échec de la suppression : {msg}',
      deleteRefused: 'Impossible de supprimer « {id} » — encore monté par les démos : {demos}. Démontez-le d’abord à cet endroit.',
      testFailed: 'Échec du test : {msg}',
    },
  },

  historySummary: {
    moreFields: 'more fields ({n})',
  },

  users: {
    title: 'Gestion des utilisateurs',
    subtitle: 'Comptes à session JWT · rôles + réinitialisation du mot de passe + activer/désactiver',
    emptyTitle: 'Aucun utilisateur',
    emptyDesc: 'Créez le premier compte utilisateur pour accorder l’accès à la console.',
    actions: {
      add: 'Nouvel utilisateur',
      makeAdmin: 'Promouvoir admin',
      makeUser: 'Rétrograder utilisateur',
      resetPw: 'Réinitialiser le mot de passe',
      enable: 'Activer',
      disable: 'Désactiver',
    },
    columns: {
      username: 'Utilisateur',
      role: 'Rôle',
      status: 'Statut',
      createdAt: 'Créé',
    },
    roles: {
      admin: 'Administrateur',
      user: 'Utilisateur',
    },
    status: {
      active: 'Actif',
      disabled: 'Désactivé',
    },
    form: {
      titleNew: 'Créer un utilisateur',
      titleResetPw: 'Réinitialiser le mot de passe · {username}',
      username: 'Utilisateur',
      usernameHint: 'Lettres, chiffres, point, tiret et tiret bas ; 2 à 64 caractères.',
      password: 'Mot de passe',
      newPassword: 'Nouveau mot de passe',
      passwordPlaceholder: 'Saisir un mot de passe',
      role: 'Rôle',
    },
    deleteConfirm: {
      title: 'Supprimer l’utilisateur',
      body: 'Supprimer l’utilisateur « {username} » ? Cette action est irréversible.',
    },
    messages: {
      loadFailed: 'Échec du chargement des utilisateurs : {msg}',
      created: 'Utilisateur « {username} » créé',
      createFailed: 'Échec de la création : {msg}',
      roleChanged: 'Rôle de « {username} » changé en {role}',
      pwReset: 'Mot de passe de « {username} » réinitialisé',
      enabled: 'Utilisateur « {username} » activé',
      disabled: 'Utilisateur « {username} » désactivé',
      updateFailed: 'Échec de la mise à jour : {msg}',
      deleted: 'Utilisateur « {username} » supprimé',
      deleteFailed: 'Échec de la suppression : {msg}',
    },
  },

  // --- Call views merged from the demo SPA (tech_design §3) ---
  // talk / monitor / debug come from the demo views verbatim; myHistory is
  // the demo's per-user call-history view (renamed from `history` to avoid
  // colliding with admin's full HistoryView `history` namespace).
  talk: {
    actions: {
      summarize: 'Générer un résumé de la conversation (Markdown)',
      debug: 'Déboguer / flux d\'événements',
    },
    status: {
      ready: 'Prêt',
      connecting: 'Connexion…',
      recording: 'Enregistrement…',
    },
    button: {
      start: 'Démarrer',
      connecting: 'Connexion…',
      stop: 'Arrêter',
    },
    defaultsHint: 'Le moteur / la langue / le scénario sont configurés dans Admin. Pour modifier les valeurs par défaut, veuillez accéder à {adminLink}',
    defaultsHintAdminLabel: 'Admin',
    bubbles: {
      empty: 'Cliquez sur le bouton central pour commencer la conversation',
      whoUser: 'Moi',
      whoBot: 'Bot',
      partial: 'En direct',
    },
    drawerTitle: 'Flux d\'événements (débogage)',
    summary: {
      title: 'Résumé de la conversation',
      generating: 'Génération…',
      failed: 'Échec du résumé : {msg}',
    },
    errors: {
      loadConfig: 'Échec du chargement de la configuration : {msg}',
      mic: 'Échec de l\'initialisation du micro : {msg}',
      ws: 'Échec de la connexion WebSocket',
      start: 'Échec du démarrage : {msg}',
    },
  },
  monitor: {
    status: {
      online: 'En ligne',
      ended: 'Terminé',
      noCalls: 'Aucun appel',
      idle: 'Inactif',
    },
    refreshTooltip: 'Actualiser la liste des appels',
    empty: {
      noActive: 'Aucun appel actif',
      noActiveHint: 'Appelez un numéro PSTN ou démarrez une session web sur /talk pour le voir ici.',
      noSelection: 'Sélectionnez un appel',
      noSelectionHint: 'Choisissez un appel en cours à gauche pour diffuser ses événements.',
      noEvents: 'En attente d\'événements…',
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
      refresh: 'Échec de l\'actualisation : {msg}',
      ws: 'Erreur WebSocket du moniteur',
      callEnded: 'L\'appel {id}… est terminé',
    },
  },
  myHistory: {
    filter: {
      refreshTooltip: 'Actualiser l\'historique',
      counter: '{filtered} / {total} affichés',
    },
    window: {
      all: 'Tout',
      today: 'Aujourd\'hui',
      last7d: '7 derniers jours',
      last30d: '30 derniers jours',
    },
    list: {
      empty: 'Aucun historique d\'appel',
      emptyTitle: 'Aucun appel pour l\'instant',
      loadMore: 'Charger plus',
      end: '— Tout chargé —',
    },
    detail: {
      empty: 'Sélectionnez un enregistrement',
      emptyTitle: 'Aucun enregistrement sélectionné',
      notFound: 'Enregistrement introuvable.',
      durationLabel: 'Durée {value}',
      turnsLabel: '{n} tours',
      modelPrefix: 'model: {model}',
      panes: {
        turns: 'Conversation',
        summary: 'Résumé',
      },
      turnsEmpty: 'Aucune donnée de conversation',
      bubbleWho: {
        user: 'USER',
        bot: 'BOT',
      },
    },
    summaryStatus: {
      ok: 'Généré',
      failed: 'Échec',
      pending: 'Génération',
    },
    summary: {
      pendingHint: 'Génération du résumé…',
      failedTitle: 'Échec de la génération du résumé',
      failedFallback: 'Erreur inconnue',
      empty: 'Aucune donnée de résumé',
      sections: {
        intent: 'Intent',
        keyQuestions: 'Key Questions',
        actionItems: 'Action Items',
        sentiment: 'Sentiment',
      },
      sentimentNeutral: 'neutral',
    },
    rel: {
      seconds: 'il y a {n} s',
      minutes: 'il y a {n} min',
      hours: 'il y a {n} h',
      days: 'il y a {n} j',
    },
    duration: '{m}m {s}s',
    errors: {
      load: 'Échec du chargement : {msg}',
      loadMore: 'Échec du chargement supplémentaire : {msg}',
      detail: 'Échec du chargement des détails : {msg}',
    },
  },
  debug: {
    intro: 'Flux brut d\'événements EventBroadcaster (1000 derniers). Non requis pour les démos courantes — conservé pour le diagnostic.',
    empty: 'Aucun événement pour l\'instant',
  },
};
