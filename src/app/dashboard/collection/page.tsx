import HeaderList from '@/components/AnimeList/HeaderList'
import { authUserSession } from '@/libs/auth'
import { cookies } from 'next/headers'
import Collections from '@/components/utils/Collection'

const Page = async () => {
  const user = await authUserSession()

  return (
    <>
      <div className='w-full h-full flex justify-center'>
        <div className='w-[60%] h-full flex flex-col'>
          <HeaderList title='Collections' />
          <Collections
            email={user?.email as string}
            cookie={cookies().toString()}
          />
        </div>
      </div>
    </>
  )
}

export default Page
