import { Credits } from '@/components/credits'
import { DateTrackerComponent } from '@/components/date-tracker-component'
import { Header } from '@/components/header'

export default function Home() {
  return (
    <main className="flex h-full min-h-screen w-full min-w-[100vw] flex-col items-center justify-center bg-background">
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-16 px-16 max-[550px]:my-20 max-[550px]:max-w-[100vw] max-[550px]:px-3 max-[550px]:pr-5">
        <Header />
        <DateTrackerComponent />
        <Credits />
      </div>
    </main>
  )
}
