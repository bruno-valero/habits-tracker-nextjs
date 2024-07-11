import { DaySquare } from '@/components/day-square'

export function Logo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1">
        <DaySquare size={0.9} state={'0'} />
        <DaySquare size={0.9} state={'1'} />
        <DaySquare size={0.9} state={'2'} />
        <DaySquare size={0.9} state={'3'} />
        <DaySquare size={0.9} state={'4'} />
        <DaySquare size={0.9} state={'5'} />
      </div>
      <div>
        <h1 className="text-5xl font-bold">habits</h1>
      </div>
    </div>
  )
}
