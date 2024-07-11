'use client'

import { useQuery } from '@tanstack/react-query'

import { getUser } from '@/api/get-user'
import { QueryKeys } from '@/components/providers/query-client'
import { DialogTrigger } from '@/components/ui/dialog'

import { DialogLogin } from './dialog-login'

export function UseLoginOrRegister() {
  const { data: user } = useQuery({
    queryFn: getUser,
    queryKey: [QueryKeys.USER],
  })

  return (
    <>
      {user?.user?.email ? (
        <DialogTrigger asChild>
          <button className="text-base text-muted-foreground">
            Hábitos de{' '}
            <span className="font-semibold text-primary">
              {user.user.email.split('@')[0].concat('@...')}
            </span>
          </button>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <button className="rounded bg-muted/50 px-6 py-4">Fazer Login</button>
        </DialogTrigger>
      )}
      <DialogLogin />
    </>
  )
}
