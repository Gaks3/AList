export const getAnimeRes = async (resource: string, query?: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}${'?' + query}`
  )
  const data = await res.json()

  return data
}

export const getNestedAnimeRes = async (
  resource: string,
  objectProperty: any
) => {
  const res = await getAnimeRes(resource)
  return res.data?.flatMap((item: any) => item[objectProperty])
}

export const randomize = (data: Array<any>, length: number) => {
  return data?.sort(() => 0.5 - Math.random()).slice(0, length)
}
