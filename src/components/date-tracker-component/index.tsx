import { WeekDays } from './week-days'
import { YearDays } from './year-days'

export function DateTrackerComponent() {
  return (
    <div className="flex w-full items-start justify-start gap-2">
      <WeekDays />
      <YearDays />
    </div>
  )
}
