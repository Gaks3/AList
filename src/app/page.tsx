import AList from '@/components/AnimeList'
import HeaderList from '@/components/AnimeList/HeaderList'
import { getAnimeRes, getNestedAnimeRes, randomize } from '@/libs/api'
import { AnimeRecommend, DataAnimeRecommend } from '@/types/AnimeRecommend'
import { AnimeDatas } from '@/types/AnimeTop'

export default async function Home() {
  const topAnime: AnimeDatas = await getAnimeRes('top/anime', 'limit=5')
  const recommendAnime: AnimeRecommend[] = await getNestedAnimeRes(
    'recommendations/anime',
    'entry'
  )
  const dataRecommendAnime: DataAnimeRecommend = {
    data: randomize(recommendAnime, 10),
  }
  const ongoingAnime: AnimeDatas = await getAnimeRes('seasons/now', 'limit=5')
  const upcomingAnime: AnimeDatas = await getAnimeRes(
    'seasons/upcoming',
    'limit=5'
  )

  return (
    <>
      <section>
        <HeaderList title="Top Anime" link="top" linkTitle="View All" />
        {/* @ts-ignore */}
        <AList data={topAnime.data} />
      </section>
      <section className="mt-5">
        <HeaderList
          title="Recommendations Anime"
          link="top"
          linkTitle="View All"
        />
        {/* @ts-ignore */}
        <AList data={dataRecommendAnime.data} />
      </section>
      <section className="mt-5">
        <HeaderList title="On Going" link="/ongoing" linkTitle="View All" />
        {/* @ts-ignore */}
        <AList data={ongoingAnime.data} />
      </section>
      <section className="mt-5">
        <HeaderList
          title="Upcoming Anime"
          link="/upcoming"
          linkTitle="View All"
        />
        {/* @ts-ignore */}
        <AList data={upcomingAnime.data} />
      </section>
    </>
  )
}
