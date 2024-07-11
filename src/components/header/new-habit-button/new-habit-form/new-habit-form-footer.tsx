import { Check, X } from 'lucide-react'
import { ForwardedRef, forwardRef } from 'react'

import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'

interface NewHabitFormFooterProps {
  isSubmitting: boolean
  submitDisabled: boolean
}

export const NewHabitFormFooter = forwardRef(
  (
    { isSubmitting, submitDisabled }: NewHabitFormFooterProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <DialogFooter className="w-full">
        <div className="flex w-full items-center justify-center gap-6">
          <DialogClose ref={ref} asChild>
            <Button
              type="button"
              disabled={isSubmitting}
              className="mt-6 flex items-center justify-center gap-2 bg-destructive hover:bg-destructive/60 disabled:cursor-not-allowed disabled:hover:bg-destructive"
            >
              <X className="h-5 w-5 text-destructive-foreground" />
              <span className="text-base font-semibold text-destructive-foreground">
                Cancelar
              </span>
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={isSubmitting || submitDisabled}
            className="mt-6 flex items-center justify-center gap-2 hover:bg-primary/60 disabled:cursor-not-allowed disabled:hover:bg-primary"
          >
            <Check className="h-5 w-5 text-primary-foreground" />
            <span className="text-base font-semibold text-primary-foreground">
              Enviar
            </span>
          </Button>
        </div>
      </DialogFooter>
    )
  },
)
