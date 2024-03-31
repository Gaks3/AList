'use client'

import Loading from '@/app/loading'
import AList from '@/components/AnimeList'
import HeaderList from '@/components/AnimeList/HeaderList'
import Pagination from '@/components/utils/Pagination'
// import { getAnimeRes } from '@/libs/api'
import fetcher from '@/libs/fetcher'
import AnimeTopProps from '@/types/AnimeTop'
import PaginationProps from '@/types/Pagination'
import { usePathname, useSearchParams } from 'next/navigation'
import useSWR from 'swr'

interface dataProps {
  pagination: PaginationProps
  data: AnimeTopProps[]
}

const Page = ({ params }: { params: { keyword: string } }) => {
  const { keyword } = params
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const currentPage = Number(searchParams.get('page')) || 1

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${keyword}&page=${currentPage}`,
    fetcher
  )

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data?.data.length != 0 ? (
            <section>
              <HeaderList
                title={`Search result for "${decodeURIComponent(keyword)}"`}
              />
              <AList data={data?.data} />
              <Pagination
                page={currentPage}
                lastPage={data?.pagination?.last_visible_page}
                pathname={pathname}
              />
            </section>
          ) : (
            <div className="min-h-screen max-w-xl mx-auto flex justify-center items-center">
              <div className="flex justify-center items-center flex-col">
                <h1 className="font-bold text-heading text-4xl">
                  404 | Data Not Found
                </h1>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Page
