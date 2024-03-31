'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'react-feather'

const Title = () => {
  const router = useRouter()

  return (
    <div className="flex flex-row gap-3 items-center">
      <ArrowLeft
        size={25}
        className="text-heading cursor-pointer hover:text-button hover:-translate-x-1 transition duration-200"
        onClick={() => router.back()}
      />
      <Link href={'/'} className="font-bold text-3xl text-heading">
        A-List
      </Link>
      <ArrowRight
        size={25}
        className="text-heading cursor-pointer hover:text-button hover:translate-x-1 transition duration-200"
        onClick={() => router.forward()}
      />
    </div>
  )
}

export default Title
