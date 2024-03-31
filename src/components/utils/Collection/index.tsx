'use client'

import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Search, Trash2 } from 'react-feather'
import { useDebounce } from 'use-debounce'
import { Collection } from '@/types/Collection'
import Loading from '@/app/loading'
import EpisodeState from './EpisodeState'
import moment from 'moment'
import SelectStatus from './SelectionStatus'
import Image from 'next/image'
import Link from 'next/link'

const Collections = ({ email, cookie }: { email: string; cookie: string }) => {
  const [getFilter, setFilter] = useState<{ date?: string; status?: string }>(
    {}
  )
  const [getSearch, setSearch] = useState<string | null>()
  const [collection, setCollection] = useState<{
    data?: Collection[]
    message?: string
  }>()
  const [filterCollection, setFilterCollection] = useState<
    Collection[] | undefined
  >([])
  const [debouncedSearchValue] = useDebounce(getSearch, 700)
  const pageBeenRendered = useRef(false)

  const handleDelete = async (id: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MY_URL}/api/v1/collection/${id}`,
      {
        method: 'DELETE',
      }
    )

    if (res) {
      setCollection((curr) => {
        const data = curr?.data?.filter((value) => value.id !== id)

        return { ...curr, data }
      })
    }
  }

  const handleChangeFilter = (event: React.FocusEvent<HTMLSelectElement>) => {
    const value: any = event.currentTarget.value

    if (value == 'asc' || value == 'desc') return setFilter({ date: value })
    setFilter({ status: value })
  }

  const handleChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value

    if (value == '') {
      setFilterCollection(() => {
        let arr

        if (getFilter.status)
          arr = collection?.data?.filter(
            (value) => value.status === getFilter.status
          )
        else if (getFilter.date)
          arr = collection?.data?.sort((x, y) => {
            if (getFilter.date == 'asc')
              return (
                new Date(x.add_date).getTime() - new Date(y.add_date).getTime()
              )
            else if (getFilter.date == 'desc')
              return (
                new Date(y.add_date).getTime() - new Date(x.add_date).getTime()
              )
          })

        return arr
      })

      return setSearch(null)
    } else if (value.trim() == '') return
    setSearch(value.toLowerCase())
  }

  useEffect(() => {
    if (pageBeenRendered.current) {
      return setFilterCollection(() => {
        const arr = collection?.data?.filter(
          (value) => value.status === getFilter.status
        )
        console.log(arr)

        if (getSearch)
          return arr?.filter(({ title }) => {
            return title.toLowerCase().includes(getSearch)
          })
        return arr
      })
    }

    pageBeenRendered.current = true
  }, [getFilter.status])

  useEffect(() => {
    if (pageBeenRendered.current) {
      return setFilterCollection(() => {
        const arr = collection?.data?.sort((x, y) => {
          if (getFilter.date == 'asc')
            return (
              new Date(x.add_date).getTime() - new Date(y.add_date).getTime()
            )
          else if (getFilter.date == 'desc')
            return (
              new Date(y.add_date).getTime() - new Date(x.add_date).getTime()
            )
        })

        if (getSearch)
          return arr?.filter(({ title }) => {
            return title.toLowerCase().includes(getSearch)
          })
        return arr
      })
    }
  }, [getFilter.date])

  useEffect(() => {
    if (pageBeenRendered.current) {
      const filtCollection: Collection[] | undefined = collection?.data
      let arr: Collection[] | undefined = filtCollection

      if (getFilter.date) {
        arr = collection?.data?.sort((x, y) => {
          if (getFilter.date == 'asc')
            return (
              new Date(x.add_date).getTime() - new Date(y.add_date).getTime()
            )
          else if (getFilter.date == 'desc')
            return (
              new Date(y.add_date).getTime() - new Date(x.add_date).getTime()
            )
        })
      } else if (getFilter.status) {
        arr = collection?.data?.filter(
          (value) => value.status === getFilter.status
        )
      }

      return setFilterCollection(() => {
        return arr?.filter(({ title }) => {
          return title.toLowerCase().includes(getSearch as string)
        })
      })
    }

    pageBeenRendered.current = true
  }, [debouncedSearchValue])

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MY_URL}/api/v1/collection/email`,
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({ email }),
          headers: {
            Cookie: cookie,
          },
        }
      )

      const data = await res.json()
      setCollection((prev) => ({ ...prev, data: data.data }))
      setFilterCollection(data.data)
    }

    fetcher()
  }, [])

  return (
    <>
      <div className='flex flex-row justify-between mb-4'>
        <select
          className='bg-card2 hover:brightness-110 p-1 rounded-sm text-white outline-none border border-hidden px-2 cursor-pointer'
          title='Filter'
          defaultValue={'Title'}
          onChange={handleChangeFilter}
        >
          <option hidden value={'Title'}>
            Filter
          </option>
          <optgroup label='Date'>
            <option value='desc'>Newest</option>
            <option value='asc'>Oldest</option>
          </optgroup>
          <optgroup label='Status'>
            <option value='WATCHING'>Watching</option>
            <option value='HOLD'>Hold</option>
            <option value='PLAN'>Plan To Watch</option>
            <option value='DROPPED'>Dropped</option>
          </optgroup>
        </select>
        <form className='flex flex-row gap-1 items-center justify-center bg-card2 py-2 px-2 rounded-xl hover:brightness-110 cursor-pointer outline outline-1 outline-outline'>
          <Search
            size={18}
            className='text-stroke mr-2 hover:text-white transition duration-300'
          />
          <input
            type='search'
            placeholder='Search collection...'
            className='bg-inherit outline-none caret-neutral-300 text-heading2 text-sm cursor-text w-56'
            onChange={handleChangeInput}
          />
        </form>
      </div>
      {filterCollection ? (
        <>
          {filterCollection.map(
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
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Collections
