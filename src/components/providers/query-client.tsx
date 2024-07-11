'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

export const queryClient = new QueryClient()

interface QueryClientContextProviderProps {
  children: ReactNode
}

export function QueryClientContextProvider({
  children,
}: QueryClientContextProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export enum QueryKeys {
  'USER' = 'USER',
  'FETCH_DAYS' = 'FETCH_DAYS',
  'FIND_DAY_DETAILS' = 'FIND_DAY_DETAILS',
}
