import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { authUserJwt, AuthUserJwtProps } from '@/api/auth-user-jwt'
import { getUser, GetUserResponse } from '@/api/get-user'
import { RegisterUserJwt, RegisterUserJwtProps } from '@/api/register-user'
import { QueryKeys } from '@/components/providers/query-client'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function DialogLogin() {
  const dialogCloseRef = useRef<HTMLButtonElement>(null)

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'a senha dve oconter no mpinimo 6 caracteres'),
  })

  type FormSchema = z.infer<typeof formSchema>

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const [isRegistered, setIsRegistered] = useState(true)

  const queryClient = useQueryClient()

  const { data: user, error } = useQuery({
    queryFn: getUser,
    queryKey: [QueryKeys.USER],
  })

  useEffect(() => {
    console.log('user', user)
    console.log('error', error)
  }, [user])

  const refetchUserData = useCallback((email: string) => {
    const userCached = queryClient.getQueryData<GetUserResponse>([
      QueryKeys.USER,
    ])

    queryClient.setQueryData<GetUserResponse>([QueryKeys.USER], {
      ...(userCached ?? {}),
      user: {
        ...(userCached ?? {}).user,
        email,
      },
    })
  }, [])

  const { mutateAsync: registerMutation } = useMutation({
    mutationFn: RegisterUserJwt,
    async onSuccess(_, variables) {
      if (variables.email) {
        await authUserJwt(variables)

        refetchUserData(variables.email)
      }
    },
  })

  const { mutateAsync: authUserMutation } = useMutation({
    mutationFn: authUserJwt,
    async onSuccess(_, variables) {
      if (variables.email) {
        refetchUserData(variables.email)
      }
    },
  })

  const handleLogin = useCallback(
    async ({ email, password }: AuthUserJwtProps) => {
      try {
        await authUserMutation({ email, password })
        queryClient.refetchQueries({
          exact: true,
          queryKey: [QueryKeys.FETCH_DAYS],
        })

        dialogCloseRef.current?.click()
      } catch (error) {
      } finally {
        reset()
      }
    },
    [],
  )

  const handleRegister = useCallback(
    async ({ email, password }: RegisterUserJwtProps) => {
      try {
        await registerMutation({ email, password })
        dialogCloseRef.current?.click()
      } catch (error) {
      } finally {
        reset()
      }
    },
    [],
  )

  return (
    <DialogContent className="max-[550px]:w-full max-[550px]:max-w-[90%]">
      <form
        className="flex w-full flex-col gap-8"
        onSubmit={handleSubmit(isRegistered ? handleLogin : handleRegister)}
      >
        <DialogTitle asChild className="flex items-center justify-center">
          <h2 className="text-2xl font-bold">
            {isRegistered ? 'Login' : 'Cadastro'}
          </h2>
        </DialogTitle>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              {...register('email')}
            />
            {errors.email && (
              <span className="text-sm font-semibold text-destructive">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="senha com mais de 6 caracteres"
              {...register('password')}
            />
            {errors.password && (
              <span className="text-sm font-semibold text-destructive">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <DialogFooter>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <DialogClose ref={dialogCloseRef} className="hidden" />
            <Button disabled={isSubmitting} type="submit" className="w-full">
              {!isRegistered ? 'Cadastrar' : 'Entrar'}
            </Button>

            {isRegistered && (
              <div className="mt-2 text-sm">
                Ainda não é cadastrado?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegistered(false)}
                  className="font-semibold text-primary"
                >
                  Cadastre-se aqui
                </button>
              </div>
            )}
            {!isRegistered && (
              <div className="mt-2 text-sm">
                Já possui cadastro?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegistered(true)}
                  className="font-semibold text-primary"
                >
                  Faça login
                </button>
              </div>
            )}
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
