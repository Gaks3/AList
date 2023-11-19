'use client'

import { Search } from 'react-feather'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'

const InputSearch = () => {
  const searchRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const inputFocus = () => {
    const input = document.querySelector<HTMLInputElement>('input[type=search]')

    input?.focus()
  }

  const handleSearch = (
    event: React.MouseEvent<HTMLOrSVGElement> | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const keyword = searchRef.current?.value
    if (!keyword || keyword.trim() == '') return

    router.push(`/search/${keyword}`)
  }

  return (
    <form
      className="flex flex-row gap-1 items-center bg-card2 py-2 px-3 rounded-xl hover:bg-surface cursor-pointer outline outline-1 outline-outline"
      onClick={inputFocus}
      onSubmit={handleSearch}
    >
      <Search size={21} className="text-stroke mr-2" onClick={handleSearch} />
      <input
        type="search"
        placeholder="Search anime..."
        className="bg-inherit outline-none caret-neutral-300 text-textHolder text-sm cursor-pointer"
        ref={searchRef}
      />
    </form>
  )
}

export default InputSearch
