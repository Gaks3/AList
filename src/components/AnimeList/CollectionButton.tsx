'use client'

import { useState } from 'react'
import { Bookmark } from 'react-feather'
import { twMerge } from 'tailwind-merge'

const CollectionButton = ({
  mal_id,
  email,
  already,
  title,
  image,
}: {
  mal_id: string
  email?: string | null
  already?: number | null
  title: string
  image: string
}) => {
  const [isCreated, setIsCreated] = useState(false)

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault()

    const data = { mal_id, email, title, image }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MY_URL}/api/v1/collection`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    )

    const collection = await res.json()

    if (collection.status == 200) {
      setIsCreated(collection.isCreated)
    }
  }

  return (
    <button
      className='flex flex-row items-center bg-button outline outline-1 outline-outButton px-2 rounded-md text-sm shadow-md shadow-black hover:bg-outButton'
      onClick={handleClick}
    >
      <Bookmark
        size={18}
        className={twMerge(already || isCreated ? 'fill-white' : '')}
      />
      {/* <p>Add To Collection</p> */}
    </button>
  )
}

export default CollectionButton
