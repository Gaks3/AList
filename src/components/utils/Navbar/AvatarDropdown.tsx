'use client'

import Image from 'next/image'
import Link from 'next/link'
import { EventHandler, useState } from 'react'
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
    <div
      className='relative avatarDropdown'
      tabIndex={-1}
      onBlur={(event) => {
        if (
          !event.relatedTarget ||
          !event.relatedTarget.classList.contains('avatarDropdown')
        ) {
          setActive(false)
        }
      }}
    >
      <Image
        src={user?.image as string}
        alt={'Profile Image'}
        width={40}
        height={40}
        className='rounded-full cursor-pointer'
        onClick={() => {
          setActive((curr) => !curr)
        }}
      />
      <div
        className={twMerge(
          'next right-0 mt-3 z-10 bg-card2 h-fit w-60 rounded transition-all duration-100 ease-out p-4 text-sm flex flex-row gap-4 shadow-lg avatarDropdown',
          active
            ? 'transform opacity-100 scale-100 absolute'
            : 'transform opacity-0 scale-95 hidden'
        )}
      >
        <div className='avatarDropdown'>
          <div className='flex flex-row items-center gap-3 avatarDropdown'>
            <Image
              src={user?.image as string}
              alt={'Profile Image'}
              width={40}
              height={40}
              className='rounded-full cursor-pointer avatarDropdown'
              onClick={() => setActive((curr) => !curr)}
            />
            <p className='truncate text-heading font-medium avatarDropdown'>
              {user?.name}
            </p>
          </div>
          <div className='flex flex-col gap-1 py-3 avatarDropdown'>
            <Link
              href={'/dashboard'}
              className='w-full hover:bg-outline p-2 rounded-md text-heading avatarDropdown'
              onClick={() => setActive(false)}
            >
              Dashboard
            </Link>
            <Link
              href={'/api/auth/signout'}
              className='text-red-600 flex flex-row gap-2 items-center w-full hover:bg-outline p-2 rounded-md avatarDropdown'
              onClick={() => setActive(false)}
            >
              <LogOut size={15} />
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvatarDropdown
