import { useQuery } from '@tanstack/react-query'

import { findDayDetails } from '@/api/find-day-details'
import { getUser } from '@/api/get-user'
import { DaySquare, DaySquareProps } from '@/components/day-square'
import { DialogLogin } from '@/components/header/user-info/user-login-or-register/dialog-login'
import { QueryKeys } from '@/components/providers/query-client'
import { Dialog, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { YearDayPopover } from './year-day-popover'
import { YearDayPopoverSkeleton } from './year-day-popover-skeleton'

interface YearDayProps {
  date?: Date
  state?: DaySquareProps['state']
}

export function YearDay({ date, state }: YearDayProps) {
  const { data, refetch, isLoading } = useQuery({
    queryFn: () => (date ? findDayDetails({ date }) : undefined),
    queryKey: [QueryKeys.FIND_DAY_DETAILS, date?.toISOString()],
    enabled: false,
  })

  const { data: user } = useQuery({
    queryFn: getUser,
    queryKey: [QueryKeys.USER],
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button onClick={() => refetch()}>
          <DaySquare size={2.5} state={state ?? '0'} />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        {!isLoading && data?.day ? (
          <YearDayPopover
            key={data?.day.date.toISOString()}
            {...{ data, date, state }}
          />
        ) : (
          <>
            {user && <YearDayPopoverSkeleton />}
            {!user && (
              <Dialog>
                <div className="flex flex-col items-center justify-center gap-4">
                  <DialogTitle className="text-lg font-semibold">
                    Faça login para acessar os dados do dia
                  </DialogTitle>
                  <DialogTrigger asChild>
                    <button className="rounded bg-muted/50 px-6 py-4">
                      Fazer Login
                    </button>
                  </DialogTrigger>
                </div>
                <DialogLogin />
              </Dialog>
            )}
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
