import pb from '@/lib/pocketbase/client'

export interface Award {
  id: string
  title: string
  description: string
  points: number
  icon: string
  created: string
  updated: string
}

export const getAwards = () => pb.collection('awards').getFullList<Award>({ sort: '-created' })
export const createAward = (data: Partial<Award>) => pb.collection('awards').create(data)
export const updateAward = (id: string, data: Partial<Award>) =>
  pb.collection('awards').update(id, data)
export const deleteAward = (id: string) => pb.collection('awards').delete(id)
