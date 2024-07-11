import { api } from '@/lib/axios'

export interface RegisterUserJwtProps {
  email?: string
  password?: string
}

// export type RegisterUserJwtResponse = {
//   email: string
// }

export async function RegisterUserJwt({
  email,
  password,
}: RegisterUserJwtProps) {
  const { data } = await api.post<undefined>('/users/register/jwt', {
    email,
    password,
  })
  alert(data)
  return data
}
