'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Search } from 'react-feather'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useDebounce } from 'use-debounce'
import { getAnimeRes } from '@/libs/api'
import AnimeTopProps, { AnimeDataFull } from '@/types/AnimeTop'

const InputSearch = () => {
  const router = useRouter()
  const params = useParams()
  const keywordParams = params.keyword as string

  const [search, setSearch] = useState(!keywordParams ? '' : keywordParams)
  const [anime, setAnime] = useState<AnimeDataFull | null>()
  const [focus, setFocus] = useState<boolean>(false)
  const [debouncedValue] = useDebounce(search, 700)

  const inputFocus = () => {
    const input = document.querySelector<HTMLInputElement>('input[type=search]')

    input?.focus()
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value

    setSearch(value)
    if (!search && search?.trim() == '') setAnime(null)
  }

  const handleSearch = (
    event: React.MouseEvent<HTMLOrSVGElement> | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const keyword: string = search
    if (!keyword || keyword?.trim() == '') return

    router.push(`/search/${keyword}`)
  }

  const getAnimeSearch = async () => {
    if (!search || search.trim() == '') return
    const data: AnimeDataFull = await getAnimeRes(
      'anime',
      `q=${search}&limit=5`
    )

    setAnime(data)
  }

  useEffect(() => {
    getAnimeSearch()
  }, [debouncedValue])

  return (
    <div className='relative'>
      <form
        className='flex flex-row gap-1 items-center bg-card2 py-2 px-3 rounded-xl hover:bg-surface cursor-pointer outline outline-1 outline-outline'
        onClick={inputFocus}
        onSubmit={handleSearch}
      >
        <Search size={21} className='text-stroke mr-2' onClick={handleSearch} />
        <input
          type='search'
          placeholder='Search anime...'
          className='bg-inherit outline-none caret-neutral-300 text-textHolder text-sm cursor-pointer w-72'
          onChange={handleChange}
          value={search as string}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </form>
      <div
        className={twMerge(
          'right-0 mt-3 z-40 bg-card2 h-fit w-full rounded-xl p-2 flex flex-col text-white',
          anime && focus ? 'absolute' : 'hidden'
        )}
      >
        {anime?.data?.map(({ title }: AnimeTopProps, index) => {
          return (
            <Link
              href={`/search/${encodeURIComponent(title)}`}
              key={index}
              className='truncate p-1 hover:bg-outline'
              onBlur={() => setFocus(false)}
            >
              {title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default InputSearch
