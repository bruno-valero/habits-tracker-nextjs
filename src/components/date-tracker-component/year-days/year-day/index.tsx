import { useQuery } from '@tanstack/react-query'

// import { ptBR } from 'date-fns/locale'
import { findDayDetails } from '@/api/find-day-details'
import { DaySquare, DaySquareProps } from '@/components/day-square'
import { QueryKeys } from '@/components/providers/query-client'
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
          <YearDayPopoverSkeleton />
        )}
      </PopoverContent>
    </Popover>
  )
}
