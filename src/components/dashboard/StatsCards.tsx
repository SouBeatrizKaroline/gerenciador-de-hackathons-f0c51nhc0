import { Users, FolderKanban, CheckSquare, UserCircle } from 'lucide-react'
import type { Team } from '@/services/teams'
import type { Project } from '@/services/projects'
import type { Member } from '@/services/members'
import type { Task } from '@/services/tasks'

interface StatsCardsProps {
  teams: Team[]
  projects: Project[]
  members: Member[]
  tasks: Task[]
}

export function StatsCards({ teams, projects, members, tasks }: StatsCardsProps) {
  const completedTasks = tasks.filter((t) => t.status === 'concluida').length

  const stats = [
    { label: 'Equipes', value: teams.length, icon: Users, color: '#6e56cf' },
    { label: 'Projetos', value: projects.length, icon: FolderKanban, color: '#3b82f6' },
    { label: 'Membros', value: members.length, icon: UserCircle, color: '#10b981' },
    {
      label: 'Tarefas Concluídas',
      value: `${completedTasks}/${tasks.length}`,
      icon: CheckSquare,
      color: '#f5d565',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-[#16161a] border border-[#26262b] rounded-xl p-5 hover:border-[#383842] transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${stat.color}1a` }}
            >
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#f5f5f5]">{stat.value}</p>
          <p className="text-xs text-[#9b9ba3] mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
