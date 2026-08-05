import pb from '@/lib/pocketbase/client'

export interface Task {
  id: string
  title: string
  description: string
  project_id: string
  status: 'a_fazer' | 'em_andamento' | 'concluida'
  priority: 'baixa' | 'media' | 'alta'
  created: string
  updated: string
}

export const getTasks = () => pb.collection('tasks').getFullList<Task>({ sort: '-created' })
export const getTask = (id: string) => pb.collection('tasks').getOne<Task>(id)
export const createTask = (data: Partial<Task>) => pb.collection('tasks').create(data)
export const updateTask = (id: string, data: Partial<Task>) =>
  pb.collection('tasks').update(id, data)
export const deleteTask = (id: string) => pb.collection('tasks').delete(id)
