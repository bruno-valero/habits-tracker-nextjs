'use client'

import { Plus } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

import { NewHabitForm } from './new-habit-form'

export function NewHabitButton() {
  return (
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
  )
}
