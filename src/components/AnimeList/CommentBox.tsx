import prisma from '@/libs/prisma'
import { Comment } from '@prisma/client'
import moment from 'moment'
import Image from 'next/image'
import { Star } from 'react-feather'

const CommentBox = async ({ mal_id }: { mal_id: string }) => {
  const comments: Comment[] = await prisma.comment.findMany({
    where: {
      mal_id,
    },
    orderBy: {
      date: 'desc',
    },
  })

  return (
    <>
      <h1 className='text-heading font-semibold text-lg'>
        {comments.length} Comment
      </h1>
      <div className='mt-3'>
        {comments.map(({ avatar, username, date, text, rating }, index) => {
          return (
            <div className='mt-5' key={index}>
              <div className='flex flex-row gap-4'>
                <Image
                  src={avatar}
                  alt={avatar}
                  className='rounded-full w-10 h-10'
                  width={40}
                  height={40}
                />
                <div className='mt-'>
                  <div>
                    <p className='text-heading text-sm inline font-semibold'>
                      {username}
                    </p>
                    <p className='text-neutral-500 text-sm inline ml-1'>
                      • {moment(date).format('DD MMM YYYY')}
                    </p>
                  </div>
                  <p className='text-heading text-sm mt-1'>{text}</p>
                  <div className='flex flex-row gap-1 mt-2'>
                    {[...Array(5)].map((_, index) => {
                      return (
                        <Star
                          size={15}
                          className='text-[#FDCE15] cursor-pointer'
                          fill={
                            index + 1 <= (rating as number)
                              ? '#FDCE15'
                              : 'transparent'
                          }
                          key={index}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default CommentBox
