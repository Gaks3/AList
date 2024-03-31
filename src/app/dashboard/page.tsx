import HeaderList from '@/components/AnimeList/HeaderList'
import { authUserSession } from '@/libs/auth'
import Image from 'next/image'
import Link from 'next/link'
import { User } from 'react-feather'

const Page = async () => {
  const user = await authUserSession()

  return (
    <div>
      <HeaderList title="Dashboard" />
      <div className="flex flex-col items-center gap-3">
        {user?.image ? (
          <Image
            src={user?.image}
            alt={user?.image ?? 'Profile Image'}
            width={200}
            height={200}
            className="rounded-full"
          />
        ) : (
          <User />
        )}
        <p className="text-heading font-semibold text-xl">{user?.name}</p>
        <div className="flex flex-row gap-3">
          <Link
            href={'/dashboard/collection'}
            className="bg-card2 px-2 py-2 rounded-md text-neutral-400 hover:bg-surface hover:text-white transition duration-200 shadow-lg"
          >
            Collection
          </Link>
          <Link
            href={'/dashboard/comment'}
            className="bg-card2 px-2 py-2 rounded-md text-neutral-400 hover:bg-surface hover:text-white transition duration-200 shadow-lg"
          >
            Comment
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page
