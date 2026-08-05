import pb from '@/lib/pocketbase/client'

export interface Team {
  id: string
  name: string
  description: string
  color: string
  created: string
  updated: string
}

export const getTeams = () => pb.collection('teams').getFullList<Team>({ sort: '-created' })
export const getTeam = (id: string) => pb.collection('teams').getOne<Team>(id)
export const createTeam = (data: Partial<Team>) => pb.collection('teams').create(data)
export const updateTeam = (id: string, data: Partial<Team>) =>
  pb.collection('teams').update(id, data)
export const deleteTeam = (id: string) => pb.collection('teams').delete(id)
