import { api } from '@/lib/axios'

export interface CompleteDayHabitProps {
  date?: Date
  habitId: string
}

export type CompleteDayHabitResponse = {
  user?: {
    email: string
  }
}

export async function completeDayHabit({
  date,
  habitId,
}: CompleteDayHabitProps) {
  const { data } = await api.patch<CompleteDayHabitResponse | undefined>(
    `/complete-day-habit`,
    undefined,
    {
      params: {
        date,
        habitId,
      },
    },
  )

  return data
}
