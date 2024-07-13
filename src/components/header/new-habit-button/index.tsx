'use client'

import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

import { getUser } from '@/api/get-user'
import { QueryKeys } from '@/components/providers/query-client'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

import { DialogLogin } from '../user-info/user-login-or-register/dialog-login'
import { NewHabitForm } from './new-habit-form'

export function NewHabitButton() {
  const { data: user } = useQuery({
    queryFn: getUser,
    queryKey: [QueryKeys.USER],
  })

  return (
    <>
      {user && (
        <Dialog>
          <DialogTrigger asChild>
            <button className="group/create-new-habit flex items-center justify-center gap-3 rounded border border-primary p-3 px-4 hover:border-primary-foreground">
              <Plus className="text-primary group-hover/create-new-habit:text-primary-foreground" />
              <span className="text-lg font-semibold">Novo hábito</span>
            </button>
          </DialogTrigger>

          <DialogContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <DialogTitle className="text-center text-xl font-bold">
                Novo Hábito
              </DialogTitle>
              <Separator className="bg-muted/40" />
            </div>
            <NewHabitForm />
          </DialogContent>
        </Dialog>
      )}

      {!user && (
        <Popover>
          <PopoverTrigger asChild>
            <button className="group/create-new-habit flex items-center justify-center gap-3 rounded border border-primary p-3 px-4 hover:border-primary-foreground">
              <Plus className="text-primary group-hover/create-new-habit:text-primary-foreground" />
              <span className="text-lg font-semibold">Novo hábito</span>
            </button>
          </PopoverTrigger>

          <PopoverContent className="flex flex-col gap-6">
            <Dialog>
              <div className="flex flex-col items-center justify-center gap-4">
                <DialogTitle className="text-lg font-semibold">
                  Faça login para criar novos hábitos
                </DialogTitle>
                <DialogTrigger asChild>
                  <button className="rounded bg-muted/50 px-6 py-4">
                    Fazer Login
                  </button>
                </DialogTrigger>
              </div>
              <DialogLogin />
            </Dialog>
          </PopoverContent>
        </Popover>
      )}
    </>
  )
}
