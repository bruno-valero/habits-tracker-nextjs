import { api } from '@/lib/axios'

export interface FindDayDetailsProps {
  date: Date
}

export type FindDayDetailsResponse = {
  day: {
    date: Date
    completedDayHabits: {
      id: string
      title: string
      weekDays: number[]
    }[]
    dayHabits: {
      id: string
      title: string
      weekDays: number[]
    }[]
  }
}

export async function findDayDetails({ date }: FindDayDetailsProps) {
  const { data } = await api.get<FindDayDetailsResponse | undefined>(
    `/days/${date.toISOString()}/details`,
  )

  console.log('findDayDetails', data)

  return data
    ? {
        ...data,
        day: {
          ...data.day,
          date: new Date(data.day.date),
        },
      }
    : undefined
}
