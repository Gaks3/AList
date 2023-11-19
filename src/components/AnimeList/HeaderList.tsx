import Link from 'next/link'
import { Link as LinkLogo } from 'react-feather'

interface HeaderProps {
  title: string
  link?: string
  linkTitle?: string
}

const HeaderList = ({ title, link, linkTitle }: HeaderProps) => {
  return (
    <div className="flex justify-between py-2 items-center">
      <h1 className="text-2xl font-semibold text-heading">{title}</h1>
      {link && linkTitle && (
        <Link
          href={`/${link}`}
          className="font-medium cursor-pointer md:text-textHolder text-black hover:text-heading2 transition-all flex flex-row items-center gap-2"
        >
          <LinkLogo size={15} /> {linkTitle}
        </Link>
      )}
    </div>
  )
}

export default HeaderList
