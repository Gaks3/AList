import { getServerSession } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authUserSession = async () => {
  const session = await getServerSession(authOption)
  return session?.user
}

export const authOption = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_AUTH_GITHUB_CLIENT as string,
      clientSecret: process.env.NEXT_AUTH_GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
}
