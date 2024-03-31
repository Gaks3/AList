'use client'

import { useEffect, useRef, useState } from 'react'

const SelectStatus = ({ id, status }: { id: number; status: string }) => {
  const [getStatus, setStatus] = useState(status)
  const pageBeenRendered = useRef(false)

  const handleChangeStatus = (event: React.FocusEvent<HTMLSelectElement>) => {
    setStatus(event.currentTarget.value)
  }

  useEffect(() => {
    if (pageBeenRendered.current) {
      const updateStatus = async () => {
        await fetch('http://localhost:3000/api/v1/collection/status', {
          method: 'PATCH',
          body: JSON.stringify({ id, status: getStatus }),
        })
      }

      updateStatus()
    }

    pageBeenRendered.current = true
  }, [getStatus])

  return (
    <select
      name='status'
      defaultValue={status}
      className='bg-zinc-800 p-1 rounded-sm text-white outline-none border border-hidden px-2 cursor-pointer'
      onChange={handleChangeStatus}
    >
      <option value='COMPLETED'>Completed</option>
      <option value='WATCHING'>Watching</option>
      <option value='PLAN'>Plan To Watch</option>
      <option value='HOLD'>Hold</option>
      <option value='Dropped'>Dropped</option>
    </select>
  )
}

export default SelectStatus
