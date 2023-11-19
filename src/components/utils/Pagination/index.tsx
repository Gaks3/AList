import { useRouter } from 'next/navigation'

const Pagination = ({
  page,
  lastPage,
  pathname,
}: {
  page: number
  lastPage: number | undefined
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
      {page <= 1 ? null : (
        <button className="hover:text-button" onClick={handePrevPage}>
          &laquo; Prev
        </button>
      )}
      <p>
        {page} of {lastPage}
      </p>
      {/* @ts-ignore */}
      {page >= lastPage ? null : (
        <button className="hover:text-button" onClick={handeNextPage}>
          Next &raquo;
        </button>
      )}
    </div>
  )
}

export default Pagination
