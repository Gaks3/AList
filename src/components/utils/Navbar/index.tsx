import Link from 'next/link'
import InputSearch from './InputSearch'
import UserActionButton from './UserActionButton'

const Navbar = () => {
  return (
    <header className="bg-navbar outline outline-[0.5px] outline-outline">
      <div className="flex md:flex-row flex-col justify-between p-4 gap-2 items-center">
        <Link href={'/'} className="font-bold text-3xl text-heading">
          A-List
        </Link>
        <div className="flex flex-row gap-5 items-center">
          <InputSearch />
          <UserActionButton />
        </div>
      </div>
    </header>
  )
}

export default Navbar
