import Link from 'next/link'
import InputSearch from './InputSearch'
import UserActionButton from './UserActionButton'
import { Award, Home, RefreshCw } from 'react-feather'
import Title from './Title'

const Navbar = () => {
  return (
    <header className="bg-navbar outline outline-[0.5px] outline-outline">
      <div className="flex md:flex-row flex-col justify-between p-4 gap-2 items-center">
        <div className="flex flex-row gap-12 items-center">
          <Title />
          <div className="flex flex-row gap-6 text-heading2 font-semibold text-lg">
            <Link
              href={'/'}
              className="hover:text-button transition-colors duration-200 flex items-center gap-1"
            >
              <Home size={18} />
              Home
            </Link>
            <Link
              href={'/top'}
              className="hover:text-button transition-colors duration-200 flex items-center gap-1"
            >
              <Award size={18} />
              Top
            </Link>
            <Link
              href={'/ongoing'}
              className="hover:text-button transition-colors duration-200 flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Ongoing
            </Link>
          </div>
        </div>
        <div className="flex flex-row gap-5 items-center">
          <InputSearch />
          <UserActionButton />
        </div>
      </div>
    </header>
  )
}

export default Navbar
