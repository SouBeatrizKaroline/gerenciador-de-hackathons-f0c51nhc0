import { useEffect, useState } from 'react'
import { getAwards, createAward, Award } from '@/services/awards'
import { Trophy, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function Premiacoes() {
  const [awards, setAwards] = useState<Award[]>([])
  const [open, setDialogOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [points, setPoints] = useState(100)

  useEffect(() => {
    getAwards().then(setAwards)
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return
    await createAward({ title, description, points, icon: '🏆' })
    getAwards().then(setAwards)
    setDialogOpen(false)
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#9b9ba3]">Catálogo oficial de prêmios do hackathon</p>
        <Dialog open={open} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#6e56cf] hover:bg-[#7c66dc] text-white text-xs gap-1.5">
              <Plus className="w-4 h-4" /> Novo Prêmio
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#16161a] border-[#26262b] text-[#f5f5f5]">
            <DialogHeader>
              <DialogTitle>Cadastrar Prêmio</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-3 pt-2">
              <Input
                placeholder="Título do Prêmio"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="bg-[#0e0e11] border-[#26262b]"
              />
              <Input
                placeholder="Descrição e Recompensas"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-[#0e0e11] border-[#26262b]"
              />
              <Input
                type="number"
                placeholder="Pontuação Exigida"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="bg-[#0e0e11] border-[#26262b]"
              />
              <Button type="submit" className="w-full bg-[#6e56cf]">
                Salvar
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {awards.map((a) => (
          <div
            key={a.id}
            className="bg-[#16161a] border border-[#26262b] rounded-xl p-6 text-center space-y-3 hover:border-[#383842] transition-all"
          >
            <span className="text-4xl block">{a.icon || '🏆'}</span>
            <h3 className="text-base font-bold text-[#f5f5f5]">{a.title}</h3>
            <p className="text-xs text-[#9b9ba3]">{a.description}</p>
            <span className="inline-block text-xs font-bold text-[#f5d565] bg-[#f5d565]/10 px-3 py-1 rounded-full border border-[#f5d565]/30">
              {a.points} Pontos
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
