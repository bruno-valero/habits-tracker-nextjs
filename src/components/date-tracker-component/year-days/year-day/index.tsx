import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
// import { ptBR } from 'date-fns/locale'
import ptBR from 'dayjs/locale/pt-br'
import { Check, X } from 'lucide-react'
import { useCallback } from 'react'

import { FetchDaysWithCompletedNumberResponse } from '@/api/fetch-days-with-completed-number'
import { findDayDetails, FindDayDetailsResponse } from '@/api/find-day-details'
import { toggleDayHabit, ToggleDayHabitProps } from '@/api/toggle-day-habit'
import {
  ColorMap,
  colorMap,
  ColorMapKeys,
  DaySquare,
  DaySquareProps,
} from '@/components/day-square'
import { QueryKeys } from '@/components/providers/query-client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface YearDayProps {
  date?: Date
  state?: DaySquareProps['state']
}

export function YearDay({ date, state }: YearDayProps) {
  const queryClient = useQueryClient()

  const { data, refetch } = useQuery({
    queryFn: () => (date ? findDayDetails({ date }) : undefined),
    queryKey: [QueryKeys.FIND_DAY_DETAILS, date?.toISOString()],
    enabled: false,
  })

  const updateCurrentDetails = useCallback((habitId: string) => {
    const cachedDetails = queryClient.getQueryData<
      FindDayDetailsResponse | undefined
    >([QueryKeys.FIND_DAY_DETAILS, date?.toISOString()])

    let completedDayHabits = cachedDetails?.day.completedDayHabits

    if (completedDayHabits?.some((item) => item.id === habitId)) {
      completedDayHabits = completedDayHabits?.filter(
        (habit) => habit.id !== habitId,
      )
    } else {
      const newCompletedHabit = cachedDetails?.day.dayHabits.find(
        (item) => item.id === habitId,
      )

      completedDayHabits = newCompletedHabit
        ? [...(cachedDetails?.day.completedDayHabits ?? []), newCompletedHabit]
        : cachedDetails?.day.completedDayHabits
    }

    const newDetails: FindDayDetailsResponse | undefined = !cachedDetails
      ? undefined
      : {
          ...cachedDetails,
          day: {
            ...cachedDetails.day,
            completedDayHabits: completedDayHabits!,
          },
        }

    queryClient.setQueryData(
      [QueryKeys.FIND_DAY_DETAILS, date?.toISOString()],
      newDetails,
    )

    return newDetails
  }, [])

  const updateFetchedDays = useCallback(
    (date: Date, completedDayHabits: number | undefined) => {
      const daysCached = queryClient.getQueryData<
        FetchDaysWithCompletedNumberResponse | undefined
      >([QueryKeys.FETCH_DAYS])

      const days = daysCached?.days ?? []

      const currDayExists = days.some(
        (day) => day.date.toISOString() === date.toISOString(),
      )

      if (!currDayExists) {
        queryClient.refetchQueries({
          exact: true,
          queryKey: [QueryKeys.FETCH_DAYS],
        })

        return
      }

      const newDays = days.map((item) => {
        if (item.date.toISOString() === date.toISOString()) {
          type CurrDay = typeof item

          const newDay: CurrDay = {
            ...item,
            completedDayHabits: completedDayHabits ?? item.completedDayHabits,
          }

          return newDay
        }
        return item
      })

      const newCacheDays: FetchDaysWithCompletedNumberResponse | undefined = {
        ...daysCached,
        days: newDays,
      }

      queryClient.setQueryData<
        FetchDaysWithCompletedNumberResponse | undefined
      >([QueryKeys.FETCH_DAYS], newCacheDays)
    },
    [],
  )

  const { mutateAsync: toggleDayHabitMutation } = useMutation({
    mutationFn: toggleDayHabit,
    onSuccess(_, { date, habitId }) {
      const details = updateCurrentDetails(habitId)

      updateFetchedDays(date, details?.day.completedDayHabits.length)
    },
  })

  const handleToggleDayHabit = useCallback(
    async ({ date, habitId }: ToggleDayHabitProps) => {
      try {
        await toggleDayHabitMutation({ date, habitId })
      } catch (error) {
        console.log(error)
      }
    },
    [],
  )

  //   eslint-disable-next-line
                    //   @ts-ignore
  const progressBarColor = (colorMap[state ?? '0'] as ColorMap[ColorMapKeys]).bg

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button onClick={() => refetch()}>
          <DaySquare size={2.5} state={state ?? '0'} />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        {data?.day ? (
          <div className="w-full">
            <div className="w-full">
              <div className="flex w-full flex-col items-center justify-center gap-0">
                <span className="text-sm font-semibold text-muted-foreground">
                  {dayjs(data.day.date).locale(ptBR).format('dddd')}
                </span>
                <p className="text-center text-lg font-semibold">
                  {dayjs(data.day.date)
                    .locale(ptBR)
                    .format('DD [de] MMMM [de] YYYY')}
                </p>
              </div>
              <Separator className="my-1" />
              <div className="mt-4">
                <Progress
                  value={Math.floor(
                    (data.day.completedDayHabits.length /
                      (data.day.dayHabits.length || 1)) *
                      100,
                  )}
                  className="h-2"
                  progressBar={{
                    className: progressBarColor,
                  }}
                />
              </div>
              <div className="mt-4 flex w-full flex-col items-start justify-start px-2">
                <ul className="flex list-none flex-col gap-4">
                  {data.day.dayHabits.map((habit) => (
                    <li
                      key={habit.id}
                      className="flex items-center justify-start gap-3"
                    >
                      <button
                        onClick={() =>
                          date
                            ? handleToggleDayHabit({ date, habitId: habit.id })
                            : null
                        }
                        className={cn(
                          'flex h-6 w-6 items-center justify-center gap-4',
                        )}
                      >
                        {data.day.completedDayHabits.some(
                          (dh) => dh.id === habit.id,
                        ) ? (
                          <div className="flex h-full w-full items-center justify-center gap-4 rounded bg-primary">
                            <Check className="h-5 w-5 text-white" />
                          </div>
                        ) : (
                          <div className="h-full w-full rounded border border-muted">
                            <X className="text-transparent" />
                          </div>
                        )}
                      </button>
                      <span
                        className={cn(
                          '',
                          data.day.completedDayHabits.some(
                            (dh) => dh.id === habit.id,
                          )
                            ? 'line-through'
                            : '',
                        )}
                      >
                        {habit.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div>klk</div>
        )}
      </PopoverContent>
    </Popover>
  )
}
