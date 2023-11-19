import { authUserSession } from '@/libs/auth'
import Link from 'next/link'
import AvatarDropdown from './AvatarDropdown'

const UserActionButton = async () => {
  const user = await authUserSession()

  return (
    <>
      {user ? (
        <AvatarDropdown user={user} />
      ) : (
        <Link
          href={`/api/auth/signin`}
          className="bg-button px-4 py-2 rounded-xl text-white outline outline-outButton outline-0 hover:outline-2 hover:outline-offset-2 transition-all duration-75 ease-in"
        >
          Sign In
        </Link>
      )}
    </>
  )
}

export default UserActionButton
