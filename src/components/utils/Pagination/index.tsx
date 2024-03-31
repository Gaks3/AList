import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

const Pagination = ({
  page,
  lastPage,
  pathname,
}: {
  page: number
  lastPage: number
  pathname: string | undefined
}) => {
  const router = useRouter()

  const scrollTop = () => {
    scrollTo({
      behavior: 'smooth',
      top: 0,
    })
  }

  const handeNextPage = () => {
    if (page === lastPage) return
    scrollTop()
    setTimeout(() => {
      router.push(`${pathname}?page=${page + 1}`, { scroll: false })
    }, 550)
  }

  const handePrevPage = () => {
    scrollTop()
    setTimeout(() => {
      router.push(`${pathname}?page=${page - 1}`, { scroll: false })
    }, 550)
  }

  return (
    <div className="flex justify-center items-center text-white text-base my-10 gap-4 cursor-pointer">
      <button
        className={twMerge(
          'hover:text-button',
          page <= 1 ? 'invisible' : 'visible'
        )}
        onClick={handePrevPage}
      >
        &laquo; Prev
      </button>

      <p>
        {page} of {lastPage}
      </p>
      <button
        className={twMerge(
          'hover:text-button',
          page >= lastPage && lastPage ? 'invisible' : 'visible'
        )}
        onClick={handeNextPage}
      >
        Next &raquo;
      </button>
    </div>
  )
}

export default Pagination
