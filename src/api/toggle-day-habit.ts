import { api } from '@/lib/axios'

export interface ToggleDayHabitProps {
  date: Date
  habitId: string
}

// export type ToggleDayHabitResponse = {
//   days: {
//     id: string
//     date: Date
//     updatedAt: Date | null
//     totalDayHabits: number
//     completedDayHabits: number
//   }[]
// }

export async function toggleDayHabit({ date, habitId }: ToggleDayHabitProps) {
  const { data } = await api.patch<undefined>(`/toggle-day-habit`, undefined, {
    params: {
      date,
      habitId,
    },
  })

  return data
}
