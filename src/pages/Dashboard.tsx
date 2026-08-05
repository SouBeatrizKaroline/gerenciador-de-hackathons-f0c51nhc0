import { useEffect, useState, useCallback } from 'react'
import { getTeams } from '@/services/teams'
import { getProjects } from '@/services/projects'
import { getTasks } from '@/services/tasks'
import { getEvents } from '@/services/events'
import { getActivities } from '@/services/activities'
import { getMembers } from '@/services/members'
import { useRealtime } from '@/hooks/use-realtime'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { DashboardCharts } from '@/components/dashboard/DashboardCharts'
import { UpcomingEvents } from '@/components/dashboard/UpcomingEvents'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import type { Team } from '@/services/teams'
import type { Project } from '@/services/projects'
import type { Task } from '@/services/tasks'
import type { HackathonEvent } from '@/services/events'
import type { Activity } from '@/services/activities'
import type { Member } from '@/services/members'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [teams, setTeams] = useState<Team[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [events, setEvents] = useState<HackathonEvent[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [members, setMembers] = useState<Member[]>([])

  const loadData = useCallback(async () => {
    try {
      const [t, p, ta, e, a, m] = await Promise.all([
        getTeams(),
        getProjects(),
        getTasks(),
        getEvents(),
        getActivities(),
        getMembers(),
      ])
      setTeams(t)
      setProjects(p)
      setTasks(ta)
      setEvents(e)
      setActivities(a)
      setMembers(m)
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  useRealtime('teams', () => loadData())
  useRealtime('projects', () => loadData())
  useRealtime('tasks', () => loadData())
  useRealtime('events', () => loadData())
  useRealtime('activities', () => loadData())
  useRealtime('members', () => loadData())

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="w-8 h-8 border-2 border-[#6e56cf] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-[#f5f5f5]">Dashboard</h1>
        <p className="text-sm text-[#9b9ba3] mt-1">Visão geral do hackathon em tempo real</p>
      </div>
      <StatsCards teams={teams} projects={projects} members={members} tasks={tasks} />
      <DashboardCharts tasks={tasks} projects={projects} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingEvents events={events} />
        <RecentActivity activities={activities} />
      </div>
    </div>
  )
}
