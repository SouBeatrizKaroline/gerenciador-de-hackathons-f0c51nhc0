import pb from '@/lib/pocketbase/client'

export interface HackathonEvent {
  id: string
  title: string
  description: string
  date: string
  location: string
  created: string
  updated: string
}

export const getEvents = () => pb.collection('events').getFullList<HackathonEvent>({ sort: 'date' })
export const getEvent = (id: string) => pb.collection('events').getOne<HackathonEvent>(id)
export const createEvent = (data: Partial<HackathonEvent>) => pb.collection('events').create(data)
export const updateEvent = (id: string, data: Partial<HackathonEvent>) =>
  pb.collection('events').update(id, data)
export const deleteEvent = (id: string) => pb.collection('events').delete(id)
