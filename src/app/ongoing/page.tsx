'use client'

import AList from '@/components/AnimeList'
import HeaderList from '@/components/AnimeList/HeaderList'
import Pagination from '@/components/utils/Pagination'
import fetcher from '@/libs/fetcher'
import { usePathname, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import Loading from '../loading'

const Page = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const currentPage = Number(searchParams.get('page')) || 1

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?status=airing&order_by=score&sort=desc&sfw=true&page=${currentPage}`,
    fetcher
  )

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <HeaderList title={`Ongoing Anime Page ${currentPage}`} />
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
