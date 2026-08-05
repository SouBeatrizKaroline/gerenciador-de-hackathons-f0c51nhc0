import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Users, FolderKanban, CheckSquare, UserPlus, Activity as ActivityIcon } from 'lucide-react'
import type { Activity } from '@/services/activities'

const typeConfig: Record<string, { icon: typeof Users; color: string }> = {
  equipe_criada: { icon: Users, color: '#6e56cf' },
  projeto_criado: { icon: FolderKanban, color: '#3b82f6' },
  tarefa_concluida: { icon: CheckSquare, color: '#10b981' },
  membro_adicionado: { icon: UserPlus, color: '#f5d565' },
}

interface RecentActivityProps {
  activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const recent = activities.slice(0, 8)

  return (
    <div className="bg-[#16161a] border border-[#26262b] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <ActivityIcon className="w-4 h-4 text-[#6e56cf]" />
        <h3 className="text-sm font-semibold text-[#f5f5f5]">Atividade Recente</h3>
      </div>
      {recent.length === 0 ? (
        <p className="text-xs text-[#9b9ba3] py-8 text-center">Nenhuma atividade registrada</p>
      ) : (
        <div className="space-y-1">
          {recent.map((activity, i) => {
            const config = typeConfig[activity.type] ?? typeConfig.equipe_criada
            const Icon = config.icon
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#0e0e11] transition-all"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${config.color}1a` }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
                  </div>
                  {i < recent.length - 1 && <div className="w-px h-6 bg-[#26262b] mt-1" />}
                </div>
                <div className="flex-1 min-w-0 pb-2">
                  <p className="text-sm text-[#f5f5f5]">{activity.description}</p>
                  <p className="text-xs text-[#9b9ba3] mt-0.5">
                    {formatDistanceToNow(new Date(activity.created), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
