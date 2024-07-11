import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export function YearDayPopoverSkeleton() {
  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <Skeleton className="h-3 w-20" />
          {/* <span className="text-sm font-semibold text-muted-foreground">
            {dayjs(data.day.date).locale(ptBR).format('dddd')}
          </span> */}
          <Skeleton className="h-6 w-36" />
          {/* <p className="text-center text-lg font-semibold">
            {dayjs(data.day.date).locale(ptBR).format('DD [de] MMMM [de] YYYY')}
          </p> */}
        </div>
        <Separator className="my-1" />
        <div className="mt-4">
          <Skeleton className="h-4 w-full" />
          {/* <Progress
            value={Math.floor(
              (data.day.completedDayHabits.length /
                (data.day.dayHabits.length || 1)) *
                100,
            )}
            className="h-2"
            progressBar={{
              className: progressBarColor,
            }}
          /> */}
        </div>
        <div className="mt-4 flex w-full flex-col items-start justify-start px-2">
          <ul className="flex list-none flex-col gap-4">
            {Array.from({ length: 4 }).map((habit, i) => (
              <li key={i} className="flex items-center justify-start gap-3">
                <Skeleton className="h-6 w-6" />
                {/* <button
                  onClick={() =>
                    date
                      ? handleToggleDayHabit({ date, habitId: habit.id })
                      : null
                  }
                  className={cn(
                    'flex h-6 w-6 items-center justify-center gap-4',
                  )}
                >
                  {data.day.completedDayHabits.some(
                    (dh) => dh.id === habit.id,
                  ) ? (
                    <div className="flex h-full w-full items-center justify-center gap-4 rounded bg-primary">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  ) : (
                    <div className="h-full w-full rounded border border-muted">
                      <X className="text-transparent" />
                    </div>
                  )}
                </button> */}
                <Skeleton
                  className="h-4"
                  style={{
                    width: (() => {
                      const number = Math.random() * 200
                      if (number < 50) return 50 + number
                      return number
                    })(),
                  }}
                />
                {/* <span
                  className={cn(
                    '',
                    data.day.completedDayHabits.some((dh) => dh.id === habit.id)
                      ? 'line-through'
                      : '',
                  )}
                >
                  {habit.title}
                </span> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
