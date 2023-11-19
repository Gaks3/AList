'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { LogOut } from 'react-feather'
import { twMerge } from 'tailwind-merge'

interface UserProps {
  user?: {
    name?: string | null | undefined
    image?: string | null | undefined
    email?: string | null | undefined
  }
}

const AvatarDropdown = ({ user }: UserProps) => {
  const [active, setActive] = useState(false)

  return (
    <div className="relative">
      <Image
        src={user?.image as string}
        alt={'Profile Image'}
        width={40}
        height={40}
        className="rounded-full cursor-pointer"
        onClick={() => setActive((curr) => !curr)}
      />
      <div
        className={twMerge(
          'right-0 mt-3 z-10 bg-card2 h-fit w-60 rounded absolute transition-all duration-100 ease-out p-4 text-sm flex flex-col gap-2 shadow-lg',
          active
            ? 'transform opacity-100 scale-100 absolute'
            : 'transform opacity-0 scale-95 hidden'
        )}
      >
        <div className="flex flex-row items-center gap-3">
          <Image
            src={user?.image as string}
            alt={'Profile Image'}
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
            onClick={() => setActive((curr) => !curr)}
          />
          <p className="truncate text-heading font-medium">{user?.name}</p>
        </div>
        <ul className="border-y border-card2 text-heading py-2">
          <li className="hover:bg-outline p-2 rounded-md">
            <Link href={'/dashboard'}>Dashboard</Link>
          </li>
          <li className="hover:bg-outline p-2 rounded-md">
            <Link
              href={'/api/auth/signout'}
              className="text-red-600 flex flex-row gap-2 items-center"
            >
              <LogOut size={15} />
              Sign Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AvatarDropdown
