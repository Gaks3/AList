'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Star } from 'react-feather'
import { twMerge } from 'tailwind-merge'

const CommentInput = ({
  cookie,
  mal_id,
  username,
  email,
  avatar,
  anime_title,
  text,
}: {
  cookie: string
  mal_id: string
  username: string
  email: string
  avatar: string
  anime_title: string
  text: string
}) => {
  const [comment, setComment] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [rating, setRating] = useState<number | null>(null)
  const router = useRouter()

  const handleChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value)
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const data: {
      mal_id: string
      username: string
      email: string
      avatar: string
      text: string
      anime_title: string
      rating?: number
    } = {
      mal_id,
      username,
      email,
      avatar,
      text,
      anime_title,
    }

    if (rating) data.rating = rating

    setLoading(true)

    const res = await fetch(
      `
    
    ${process.env.NEXT_PUBLIC_MY_URL}/api/v1/comment
    `,
      {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          Cookie: cookie,
        },
      }
    )

    if (res.status === 200) {
      router.refresh()
      setComment('')
      setRating(0)
    }

    setLoading(false)
  }

  return (
    <div className='w-full mt-3 mb-5'>
      <div className='w-full h-36 relative'>
        <textarea
          className='bg-neutral-800 rounded-md w-full h-36 outline-none border-none focus:outline-offset-1 focus:outline-outButton p-2 text-white'
          onChange={handleChangeInput}
          value={comment}
          placeholder='Comment here....'
        ></textarea>
        <div className='absolute bottom-2 left-2 flex flex-row gap-2'>
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1

            return (
              <label key={index}>
                <input
                  type='radio'
                  value={currentRating}
                  onClick={() => setRating(currentRating)}
                  className='hidden'
                />
                <Star
                  size={20}
                  className='text-[#FDCE15] cursor-pointer'
                  fill={
                    currentRating <= (rating as number)
                      ? '#FDCE15'
                      : 'transparent'
                  }
                />
              </label>
            )
          })}
        </div>
      </div>
      <button
        className={twMerge(
          'bg-button mt-2 w-full rounded-sm outline-1 outline-outButton text-white py-1 transition-all duration-200 disabled:cursor-not-allowed',
          loading && 'brightness-50'
        )}
        onClick={handleSubmit}
        disabled={loading}
      >
        Post
      </button>
    </div>
  )
}

export default CommentInput
