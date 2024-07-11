'use client'

import { Dialog } from '@/components/ui/dialog'

import { UseLoginOrRegister } from './user-login-or-register'

export function UserInfo() {
  return (
    <div>
      <Dialog>
        <UseLoginOrRegister />
      </Dialog>
    </div>
  )
}
