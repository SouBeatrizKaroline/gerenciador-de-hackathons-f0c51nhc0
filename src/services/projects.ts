import pb from '@/lib/pocketbase/client'

export interface Project {
  id: string
  title: string
  description: string
  team_id: string
  status: 'planejamento' | 'desenvolvimento' | 'revisao' | 'concluido'
  created: string
  updated: string
}

export const getProjects = () =>
  pb.collection('projects').getFullList<Project>({ sort: '-created' })
export const getProject = (id: string) => pb.collection('projects').getOne<Project>(id)
export const createProject = (data: Partial<Project>) => pb.collection('projects').create(data)
export const updateProject = (id: string, data: Partial<Project>) =>
  pb.collection('projects').update(id, data)
export const deleteProject = (id: string) => pb.collection('projects').delete(id)
