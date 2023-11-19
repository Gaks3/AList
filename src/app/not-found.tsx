import Link from 'next/link'

const Page = () => {
  return (
    <div className="min-h-screen max-w-xl mx-auto flex justify-center items-center">
      <div className="flex justify-center items-center flex-col">
        <h1 className="font-bold text-heading text-4xl">
          404 | Page Not Found
        </h1>
        <Link
          href={'/'}
          className="text-heading hover:underline transition-all duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}

export default Page
