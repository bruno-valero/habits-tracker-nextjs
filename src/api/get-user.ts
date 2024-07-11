import { api } from '@/lib/axios'

// export interface GetUserProps {
//   from?: Date
//   to?: Date
// }

export type GetUserResponse = {
  user?: {
    email: string
  }
}

export async function getUser() {
  const { data } = await api.get<GetUserResponse | undefined>('/users')
  console.log('user data', data)
  return data
}
