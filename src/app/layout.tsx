import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/utils/Navbar'
import { Suspense } from 'react'
import Loading from './loading'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'A-List',
  description: 'List Anime',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="p-5">{children}</div>
      </body>
    </html>
  )
}
