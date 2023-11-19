import VideoPlayer from '@/components/utils/VideoPlayer'
import { getAnimeRes } from '@/libs/api'
import { AnimeData } from '@/types/AnimeTop'
import Image from 'next/image'
import { Star } from 'react-feather'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const anime: AnimeData = await getAnimeRes(`anime/${id}`)

  return (
    <div className="text-white bg-card2 rounded-lg p-4 w-full flex flex-col gap-5">
      <h1 className="text-2xl font-bold">{anime.data?.title}</h1>
      <div className="flex flex-row gap-5 h-[290px]">
        <Image
          src={anime.data?.images.webp.image_url}
          alt={anime.data?.images.webp.image_url}
          width={200}
          height={200}
          className="object-cover"
          title={anime.data.title}
        />
        <div className="flex flex-col gap-2 h-full">
          <div className="flex flex-row gap-2 h-[10%] flex-wrap">
            <p className="bg-outline px-2 py-1 rounded-md outline outline-1 outline-outline2">
              {anime.data?.status}
            </p>
            <p className="bg-outline px-2 py-1 rounded-md outline outline-1 outline-outline2">
              {anime.data?.episodes} episodes
            </p>
            <p className="bg-outline px-2 py-1 rounded-md outline outline-1 outline-outline2">
              {anime.data?.rating}
            </p>
            {anime.data?.season || anime.data?.year ? (
              <p className="bg-outline px-2 py-1 rounded-md outline outline-1 outline-outline2">
                {anime.data?.season
                  ? anime.data?.season?.charAt(0).toUpperCase() +
                    anime.data?.season?.slice(1)
                  : null}{' '}
                {anime.data?.year ? anime.data?.year : null}
              </p>
            ) : null}
          </div>
          <div className="flex items-center justify-between h-[70%]">
            <div className="flex flex-row gap-2 items-center">
              <Star size={50} strokeWidth={1} color="#FDCE15" />
              <p className="text-3xl">
                {anime.data?.score} | {anime.data?.type}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <div className="outline outline-1 outline-outline2 rounded text-center">
                  <p className="bg-outline px-2 p-1">First Episode</p>
                  <p>Episode 1</p>
                </div>
                <div className="outline outline-1 outline-outline2 rounded text-center">
                  <p className="bg-outline px-2 p-1">Last Episode</p>
                  <p>Episode {anime.data?.episodes}</p>
                </div>
              </div>
              <div>
                <div className="outline outline-1 outline-outline2 rounded text-center">
                  <p className="bg-outline px-2 p-1">Studio</p>
                  <p>
                    {anime.data?.studios?.map(({ name }, index, row) => {
                      let allStudiosName: string = ' '

                      if (!allStudiosName.includes(name)) {
                        if (index + 1 == row.length)
                          allStudiosName = allStudiosName + name
                        else allStudiosName = allStudiosName + name + ', '
                      }

                      return allStudiosName
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 h-[10%]">
            {anime.data?.genres?.map(({ name }, index) => {
              return (
                <p
                  className="bg-outline px-2 py-1 rounded-md outline outline-1 outline-outline2"
                  key={index}
                >
                  {name}
                </p>
              )
            })}
          </div>
          <div className="flex flex-row gap-3 h-[10%]">
            <p>
              <span className="font-bold">Popularity</span>: #
              {anime.data?.popularity}
            </p>
            <p>
              <span className="font-bold">Duration</span>:{' '}
              {anime.data?.duration}
            </p>
            {/* <p>
              Studios:
              {anime.data?.studios.map(({ name }, index, row) => {
                let allStudiosName: string = ' '

                if (!allStudiosName.includes(name)) {
                  if (index + 1 == row.length)
                    allStudiosName = allStudiosName + name
                  else allStudiosName = allStudiosName + name + ', '
                }

                return allStudiosName
              })}
            </p> */}
            <p>
              <span className="font-bold">Aired</span>:{` `}{' '}
              {anime.data?.aired?.from.slice(0, 9)} to{' '}
              {!anime?.data?.aired?.to
                ? 'now'
                : anime.data?.aired.to.slice(0, 9)}
            </p>
          </div>
        </div>
        <div className="bg-white w-[450px]">
          <VideoPlayer youtube_id={anime.data?.trailer?.youtube_id} />
        </div>
      </div>
      <div>
        <p className="font-bold">Synopsis</p>
        <p>{anime.data?.synopsis}</p>
      </div>
    </div>
  )
}

export default Page
