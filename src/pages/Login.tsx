import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Code2, Mail, Lock } from 'lucide-react'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import { toast } from '@/components/ui/use-toast'

export default function Login() {
  const { signIn, signUp, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true })
  }, [isAuthenticated, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0c]">
        <div className="w-8 h-8 border-2 border-[#6e56cf] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (isAuthenticated) return null

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const { error } = await signIn(email, password)
    setSubmitting(false)
    if (error) {
      toast({
        title: 'Erro ao entrar',
        description: getErrorMessage(error),
        variant: 'destructive',
      })
    } else {
      navigate('/', { replace: true })
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const { error } = await signUp(email, password)
    setSubmitting(false)
    if (error) {
      toast({
        title: 'Erro ao cadastrar',
        description: getErrorMessage(error),
        variant: 'destructive',
      })
    } else {
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#6e56cf] flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[#f5f5f5]">HackManager</span>
        </div>
        <div className="bg-[#16161a] border border-[#26262b] rounded-2xl p-6">
          <Tabs defaultValue="signin">
            <TabsList className="grid grid-cols-2 w-full bg-[#0e0e11]">
              <TabsTrigger
                value="signin"
                className="data-[state=active]:bg-[#6e56cf] data-[state=active]:text-white text-xs"
              >
                Entrar
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-[#6e56cf] data-[state=active]:text-white text-xs"
              >
                Cadastrar
              </TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-3 pt-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9b9ba3]" />
                  <Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-[#0e0e11] border-[#26262b] text-[#f5f5f5]"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9b9ba3]" />
                  <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-[#0e0e11] border-[#26262b] text-[#f5f5f5]"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#6e56cf] hover:bg-[#7c66dc] text-white"
                >
                  {submitting ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-3 pt-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9b9ba3]" />
                  <Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-[#0e0e11] border-[#26262b] text-[#f5f5f5]"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9b9ba3]" />
                  <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-[#0e0e11] border-[#26262b] text-[#f5f5f5]"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#6e56cf] hover:bg-[#7c66dc] text-white"
                >
                  {submitting ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
        <p className="text-center text-xs text-[#9b9ba3] mt-4">Gerenciador de Hackathons</p>
      </div>
    </div>
  )
}
