'use client'

import { Collections } from '@/types/Collection'
import { Collection } from '@prisma/client'
import Image from 'next/image'
import { useState } from 'react'
import { ExternalLink, Trash2 } from 'react-feather'
import SelectStatus from './SelectionStatus'
import moment from 'moment'
import EpisodeState from './EpisodeState'
import Link from 'next/link'

const CollectionList = ({ collections }: { collections: Collections }) => {
  const [getCollections, setCollections] = useState(collections)

  const handleDelete = async (id: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MY_URL}/api/v1/collection/${id}`,
      {
        method: 'DELETE',
      }
    )

    if (res) {
      setCollections((curr) => {
        const arr = curr.filter((value) => value.id !== id)

        return arr
      })
    }
  }

  return (
    <>
      {getCollections.map(
        ({
          title,
          id,
          episode,
          image,
          status,
          mal_id,
          add_date,
          complete_date,
          rewatch,
        }: Collection) => {
          return (
            <div
              className='w-full h-40 bg-card2 rounded-lg p-2 shadow-md shadow-neutral-900 flex flex-row justify-between mb-4'
              key={id}
            >
              <Link
                href={`http://localhost:3000/anime/${mal_id}`}
                className='w-[15%] h-full relative group'
              >
                <Image
                  src={image}
                  alt='Image'
                  className='rounded-md hover:brightness-75 transition-all duration-200 object-cover'
                  fill
                  sizes='100%'
                />
                <ExternalLink
                  size={27}
                  className='absolute bottom-0 right-0 p-1 text-white bg-card2 rounded-tl-md hidden group-hover:block transition duration-300'
                />
              </Link>
              <div className='flex flex-row justify-between w-[77%]'>
                <div className='flex flex-col justify-between w-1/2'>
                  <div>
                    <h1 className='text-xl text-heading2 font-semibold truncate'>
                      {title}
                    </h1>
                    <SelectStatus id={id} status={status} />
                  </div>
                  <div>
                    <p className='text-sm text-heading2'>
                      {moment(add_date).format('DD MMMM YYYY')} -{' '}
                      {complete_date
                        ? moment(complete_date).format('DD MMMM YYYY')
                        : '?'}
                    </p>
                  </div>
                </div>
                <div className='flex flex-row gap-5'>
                  <div className='flex items-center'>
                    <EpisodeState id={id} episode={episode} />
                  </div>
                </div>
              </div>
              <Trash2
                className='text-neutral-500 hover:text-red-600 cursor-pointer'
                size={18}
                onClick={() => handleDelete(id)}
              />
            </div>
          )
        }
      )}
    </>
  )
}

export default CollectionList
