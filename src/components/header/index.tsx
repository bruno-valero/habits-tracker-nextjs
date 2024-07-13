'use client'

import { Logo } from './logo'
import { NewHabitButton } from './new-habit-button'
import { UserInfo } from './user-info'

export function Header() {
  return (
    <div className="flex w-full items-center justify-around max-[550px]:flex-col max-[550px]:justify-start max-[550px]:gap-4">
      <Logo />

      <UserInfo />
      <NewHabitButton />
    </div>
  )
}
