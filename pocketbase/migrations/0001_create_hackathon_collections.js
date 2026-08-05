migrate(
  (app) => {
    const teams = new Collection({
      name: 'teams',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'name', type: 'text', required: true, min: 1, max: 100 },
        { name: 'description', type: 'text', max: 500 },
        { name: 'color', type: 'text', max: 7 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_teams_created ON teams (created DESC)'],
    })
    app.save(teams)
    const teamsId = app.findCollectionByNameOrId('teams').id

    const members = new Collection({
      name: 'members',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'name', type: 'text', required: true, min: 1, max: 100 },
        { name: 'role', type: 'text', max: 50 },
        {
          name: 'team_id',
          type: 'relation',
          collectionId: teamsId,
          maxSelect: 1,
          cascadeDelete: false,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_members_team ON members (team_id)',
        'CREATE INDEX idx_members_created ON members (created DESC)',
      ],
    })
    app.save(members)

    const projects = new Collection({
      name: 'projects',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'title', type: 'text', required: true, min: 1, max: 200 },
        { name: 'description', type: 'text', max: 1000 },
        {
          name: 'team_id',
          type: 'relation',
          collectionId: teamsId,
          maxSelect: 1,
          cascadeDelete: true,
        },
        {
          name: 'status',
          type: 'select',
          values: ['planejamento', 'desenvolvimento', 'revisao', 'concluido'],
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_projects_team ON projects (team_id)',
        'CREATE INDEX idx_projects_status ON projects (status)',
        'CREATE INDEX idx_projects_created ON projects (created DESC)',
      ],
    })
    app.save(projects)
    const projectsId = app.findCollectionByNameOrId('projects').id

    const tasks = new Collection({
      name: 'tasks',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'title', type: 'text', required: true, min: 1, max: 200 },
        { name: 'description', type: 'text', max: 1000 },
        {
          name: 'project_id',
          type: 'relation',
          collectionId: projectsId,
          maxSelect: 1,
          cascadeDelete: true,
        },
        {
          name: 'status',
          type: 'select',
          values: ['a_fazer', 'em_andamento', 'concluida'],
          maxSelect: 1,
        },
        { name: 'priority', type: 'select', values: ['baixa', 'media', 'alta'], maxSelect: 1 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_tasks_project ON tasks (project_id)',
        'CREATE INDEX idx_tasks_status ON tasks (status)',
        'CREATE INDEX idx_tasks_priority ON tasks (priority)',
        'CREATE INDEX idx_tasks_created ON tasks (created DESC)',
      ],
    })
    app.save(tasks)

    const events = new Collection({
      name: 'events',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'title', type: 'text', required: true, min: 1, max: 200 },
        { name: 'description', type: 'text', max: 1000 },
        { name: 'date', type: 'date' },
        { name: 'location', type: 'text', max: 200 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_events_date ON events (date)'],
    })
    app.save(events)

    const activities = new Collection({
      name: 'activities',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'description', type: 'text', required: true, min: 1, max: 500 },
        {
          name: 'type',
          type: 'select',
          values: ['equipe_criada', 'projeto_criado', 'tarefa_concluida', 'membro_adicionado'],
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_activities_created ON activities (created DESC)'],
    })
    app.save(activities)

    const awards = new Collection({
      name: 'awards',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'title', type: 'text', required: true, min: 1, max: 100 },
        { name: 'description', type: 'text', max: 500 },
        { name: 'points', type: 'number', min: 0 },
        { name: 'icon', type: 'text', max: 10 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_awards_created ON awards (created DESC)'],
    })
    app.save(awards)
  },
  (app) => {
    const names = ['awards', 'activities', 'events', 'tasks', 'projects', 'members', 'teams']
    for (const name of names) {
      try {
        app.delete(app.findCollectionByNameOrId(name))
      } catch (_) {}
    }
  },
)
