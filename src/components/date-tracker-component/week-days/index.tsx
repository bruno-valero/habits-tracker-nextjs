export function WeekDays() {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  return (
    <div className="grid grid-flow-row grid-rows-7 gap-3">
      {weekDays.map((item) => (
        <div className="flex h-10 w-10 items-center justify-center text-xl font-bold text-muted">
          {item}
        </div>
      ))}
    </div>
  )
}
