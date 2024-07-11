'use client'

import { Logo } from './logo'
import { NewHabitButton } from './new-habit-button'
import { UserInfo } from './user-info'

export function Header() {
  return (
    <div className="flex w-full items-center justify-around">
      <Logo />

      <UserInfo />
      <NewHabitButton />
    </div>
  )
}
