import { useMemo } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { Task } from '@/services/tasks'
import type { Project } from '@/services/projects'

interface DashboardChartsProps {
  tasks: Task[]
  projects: Project[]
}

export function DashboardCharts({ tasks, projects }: DashboardChartsProps) {
  const lineData = useMemo(() => {
    const labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
    const now = new Date()
    return labels.map((day, i) => {
      const date = new Date(now)
      date.setDate(date.getDate() - (6 - i))
      const count = tasks.filter((t) => {
        const td = new Date(t.created)
        return td.toDateString() === date.toDateString()
      }).length
      return { day, tarefas: count }
    })
  }, [tasks])

  const barData = [
    { status: 'Planej.', total: projects.filter((p) => p.status === 'planejamento').length },
    { status: 'Desenv.', total: projects.filter((p) => p.status === 'desenvolvimento').length },
    { status: 'Revisão', total: projects.filter((p) => p.status === 'revisao').length },
    { status: 'Concluído', total: projects.filter((p) => p.status === 'concluido').length },
  ]

  const donutData = [
    { name: 'Alta', value: tasks.filter((t) => t.priority === 'alta').length, fill: '#ef4444' },
    { name: 'Média', value: tasks.filter((t) => t.priority === 'media').length, fill: '#f5d565' },
    { name: 'Baixa', value: tasks.filter((t) => t.priority === 'baixa').length, fill: '#6e56cf' },
  ]

  const lineConfig = { tarefas: { label: 'Tarefas', color: '#6e56cf' } } satisfies ChartConfig
  const barConfig = { total: { label: 'Projetos', color: '#3b82f6' } } satisfies ChartConfig

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-[#16161a] border border-[#26262b] rounded-xl p-6">
        <h3 className="text-sm font-semibold text-[#f5f5f5] mb-4">Tarefas Criadas por Dia</h3>
        <ChartContainer config={lineConfig} className="h-[220px] w-full">
          <LineChart data={lineData} margin={{ left: -20, right: 10, top: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#26262b" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#9b9ba3"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9b9ba3"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="tarefas"
              stroke="#6e56cf"
              strokeWidth={2}
              isAnimationActive
              animationDuration={1000}
              dot={{ fill: '#6e56cf', r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </div>

      <div className="bg-[#16161a] border border-[#26262b] rounded-xl p-6">
        <h3 className="text-sm font-semibold text-[#f5f5f5] mb-4">Prioridade das Tarefas</h3>
        <ChartContainer config={{} as ChartConfig} className="h-[220px] w-full">
          <PieChart>
            <Pie
              data={donutData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={75}
              isAnimationActive
              animationDuration={1000}
            >
              {donutData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} stroke="#16161a" strokeWidth={2} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
          </PieChart>
        </ChartContainer>
        <div className="flex justify-center gap-4 mt-2">
          {donutData.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.fill }} />
              <span className="text-xs text-[#9b9ba3]">
                {d.name} ({d.value})
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-3 bg-[#16161a] border border-[#26262b] rounded-xl p-6">
        <h3 className="text-sm font-semibold text-[#f5f5f5] mb-4">Projetos por Status</h3>
        <ChartContainer config={barConfig} className="h-[200px] w-full">
          <BarChart data={barData} margin={{ left: -20, right: 10, top: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#26262b" vertical={false} />
            <XAxis
              dataKey="status"
              stroke="#9b9ba3"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9b9ba3"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="total"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
              isAnimationActive
              animationDuration={1000}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}
