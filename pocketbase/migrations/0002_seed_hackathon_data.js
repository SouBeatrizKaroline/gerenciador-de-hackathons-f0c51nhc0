migrate(
  (app) => {
    try {
      app.findFirstRecordByData('teams', 'name', 'Code Breakers')
      return
    } catch (_) {}

    var now = new Date()
    var dayMs = 86400000

    try {
      app.findAuthRecordByEmail('_pb_users_auth_', '1aspiraqualquer@gmail.com')
    } catch (_) {
      var users = app.findCollectionByNameOrId('_pb_users_auth_')
      var rec = new Record(users)
      rec.setEmail('1aspiraqualquer@gmail.com')
      rec.setPassword('Skip@Pass')
      rec.setVerified(true)
      rec.set('name', 'Organizador')
      app.save(rec)
    }

    var teamsCol = app.findCollectionByNameOrId('teams')
    function mkTeam(name, desc, color) {
      var r = new Record(teamsCol)
      r.set('name', name)
      r.set('description', desc)
      r.set('color', color)
      app.save(r)
      return r.id
    }
    var t1 = mkTeam('Code Breakers', 'Soluções inovadoras com IA', '#6e56cf')
    var t2 = mkTeam('Dev Dynasty', 'Desenvolvimento full-stack ágil', '#3b82f6')
    var t3 = mkTeam('Pixel Pirates', 'Design e experiência do usuário', '#10b981')
    var t4 = mkTeam('Quantum Coders', 'Blockchain e tecnologias Web3', '#f5d565')

    var membersCol = app.findCollectionByNameOrId('members')
    var memberData = [
      ['Ana Silva', 'Desenvolvedora', t1],
      ['Bruno Costa', 'Tech Lead', t1],
      ['Carla Mendes', 'Full-stack', t2],
      ['Diego Santos', 'Backend', t2],
      ['Elisa Rocha', 'Frontend', t2],
      ['Felipe Alves', 'UX Designer', t3],
      ['Gabriela Lima', 'UI Designer', t3],
      ['Hugo Nascimento', 'Blockchain Dev', t4],
      ['Iris Ferreira', 'Smart Contract Dev', t4],
    ]
    memberData.forEach(function (m) {
      var r = new Record(membersCol)
      r.set('name', m[0])
      r.set('role', m[1])
      r.set('team_id', m[2])
      app.save(r)
    })

    var projectsCol = app.findCollectionByNameOrId('projects')
    function mkProject(title, desc, teamId, status) {
      var r = new Record(projectsCol)
      r.set('title', title)
      r.set('description', desc)
      r.set('team_id', teamId)
      r.set('status', status)
      app.save(r)
      return r.id
    }
    var p1 = mkProject(
      'Plataforma de Mentoria IA',
      'Sistema de matching entre mentores e mentorados',
      t1,
      'desenvolvimento',
    )
    var p2 = mkProject(
      'Dashboard de Analytics',
      'Painel visual de métricas em tempo real',
      t2,
      'desenvolvimento',
    )
    var p3 = mkProject(
      'App de Doações Transparentes',
      'Plataforma de doações com rastreabilidade',
      t3,
      'revisao',
    )
    var p4 = mkProject(
      'Sistema de Votação Web3',
      'Votação descentralizada com contratos inteligentes',
      t4,
      'planejamento',
    )
    var p5 = mkProject('Gestor de Tickets', 'Sistema de suporte e tickets', t2, 'concluido')

    var tasksCol = app.findCollectionByNameOrId('tasks')
    var taskData = [
      ['Configurar ambiente de desenvolvimento', p1, 'concluida', 'alta'],
      ['Implementar API de matching', p1, 'em_andamento', 'alta'],
      ['Criar interface do chat', p1, 'a_fazer', 'media'],
      ['Configurar banco de dados', p2, 'concluida', 'alta'],
      ['Implementar gráficos em tempo real', p2, 'em_andamento', 'media'],
      ['Criar página de login', p2, 'a_fazer', 'baixa'],
      ['Design da tela principal', p3, 'concluida', 'media'],
      ['Implementar rastreabilidade', p3, 'em_andamento', 'alta'],
      ['Estudar contratos inteligentes', p4, 'a_fazer', 'alta'],
      ['Definir arquitetura Web3', p4, 'em_andamento', 'media'],
      ['Correção de bugs finais', p5, 'concluida', 'alta'],
      ['Documentação do projeto', p5, 'concluida', 'baixa'],
    ]
    taskData.forEach(function (td) {
      var r = new Record(tasksCol)
      r.set('title', td[0])
      r.set('project_id', td[1])
      r.set('status', td[2])
      r.set('priority', td[3])
      app.save(r)
    })

    var allTasks = app.findRecordsByFilter('tasks', '', '-created', 100, 0)
    allTasks.forEach(function (task, i) {
      var daysAgo = Math.floor(i / 2)
      var date = new Date(now.getTime() - daysAgo * dayMs).toISOString()
      app
        .db()
        .newQuery('UPDATE tasks SET created = {:d} WHERE id = {:id}')
        .bind({ d: date, id: task.id })
        .execute()
    })

    var eventsCol = app.findCollectionByNameOrId('events')
    var eventData = [
      [
        'Abertura do Hackathon',
        'Cerimônia de abertura com apresentação das regras',
        new Date(now.getTime() + dayMs).toISOString(),
        'Auditório Principal',
      ],
      [
        'Workshop de IA Generativa',
        'Workshop prático sobre modelos de linguagem',
        new Date(now.getTime() + 2 * dayMs).toISOString(),
        'Sala 101',
      ],
      [
        'Mentoria Técnica',
        'Sessão de mentoria com especialistas',
        new Date(now.getTime() + 3 * dayMs).toISOString(),
        'Lab de Inovação',
      ],
      [
        'Apresentação Final',
        'Apresentação dos projetos e premiação',
        new Date(now.getTime() + 5 * dayMs).toISOString(),
        'Auditório Principal',
      ],
    ]
    eventData.forEach(function (ed) {
      var r = new Record(eventsCol)
      r.set('title', ed[0])
      r.set('description', ed[1])
      r.set('date', ed[2])
      r.set('location', ed[3])
      app.save(r)
    })

    var activitiesCol = app.findCollectionByNameOrId('activities')
    var activityData = [
      ["Equipe 'Code Breakers' foi criada", 'equipe_criada'],
      ["Projeto 'Plataforma de Mentoria IA' foi criado", 'projeto_criado'],
      ["Tarefa 'Configurar ambiente' foi concluída", 'tarefa_concluida'],
      ['Ana Silva ingressou na equipe Code Breakers', 'membro_adicionado'],
      ["Projeto 'Gestor de Tickets' foi concluído", 'projeto_criado'],
      ['Diego Santos ingressou na equipe Dev Dynasty', 'membro_adicionado'],
    ]
    activityData.forEach(function (ad) {
      var r = new Record(activitiesCol)
      r.set('description', ad[0])
      r.set('type', ad[1])
      app.save(r)
    })

    var allActivities = app.findRecordsByFilter('activities', '', '-created', 100, 0)
    allActivities.forEach(function (act, i) {
      var hoursAgo = i * 3
      var date = new Date(now.getTime() - hoursAgo * 3600000).toISOString()
      app
        .db()
        .newQuery('UPDATE activities SET created = {:d} WHERE id = {:id}')
        .bind({ d: date, id: act.id })
        .execute()
    })

    var awardsCol = app.findCollectionByNameOrId('awards')
    var awardData = [
      ['Primeiro Lugar', 'Troféu de campeão do hackathon', 1000, '🥇'],
      ['Segundo Lugar', 'Medalha de prata', 500, '🥈'],
      ['Prêmio Inovação', 'Projeto mais inovador', 300, '🌟'],
      ['Melhor Design', 'Interface mais bem trabalhada', 300, '🎨'],
    ]
    awardData.forEach(function (ad) {
      var r = new Record(awardsCol)
      r.set('title', ad[0])
      r.set('description', ad[1])
      r.set('points', ad[2])
      r.set('icon', ad[3])
      app.save(r)
    })
  },
  (app) => {
    var names = ['awards', 'activities', 'events', 'tasks', 'projects', 'members', 'teams']
    for (var i = 0; i < names.length; i++) {
      try {
        var records = app.findRecordsByFilter(names[i], '', '', 1000, 0)
        for (var j = 0; j < records.length; j++) app.delete(records[j])
      } catch (_) {}
    }
  },
)
