import { api } from '@/lib/axios'

export interface FetchDaysWithCompletedNumberProps {
  from?: Date
  to?: Date
}

export type FetchDaysWithCompletedNumberResponse = {
  days: {
    id: string
    date: Date
    updatedAt: Date | null
    totalDayHabits: number
    completedDayHabits: number
  }[]
}

export async function fetchDaysWithCompletedNumber({
  from,
  to,
}: FetchDaysWithCompletedNumberProps) {
  const { data } = await api.get<
    FetchDaysWithCompletedNumberResponse | undefined
  >(`/days/completed-details`, {
    params: {
      from,
      to,
    },
  })

  return {
    ...data,
    days: data?.days.map((item) => {
      const date = new Date(item.date)

      return {
        ...item,
        date,
      }
    }),
  }
}
