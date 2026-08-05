import pb from '@/lib/pocketbase/client'

export interface Activity {
  id: string
  description: string
  type: 'equipe_criada' | 'projeto_criado' | 'tarefa_concluida' | 'membro_adicionado'
  created: string
  updated: string
}

export const getActivities = () =>
  pb.collection('activities').getFullList<Activity>({ sort: '-created' })
export const createActivity = (data: Partial<Activity>) => pb.collection('activities').create(data)
export const deleteActivity = (id: string) => pb.collection('activities').delete(id)
