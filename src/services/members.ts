import pb from '@/lib/pocketbase/client'

export interface Member {
  id: string
  name: string
  role: string
  team_id: string
  created: string
  updated: string
}

export const getMembers = () => pb.collection('members').getFullList<Member>({ sort: '-created' })
export const getMember = (id: string) => pb.collection('members').getOne<Member>(id)
export const createMember = (data: Partial<Member>) => pb.collection('members').create(data)
export const updateMember = (id: string, data: Partial<Member>) =>
  pb.collection('members').update(id, data)
export const deleteMember = (id: string) => pb.collection('members').delete(id)
