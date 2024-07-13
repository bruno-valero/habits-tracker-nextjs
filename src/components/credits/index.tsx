import Link from 'next/link'

import { Card } from '../ui/card'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

export function Credits() {
  return (
    <ScrollArea>
      <Link href={'https://www.brunovalero.com.br'} target="_blank">
        <Card className="flex items-center justify-center gap-4 p-4">
          <img
            src="https://github.com/bruno-valero.png"
            alt="Bruno Fernandes Valero - Desenvolvedor"
            className="h-16 w-16 rounded-xl object-cover"
          />
          <div className="flex flex-col gap-0">
            <span className="text-lg font-semibold tracking-tight">
              Desenvolvedor
            </span>
            <span className="text-sm font-normal text-muted-foreground">
              Bruno Fernandes Valero
            </span>
          </div>
        </Card>
      </Link>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
