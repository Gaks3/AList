import AList from '@/components/AnimeList'
import HeaderList from '@/components/AnimeList/HeaderList'
import { getAnimeRes, getNestedAnimeRes, randomize } from '@/libs/api'
import { AnimeRecommend, DataAnimeRecommend } from '@/types/AnimeRecommend'
import { AnimeDatas } from '@/types/AnimeTop'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const topAnime: AnimeDatas = await getAnimeRes('top/anime', 'limit=5')
  const recommendAnime: AnimeRecommend[] = await getNestedAnimeRes(
    'recommendations/anime',
    'entry'
  )
  const dataRecommendAnime: DataAnimeRecommend = {
    data: randomize(recommendAnime, 10),
  }
  const ongoingAnime: AnimeDatas = await getAnimeRes(
    'seasons/now',
    'limit=5&status=airing'
  )
  const upcomingAnime: AnimeDatas = await getAnimeRes(
    'seasons/upcoming',
    'limit=5'
  )

  return (
    <div className='flex flex-col gap-4 relative'>
      <Link
        href={`/anime/${topAnime.data[0].mal_id}`}
        className='h-[450px] w-full relative'
      >
        <Image
          src={topAnime.data[0].images.jpg.large_image_url}
          alt={topAnime.data[0].images.jpg.large_image_url}
          fill
          priority
          quality={100}
          className='object-cover rounded-md'
        />
        <div className='absolute top-5 left-5 text-heading font-semibold text-3xl'>
          # 1
        </div>
        <div className='absolute bottom-5 left-5 flex flex-col gap-2 pr-5 z-20'>
          <h3 className='text-heading font-semibold text-4xl text-shadow shadow-black'>
            {topAnime.data[0].title}
          </h3>
          <div className='flex flex-row gap-2 text-sm text-heading text-shadow-sm shadow-black items-center'>
            <div className='flex flex-row items-center gap-1'>
              <div>⭐</div>
              <p className='font-semibold'>{topAnime.data[0].score}</p>
            </div>
            <div className='text-shadow shadow-black text-base'>|</div>
            <p>
              {topAnime.data[0].season.toUpperCase()} {topAnime.data[0].year}
            </p>
            <div className='text-shadow shadow-black text-base'>|</div>
            <p>{topAnime.data[0].status}</p>
          </div>
          <div className='flex flex-row gap-2'>
            {topAnime.data[0].genres.map(({ name }, index) => {
              return (
                <p
                  key={index}
                  className='text-heading2 text-xs font-medium text-shadow shadow-black bg-card2 px-2 py-1 rounded-lg'
                >
                  {name}
                </p>
              )
            })}
          </div>
          <p className='leading-tight text-heading2 text-shadow-sm shadow-black line-clamp-3'>
            {topAnime.data[0].synopsis}
          </p>
        </div>
        <div className='absolute bottom-0 w-full h-52 bg-gradient-to-b from-transparent to-navbar z-10' />
      </Link>
      <section>
        <HeaderList title='Top Anime' link='top' linkTitle='View All' />
        <AList data={topAnime.data} />
      </section>
      <section>
        <HeaderList
          title='Recommendations Anime'
          link='top'
          linkTitle='View All'
        />
        {/* @ts-ignore */}
        <AList data={dataRecommendAnime.data} />
      </section>
      <section>
        <HeaderList title='On Going' link='ongoing' linkTitle='View All' />
        {/* @ts-ignore */}
        <AList data={ongoingAnime.data} />
      </section>
      <section>
        <HeaderList
          title='Upcoming Anime'
          link='/upcoming'
          linkTitle='View All'
        />
        {/* @ts-ignore */}
        <AList data={upcomingAnime.data} />
      </section>
    </div>
  )
}
