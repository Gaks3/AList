import AnimeTopProps, { AnimeData } from '@/types/AnimeTop'
import Image from 'next/image'
import Link from 'next/link'

const AList = ({ data }: AnimeData) => {
  return (
    <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4 group-hover/card">
      {data?.map(
        (
          {
            mal_id,
            title,
            images,
            score,
            airing,
            type,
            season,
            year,
          }: AnimeTopProps,
          index
        ) => {
          return (
            <Link
              href={`/anime/${mal_id}`}
              className="cursor-pointer h-auto bg-card rounded-xl hover:bg-surface transition duration-500"
              key={index}
            >
              <div className="h-[350px] p-2">
                <Image
                  src={images.webp.image_url}
                  alt={title}
                  width={350}
                  height={350}
                  // onError={() =>
                  //   fetch(images.webp.image_url).then((r) => r.blob())
                  // }
                  className="h-[100%] rounded-lg shadow-gray-300 opacity-90 hover:opacity-100 hover:scale-[1.01] transition-all duration-500"
                />
              </div>
              <div className="flex flex-col px-2 pb-2 h-[100px] justify-between">
                <div>
                  <h3 className="font-medium md:text-xl text-md text-heading2 truncate">
                    {title}
                  </h3>
                  {!type || !season || !year ? null : (
                    <p className="text-neutral-500 font-normal text-sm truncate">
                      {type} | {season?.toUpperCase()} {year}
                    </p>
                  )}
                </div>
                <div className="flex justify-between text-heading2 items-center">
                  <p>⭐ {score}</p>
                  {airing ? <p>Ongoing</p> : <p>Completed</p>}
                </div>
              </div>
            </Link>
          )
        }
      )}
    </div>
  )
}

export default AList
