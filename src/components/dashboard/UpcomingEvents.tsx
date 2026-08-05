import { format, parseISO, isAfter } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, MapPin } from 'lucide-react'
import type { HackathonEvent } from '@/services/events'

interface UpcomingEventsProps {
  events: HackathonEvent[]
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  const now = new Date()
  const upcoming = events
    .filter((e) => e.date && isAfter(new Date(e.date), now))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  return (
    <div className="bg-[#16161a] border border-[#26262b] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-[#6e56cf]" />
        <h3 className="text-sm font-semibold text-[#f5f5f5]">Próximos Eventos</h3>
      </div>
      {upcoming.length === 0 ? (
        <p className="text-xs text-[#9b9ba3] py-8 text-center">Nenhum evento programado</p>
      ) : (
        <div className="space-y-3">
          {upcoming.map((event) => {
            const date = parseISO(event.date)
            return (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-[#0e0e11] border border-[#26262b] hover:border-[#383842] transition-all"
              >
                <div className="flex-shrink-0 w-12 text-center">
                  <p className="text-lg font-bold text-[#6e56cf]">{format(date, 'dd')}</p>
                  <p className="text-xs text-[#9b9ba3] uppercase">
                    {format(date, 'MMM', { locale: ptBR })}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#f5f5f5] truncate">{event.title}</p>
                  {event.location && (
                    <p className="text-xs text-[#9b9ba3] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {event.location}
                    </p>
                  )}
                  <p className="text-xs text-[#9b9ba3] mt-0.5">
                    {format(date, 'HH:mm', { locale: ptBR })}h
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
