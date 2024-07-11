'use client'

import { useQuery } from '@tanstack/react-query'
import { eachDayOfInterval } from 'date-fns'
import dayjs from 'dayjs'
import { useCallback, useEffect, useMemo, useRef } from 'react'

import {
  fetchDaysWithCompletedNumber,
  FetchDaysWithCompletedNumberResponse,
} from '@/api/fetch-days-with-completed-number'
import { DaySquareProps } from '@/components/day-square'
import { QueryKeys } from '@/components/providers/query-client'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { YearDay } from './year-day'

export function YearDays() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const dateRange = useMemo(() => {
    const startOfYear = dayjs().startOf('year')
    const firstDay = startOfYear.subtract(startOfYear.day(), 'day').toDate()
    const today = dayjs().startOf('day').toDate()

    const minDayDifference = 18 * 7 // 18 semanas
    const dayDifference = dayjs(today).diff(firstDay, 'day')

    const todayMinusMinDiff = dayjs(today).subtract(minDayDifference, 'day')
    const minDateFirstDay = todayMinusMinDiff
      .subtract(todayMinusMinDiff.day(), 'day')
      .toDate()

    const isMoreThanMinDayDifference = dayDifference > minDayDifference

    const startDay = isMoreThanMinDayDifference ? firstDay : minDateFirstDay

    return {
      from: startDay,
      to: today,
    }
  }, [])

  const { data: daysResponse } = useQuery({
    queryFn: () =>
      fetchDaysWithCompletedNumber({
        from: dateRange.from,
        to: dateRange.to,
      }),
    queryKey: [QueryKeys.FETCH_DAYS],
  })

  useEffect(() => {
    console.log('daysResponse', daysResponse?.days)
  }, [daysResponse])

  const yearDays = useMemo(() => {
    const interval = eachDayOfInterval({
      start: dateRange.from,
      end: dateRange.to,
    }).map((item) => {
      const getStartOfDay = (date: Date) => dayjs(date).startOf('day').toDate()

      const dayStart = getStartOfDay(item)

      const currDay = daysResponse?.days?.find((day) => {
        return getStartOfDay(day.date).toISOString() === dayStart.toISOString()
      })

      if (!currDay)
        return {
          id: '',
          date: dayStart,
          updatedAt: null,
          totalDayHabits: 0,
          completedDayHabits: 0,
        }

      return currDay
    })
    return interval
  }, [dateRange, daysResponse])

  useEffect(() => {
    const time = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef?.current?.scroll({
          left: scrollRef?.current?.scrollWidth,
          behavior: 'smooth',
        })
      }
    }, 50)

    return () => clearTimeout(time)
  }, [])

  const handleYearDayState = useCallback(
    (data: FetchDaysWithCompletedNumberResponse['days'][number]) => {
      const completedDayHabits = data.completedDayHabits
      const totalDayHabits = data.totalDayHabits

      const numberState = Math.round(
        (completedDayHabits / (totalDayHabits || 1)) * 5,
      )

      const state = String(numberState) as DaySquareProps['state']

      return state
    },
    [],
  )

  return (
    <ScrollArea ref={scrollRef} className="w-full overflow-x-auto pb-4">
      <div className="grid grid-flow-col grid-rows-7 gap-3">
        {yearDays.map((item) => (
          <YearDay
            key={item.date.toISOString()}
            date={item.date}
            state={handleYearDayState(item)}
          />
        ))}
      </div>
      <ScrollBar
        orientation="horizontal"
        scrollAreaThumb={{ className: 'bg-muted' }}
      />
    </ScrollArea>
  )
}
