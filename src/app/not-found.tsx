'use client'

import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()

  return (
    <div className='min-h-screen max-w-xl mx-auto flex justify-center items-center'>
      <div className='flex justify-center items-center flex-col'>
        <h1 className='font-bold text-heading text-4xl'>
          404 | Page Not Found
        </h1>
        <button
          onClick={() => router.back()}
          className='text-heading hover:underline transition-all duration-300'
        >
          Return back
        </button>
      </div>
    </div>
  )
}

export default Page
