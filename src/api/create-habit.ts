import { api } from '@/lib/axios'

export interface CreateHabitProps {
  title: string
  weekDays: number[]
}

// export type CreateHabitResponse = {
//   days: {
//     id: string
//     date: Date
//     updatedAt: Date | null
//     totalDayHabits: number
//     completedDayHabits: number
//   }[]
// }

export async function createHabit({ title, weekDays }: CreateHabitProps) {
  const { data } = await api.post<undefined>(`/habits`, {
    title,
    weekDays,
  })

  return data
}
