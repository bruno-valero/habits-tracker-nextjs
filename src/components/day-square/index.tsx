import { cn } from '@/lib/utils'

export interface DaySquareProps {
  /**
   * Size in rem.
   *
   * Example 0.2rem
   * */
  size: number
  state: keyof ['0', '1', '2', '3', '4', '5']
}

export const colorMap = {
  0: { bg: 'bg-muted', border: 'border-muted' },
  1: { bg: 'bg-emerald-900', border: 'border-green-900' },
  2: { bg: 'bg-emerald-800', border: 'border-green-800' },
  3: { bg: 'bg-emerald-700', border: 'border-green-700' },
  4: { bg: 'bg-emerald-600', border: 'border-green-600' },
  5: { bg: 'bg-emerald-500', border: 'border-green-500' },
} as const

export type ColorMap = typeof colorMap
export type ColorMapKeys = keyof ColorMap

export function DaySquare({ size, state }: DaySquareProps) {
  const width = `${size}rem`
  const height = `${size}rem`

  //   eslint-disable-next-line
  //   @ts-ignore
  const bg = (colorMap[state] as ColorMap[ColorMapKeys]).bg
  //   eslint-disable-next-line
  //   @ts-ignore
  const border = (colorMap[state] as ColorMap[ColorMapKeys]).border

  return (
    <div
      className={cn(`rounded ${bg} border ${border}`)}
      style={{ minWidth: width, minHeight: height }}
    ></div>
  )
}
