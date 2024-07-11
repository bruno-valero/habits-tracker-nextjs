import { api } from '@/lib/axios'

export interface AuthUserJwtProps {
  email?: string
  password?: string
}

// export type AuthUserJwtResponse = {
//   email: string
// }

export async function authUserJwt({ email, password }: AuthUserJwtProps) {
  const { data } = await api.post<undefined>('/users/authenticate/jwt', {
    email,
    password,
  })
  return data
}
