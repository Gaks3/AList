import AList from '@/components/AnimeList'
import HeaderList from '@/components/AnimeList/HeaderList'
import { getAnimeRes } from '@/libs/api'
import AnimeTopProps from '@/types/AnimeTop'
import PaginationProps from '@/types/Pagination'

interface dataProps {
  pagination: PaginationProps
  data: AnimeTopProps[]
}

const Page = async ({ params }: { params: { keyword: string } }) => {
  const { keyword } = params

  const searchAnime: dataProps = await getAnimeRes('anime', `q=${keyword}`)

  return (
    <>
      {searchAnime.data.length != 0 ? (
        <section>
          <HeaderList title={`Search result for "${decodeURI(keyword)}"`} />
          <AList data={searchAnime.data} />
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
  )
}

export default Page
