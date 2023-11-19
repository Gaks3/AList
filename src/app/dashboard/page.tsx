import HeaderList from '@/components/AnimeList/HeaderList'
import { authUserSession } from '@/libs/auth'
import Image from 'next/image'
import { User } from 'react-feather'

const Page = async () => {
  const user = await authUserSession()

  return (
    <div>
      <HeaderList title="Dashboard" />
      <div>
        {user?.image ? (
          <Image
            src={user?.image}
            alt={user?.image ?? 'Profile Image'}
            width={100}
            height={100}
          />
        ) : null}
        <p>{user?.name}</p>
      </div>
    </div>
  )
}

export default Page
