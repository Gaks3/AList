import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'

export const authOption = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_AUTH_GITHUB_CLIENT as string,
      clientSecret: process.env.NEXT_AUTH_GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
}

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }
