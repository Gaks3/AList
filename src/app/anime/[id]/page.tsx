import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Music, Star } from 'react-feather'
import VideoPlayer from '@/components/utils/VideoPlayer'
import CollectionButton from '@/components/AnimeList/CollectionButton'
import CommentInput from '@/components/AnimeList/CommentInput'
import { getAnimeRes } from '@/libs/api'
import { authUserSession } from '@/libs/auth'
import prisma from '@/libs/prisma'
import { AnimeData, AnimeDatas } from '@/types/AnimeTop'
import { Charas } from '@/types/Chara'
import { Collection } from '@/types/Collection'
import { cookies } from 'next/headers'
import CommentBox from '@/components/AnimeList/CommentBox'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const anime: AnimeData = await getAnimeRes(`anime/${id}/full`)
  const chara: Charas = await getAnimeRes(`anime/${id}/characters`)
  const user = await authUserSession()

  const collection: Collection | null = user
    ? await prisma?.collection.findUnique({
        where: {
          email_mal_id: { email: user?.email as string, mal_id: id },
        },
      })
    : null

  const relate: AnimeDatas = await getAnimeRes(
    `top/anime`,
    `order_by=rank&sort=desc&limit=5`
  )

  return (
    <>
      <div className='text-white bg-card2 rounded-lg p-4 w-full flex flex-col gap-5'>
        <div className='flex flex-row justify-between'>
          <h1 className='text-2xl font-bold'>{anime.data?.title}</h1>
          {user && (
            <CollectionButton
              mal_id={id}
              email={user?.email}
              already={collection?.id}
              title={anime.data.title}
              image={anime.data.images.webp.image_url}
            />
          )}
        </div>
        <div className='flex flex-row gap-5 h-fit-w-full'>
          <div className='w-[18%] flex flex-col gap-4'>
            <div className='flex justify-center relative h-[289px] w-full'>
              <Image
                src={anime.data?.images.webp.image_url}
                alt={anime.data?.images.webp.image_url}
                // width={205}
                // height={205}
                fill
                className='object-cover'
                title={anime.data.title}
              />
            </div>
            <div className='text-sm flex flex-col gap-4'>
              <div>
                <p className='font-bold text-base'>Title</p>
                <div className='flex flex-col gap-1 border-y border-neutral-600 py-1'>
                  <p>
                    <span className='font-semibold'>English</span> :{' '}
                    {anime.data.title_english}
                  </p>
                  <p>
                    <span className='font-semibold'>Japanese</span> :{' '}
                    {anime.data.title_japanese}
                  </p>
                  <p>
                    <span className='font-semibold'>Synonyms</span> :{' '}
                    {anime.data.title_synonyms.map((title, index) => {
                      let all: string = ''

                      anime.data.title_synonyms.length - 1 == index
                        ? (all = all + title)
                        : (all = all + title + ', ')

                      return all
                    })}
                  </p>
                </div>
              </div>
              <div>
                <p className='font-bold text-base'>Information</p>
                <div className='flex flex-col gap-1 border-y border-neutral-600 py-1'>
                  <p>
                    <span className='font-semibold'>Type</span> :{' '}
                    {anime.data.type}
                  </p>
                  <p>
                    <span className='font-semibold'>Source</span> :{' '}
                    {anime.data.source}
                  </p>
                  <p>
                    <span className='font-semibold'>Episodes</span> :{' '}
                    {anime.data.episodes}
                  </p>
                  <p>
                    <span className='font-semibold'>Duration</span> :{' '}
                    {anime.data.duration}
                  </p>
                  <p>
                    <span className='font-semibold'>Themes</span> :{' '}
                    {anime.data.themes.map(({ name }, index) => {
                      if (anime.data.themes.length - 1 !== index)
                        return name + ', '
                      return name
                    })}
                  </p>
                  <p>
                    <span className='font-semibold'>Studios</span> :{' '}
                    {anime.data.studios.map(({ name }, index) => {
                      if (anime.data.studios.length - 1 !== index)
                        return name + ', '
                      return name
                    })}
                  </p>
                  <p>
                    <span className='font-semibold'>Producers</span> :{' '}
                    {anime.data.producers.map(({ name }, index) => {
                      if (anime.data.producers.length - 1 !== index)
                        return name + ', '
                      return name
                    })}
                  </p>
                  <p>
                    <span className='font-semibold'>Licensors</span> :{' '}
                    {anime.data.licensors.map(({ name }, index) => {
                      if (anime.data.licensors.length - 1 !== index)
                        return name + ', '
                      return name
                    })}
                  </p>
                </div>
              </div>
              <div>
                <p className='font-bold text-base'>Statistics</p>
                <div className='flex flex-col gap-1 border-y border-neutral-600 py-1'>
                  <p>
                    <span className='font-semibold'>Score</span> :{' '}
                    {anime.data.score}{' '}
                    {`(score by ${anime.data.scored_by} user)`}
                  </p>
                  <p>
                    <span className='font-semibold'>Ranked</span> :{' #'}
                    {anime.data.rank}
                  </p>
                  <p>
                    <span className='font-semibold'>Popularity</span> :{' #'}
                    {anime.data.popularity}
                  </p>
                  <p>
                    <span className='font-semibold'>Members</span> :{' '}
                    {anime.data.members}
                  </p>
                  <p>
                    <span className='font-semibold'>Favorites</span> :{' '}
                    {anime.data.favorites}
                  </p>
                </div>
              </div>
              <div>
                <p className='font-bold text-base'>Streaming</p>
                {anime.data.streaming.map(({ name, url }, index) => {
                  return (
                    <Link
                      href={url}
                      target='_blank'
                      key={index}
                      className='flex flex-row items-center gap-2 hover:opacity-50'
                    >
                      <ExternalLink size={15} />
                      {name}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='flex flex-col w-[85%] gap-4'>
            <div className='flex flex-row gap-4 w-full justify-between'>
              <div className='flex flex-col gap-2 h-full w-fit'>
                <div className='flex flex-row gap-2 h-[10%] flex-wrap'>
                  <p className='bg-outline px-2 py-1 rounded-md outline outline-1 outline-outline2'>
                    {anime.data?.status}
                  </p>
                  <p className='bg-outline px-2 py-1 rounded-md outline outline-1 outline-outline2'>
                    {anime.data?.rating}
                  </p>
                  {anime.data?.season || anime.data?.year ? (
                    <p className='bg-outline px-2 py-1 rounded-md outline outline-1 outline-outline2'>
                      {anime.data?.season
                        ? anime.data?.season?.charAt(0).toUpperCase() +
                          anime.data?.season?.slice(1)
                        : null}{' '}
                      {anime.data?.year ? anime.data?.year : null}
                    </p>
                  ) : null}
                </div>
                <div className='flex items-center justify-between h-[70%] gap-7'>
                  <div className='flex flex-row gap-2 items-center'>
                    <Star
                      size={50}
                      strokeWidth={1}
                      fill='#FDCE15'
                      color='#FDCE15'
                    />
                    <p className='text-3xl'>
                      {anime.data?.score ?? '?'} | {anime.data?.type}
                    </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row gap-2'>
                      <div className='outline outline-1 outline-outline2 rounded text-center'>
                        <p className='bg-outline px-2 p-1'>First Episode</p>
                        <p>Episode 1</p>
                      </div>
                      <div className='outline outline-1 outline-outline2 rounded text-center'>
                        <p className='bg-outline px-2 p-1'>Last Episode</p>
                        <p>{`Episode ${
                          anime.data?.episodes ? anime.data.episodes : '?'
                        }`}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-row gap-2 h-[10%]'>
                  {anime.data?.genres?.map(({ name }, index) => {
                    return (
                      <p
                        className='bg-outline px-2 py-1 rounded-md outline outline-1 outline-outline2'
                        key={index}
                      >
                        {name}
                      </p>
                    )
                  })}
                </div>
                <div className='flex flex-row gap-3 h-[10%]'>
                  <p>
                    <span className='font-bold'>Popularity</span>: #
                    {anime.data?.popularity}
                  </p>
                  <p>
                    <span className='font-bold'>Rank</span>:{' #'}
                    {anime.data?.rank}
                  </p>
                  <p>
                    <span className='font-bold'>Popularity</span>:{` `}
                    {anime.data?.aired?.string}
                  </p>
                </div>
              </div>
              <div className='w-[450px] h-[300px] bg-black'>
                <VideoPlayer youtube_id={anime.data?.trailer?.youtube_id} />
              </div>
            </div>
            <div>
              <p className='font-bold'>Synopsis</p>
              <p>{anime.data?.synopsis}</p>
            </div>
            <div className='h-fit w-full flex flex-col'>
              <p className='font-bold'>Characters and Voice Actors</p>
              <div className='grid grid-cols-2 gap-2'>
                {chara.data
                  .slice(0, 6)
                  .map(({ character, voice_actors, role }, index) => {
                    return (
                      <div
                        className='flex flex-row justify-between bg-outline rounded-xl p-2 text-sm h-[120px]'
                        key={index}
                      >
                        <div className='flex flex-row gap-2 w-1/2 justify-start'>
                          <div className='h-full w-[30%] relative rounded-lg'>
                            <Image
                              src={character.images.webp.image_url}
                              alt={character.name}
                              width={200}
                              height={200}
                              className='object-cover object-center rounded-lg w-full h-full'
                            />
                          </div>
                          <div className='w-[70%]'>
                            <p className='truncate font-semibold'>
                              {character.name}
                            </p>
                            <p>{role}</p>
                          </div>
                        </div>
                        {voice_actors
                          .filter(
                            ({ language }: { language: string }) =>
                              language.toLowerCase() == 'japanese'
                          )
                          .slice(0, 1)
                          .map(({ language, person }, index) => {
                            if (language == 'Japanese') {
                              return (
                                <div
                                  className='flex flex-row gap-2 w-1/2 justify-end h-full'
                                  key={index}
                                >
                                  <div className='text-right w-[70%]'>
                                    <p className='truncate font-semibold'>
                                      {person.name}
                                    </p>
                                    <p>{language}</p>
                                  </div>
                                  <div className='h-full w-[30%] relative'>
                                    <Image
                                      src={person.images.jpg.image_url}
                                      alt={person.name}
                                      width={200}
                                      height={200}
                                      className='object-cover rounded-lg w-full h-full'
                                    />
                                  </div>
                                </div>
                              )
                            }
                            return null
                          })}
                      </div>
                    )
                  })}
              </div>
            </div>
            <div className='w-full flex flex-row gap-3'>
              <div className='w-1/2 flex flex-col gap-2'>
                <p className='font-semibold'>Opening Theme</p>
                <div className='flex flex-col gap-2 text-sm'>
                  {anime.data.theme.openings.map((title, index) => {
                    return (
                      <div
                        key={index}
                        className='flex flex-row gap-2 items-center'
                      >
                        <Music
                          size={20}
                          className='p-1 bg-outline2 rounded-full'
                        />
                        <p>{title}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='w-1/2 flex flex-col gap-2'>
                <p className='font-semibold'>Ending Theme</p>
                <div className='flex flex-col gap-2 text-sm'>
                  {anime.data.theme.endings.map((title, index) => {
                    return (
                      <div
                        key={index}
                        className='flex flex-row gap-2 items-center'
                      >
                        <Music
                          size={20}
                          className='p-1 bg-outline2 rounded-full'
                        />
                        <p>{title}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-card2 w-full h-auto rounded-lg mt-5 p-4 flex flex-row justify-between'>
        <div className='w-[68%]'>
          {user && (
            <>
              <h1 className='text-heading font-semibold text-lg'>Comment</h1>
              <CommentInput
                mal_id={id}
                username={user?.name as string}
                email={user?.email as string}
                avatar={user?.image as string}
                cookie={cookies().toString()}
                anime_title={anime.data.title}
              />
            </>
          )}
          <CommentBox mal_id={id} />
        </div>
        <div className='w-[0.5px] bg-neutral-600'></div>
        <div className='w-[28%]'>
          <h1 className='text-heading font-semibold text-lg'>Top Anime</h1>
          {relate.data.map(({ mal_id, images, title, synopsis }, index) => {
            return (
              <Link
                href={`/anime/${mal_id}`}
                key={index}
                className='flex flex-row justify-between mt-3 w-full h-40 brightness-90 hover:brightness-105'
              >
                <Image
                  src={images.webp.image_url}
                  alt={images.webp.image_url}
                  width={100}
                  height={50}
                  className='w-[25%] rounded-md'
                />
                <div className='w-[70%]'>
                  <h2 className='font-semibold text-white truncate w-full'>
                    {title}
                  </h2>
                  <p className='text-heading2 text-sm line-clamp-6'>
                    {synopsis}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Page
