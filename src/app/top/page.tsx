'use client'

import AList from '@/components/AnimeList'
import HeaderList from '@/components/AnimeList/HeaderList'
import Pagination from '@/components/utils/Pagination'
import { usePathname, useSearchParams } from 'next/navigation'
import Loading from '../loading'
import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

const Page = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const currentPage = Number(searchParams.get('page')) || 1

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?page=${currentPage}`,
    fetcher
  )

  return (
    <>
      <HeaderList title={`Top Anime Page ${currentPage}`} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <AList data={data?.data} />
          <Pagination
            page={currentPage}
            lastPage={data?.pagination?.last_visible_page}
            pathname={pathname}
          />
        </>
      )}
    </>
  )
}

export default Page
