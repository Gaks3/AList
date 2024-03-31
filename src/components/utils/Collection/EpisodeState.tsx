'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'

const EpisodeState = ({ id, episode }: { id: number; episode: number }) => {
  const [getEpisode, setEpisode] = useState<number>(episode)
  const [inputEpisode, setInputEpisode] = useState(getEpisode)
  const [debouncedValue] = useDebounce(getEpisode, 1000)
  const [loadEpisode, setLoadEpisode] = useState<boolean>(false)
  const pageBeenRendered = useRef(false)

  const handleDecreasingEpisode = () => {
    if (getEpisode <= 1) return
    setLoadEpisode(true)
    setEpisode((curr) => curr - 1)
    setInputEpisode((curr) => curr - 1)
    console.log(getEpisode, inputEpisode)
  }

  const handleIncreasingEpisode = () => {
    setLoadEpisode(true)
    setEpisode((curr) => curr + 1)
    setInputEpisode((curr) => curr + 1)
  }

  const handleChangeInputEpisode = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setInputEpisode(Number(event.currentTarget.value))
  }

  const handleBlurInputEpisode = () => {
    setLoadEpisode(true)
    setEpisode(inputEpisode)
  }

  const handleEnterInput = (
    event: React.KeyboardEvent<HTMLInputElement> &
      React.FocusEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      event?.target?.blur()
    }
  }

  useEffect(() => {
    if (pageBeenRendered.current) {
      fetch('http://localhost:3000/api/v1/collection/episode', {
        method: 'PATCH',
        body: JSON.stringify({ id, episode: getEpisode }),
      }).then(() => setLoadEpisode(false))
    }

    pageBeenRendered.current = true
  }, [debouncedValue])

  return (
    <div className='flex flex-row bg-button h-8 shadow-lg shadow-neutral-900 items-center'>
      <button
        className='w-9 h-full border-y border-l border-outButton hover:bg-outButton transition duration-200 disabled:brightness-50 disabled:cursor-not-allowed'
        onClick={handleDecreasingEpisode}
        disabled={loadEpisode}
      >
        -
      </button>
      <input
        type='text'
        value={inputEpisode}
        className='w-9 h-full border bg-button focus:outline-none border-outButton text-center disabled:brightness-[.8] disabled:cursor-not-allowed'
        onChange={handleChangeInputEpisode}
        onBlur={handleBlurInputEpisode}
        disabled={loadEpisode}
        onKeyUp={handleEnterInput}
      />
      <button
        className='w-9 h-full border-y border-r border-outButton hover:bg-outButton transition duration-200 disabled:brightness-50 disabled:cursor-not-allowed'
        onClick={handleIncreasingEpisode}
        disabled={loadEpisode}
      >
        +
      </button>
    </div>
  )
}

export default EpisodeState
