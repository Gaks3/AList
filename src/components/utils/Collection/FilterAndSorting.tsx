'use client'

import { useEffect, useRef, useState } from 'react'
import { Search } from 'react-feather'
import { useDebounce } from 'use-debounce'

const FilterAndSorting = () => {
  const [getFilter, setFilter] = useState<{ date?: string; status?: string }>(
    {}
  )
  const [getSearch, setSearch] = useState<string>()
  const [debouncedFilterValue] = useDebounce(getFilter, 700)
  const [debouncedSearchValue] = useDebounce(getSearch, 700)
  const pageBeenRendered = useRef(false)

  const handleChangeFilter = (event: React.FocusEvent<HTMLSelectElement>) => {
    const value: any = event.currentTarget.value

    if (value == 'asc' || value == 'desc')
      return setFilter((prev) => ({ ...prev, date: value }))
    setFilter((prev) => ({ ...prev, status: value }))
  }

  const handleChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value

    if (value.trim() == '') return
    setSearch(value)
  }

  useEffect(() => {
    if (pageBeenRendered.current) {
    }

    pageBeenRendered.current = true
  }, [debouncedFilterValue, debouncedSearchValue])

  return (
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
  )
}

export default FilterAndSorting
