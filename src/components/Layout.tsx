import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Trophy, LogOut, Menu, Code2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/premiacoes', label: 'Premiações', icon: Trophy },
]

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation()
  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = location.pathname === item.to
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
              isActive
                ? 'bg-[#6e56cf]/15 text-[#6e56cf] font-medium'
                : 'text-[#9b9ba3] hover:bg-[#1e1e24] hover:text-[#f5f5f5]',
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-5">
        <div className="w-8 h-8 rounded-lg bg-[#6e56cf] flex items-center justify-center">
          <Code2 className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-[#f5f5f5]">HackManager</span>
      </div>
      <div className="flex-1 px-3">
        <NavLinks onNavigate={onNavigate} />
      </div>
      <div className="px-3 py-4 border-t border-[#26262b]">
        <div className="flex items-center gap-2 mb-3 px-3">
          <div className="w-8 h-8 rounded-full bg-[#6e56cf]/20 flex items-center justify-center">
            <span className="text-xs font-bold text-[#6e56cf]">
              {user?.email?.[0]?.toUpperCase() ?? 'U'}
            </span>
          </div>
          <span className="text-xs text-[#9b9ba3] truncate flex-1">{user?.email}</span>
        </div>
        <Button
          variant="ghost"
          onClick={() => {
            signOut()
            navigate('/login')
          }}
          className="w-full justify-start text-[#9b9ba3] hover:text-[#f5f5f5] hover:bg-[#1e1e24] text-sm"
        >
          <LogOut className="w-4 h-4 mr-3" /> Sair
        </Button>
      </div>
    </div>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#0a0a0c]">
      <aside className="hidden lg:flex w-64 flex-shrink-0 border-r border-[#26262b] bg-[#0e0e11]">
        <SidebarContent />
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[#26262b] bg-[#0e0e11]">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#f5f5f5]">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-[#0e0e11] border-[#26262b] p-0">
              <SidebarContent onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#6e56cf] flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-[#f5f5f5]">HackManager</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
