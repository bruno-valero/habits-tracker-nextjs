'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createHabit } from '@/api/create-habit'
import { QueryKeys } from '@/components/providers/query-client'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { NewHabitFormFooter } from './new-habit-form-footer'

export function NewHabitForm() {
  const formSchema = z.object({
    habit: z.string().min(3, 'O hábito deve conter pelo menos 3 caracteres'),
    frequency: z.object({
      sunday: z.boolean().optional(),
      monday: z.boolean().optional(),
      tuesday: z.boolean().optional(),
      wednesday: z.boolean().optional(),
      thursday: z.boolean().optional(),
      friday: z.boolean().optional(),
      saturday: z.boolean().optional(),
    }),
  })

  type FormSchema = z.infer<typeof formSchema>

  type KeysOf<T> = T extends object ? keyof T : never

  type RecursiveKeys<T> = {
    [K in KeysOf<T>]: K extends string
      ? `${K}` | `${K}.${RecursiveKeys<T[K]>}`
      : never
  }[KeysOf<T>]

  type FormSchemaRegister = RecursiveKeys<FormSchema>

  const returnRegisterName = useCallback((name: FormSchemaRegister) => {
    return name
  }, [])

  const weekData = [
    {
      label: 'Domingo',
      value: 'sunday',
      name: returnRegisterName('frequency.sunday'),
    },
    {
      label: 'Segunda-Feira',
      value: 'monday',
      name: returnRegisterName('frequency.monday'),
    },
    {
      label: 'Terça-Feira',
      value: 'tuesday',
      name: returnRegisterName('frequency.tuesday'),
    },
    {
      label: 'Quarta-Feira',
      value: 'wednesday',
      name: returnRegisterName('frequency.wednesday'),
    },
    {
      label: 'Quinta-Feira',
      value: 'thursday',
      name: returnRegisterName('frequency.thursday'),
    },
    {
      label: 'Sexta-Feira',
      value: 'friday',
      name: returnRegisterName('frequency.friday'),
    },
    {
      label: 'Sábado',
      value: 'saturday',
      name: returnRegisterName('frequency.saturday'),
    },
  ] as const

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const queryClient = useQueryClient()

  const { mutateAsync: createHabitMutation } = useMutation({
    mutationFn: createHabit,
    async onSuccess() {
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.FIND_DAY_DETAILS],
      })
      console.log('fetch', QueryKeys.FIND_DAY_DETAILS)
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.FETCH_DAYS],
      })
      console.log('fetch', QueryKeys.FETCH_DAYS)
    },
  })

  const closeRef = useRef<HTMLButtonElement>(null)

  const handleCreateNewHabit = useCallback(async (data: FormSchema) => {
    try {
      const title = data.habit
      const weekDaysArray = Object.entries(data.frequency)
        .filter(([, value]) => value)
        .map(([key]) => key as keyof typeof data.frequency)
      const weekDaysMap = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
      }
      const weekDays = weekDaysArray.map((item) => weekDaysMap[item])

      if (weekDays.length === 0) {
        setError('root', {
          message: 'Pelo menos um dia da semana deve ser selecionado',
        })
        return
      }

      await createHabitMutation({ title, weekDays })
      toast.success(`Hábito "${data.habit}" criado com sucesso.`)
      closeRef.current?.click()
    } catch (error) {
      toast.error(`Não foi possível criar o Hábito. Tente novamente`)
    }
  }, [])

  return (
    <form
      onSubmit={handleSubmit(handleCreateNewHabit)}
      className="flex w-full flex-col items-start justify-center gap-4"
    >
      <div className="flex w-full flex-col gap-2">
        <Label htmlFor="habit">Qual é seu novo hábito?</Label>
        <Input
          type="text"
          id="habit"
          placeholder="Seu novo comprometimento"
          className="w-full"
          {...register('habit')}
        />
        {errors.habit && (
          <span className="text-sm font-semibold text-destructive">
            {errors.habit.message}
          </span>
        )}
      </div>

      <div className="flex w-full flex-col gap-4">
        <Label>Qual a recorrência?</Label>
        {errors.root && (
          <span className="text-sm font-semibold text-destructive">
            {errors.root.message}
          </span>
        )}
        <div className="flex flex-col items-start justify-center">
          {weekData.map((item, i) => (
            <Controller
              key={`${item.name}-${i}`}
              control={control}
              name={item.name}
              render={({ field: { onChange } }) => {
                return (
                  <>
                    <div className="flex items-center justify-start gap-4">
                      <Checkbox
                        id={item.name}
                        onCheckedChange={(data) =>
                          onChange(!(!data || data === 'indeterminate'))
                        }
                        className="h-6 w-6 border-muted data-[state=checked]:border-none"
                      />
                      <Label
                        htmlFor={item.name}
                        className="text-md font-normal text-muted-foreground"
                      >
                        {item.label}
                      </Label>
                    </div>
                    {i < weekData.length - 1 && (
                      <Separator className="my-2 bg-muted/50" />
                    )}
                  </>
                )
              }}
            />
          ))}
        </div>
        <DialogClose ref={closeRef} className="hidden" />
        <NewHabitFormFooter
          {...{ isSubmitting }}
          submitDisabled={!!errors.root || !!errors.habit}
        />
      </div>
    </form>
  )
}
