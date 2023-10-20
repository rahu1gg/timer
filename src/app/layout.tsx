import '@/styles/main.scss'
import type { Metadata } from 'next'
import { Aldrich } from 'next/font/google'

const aldrich = Aldrich({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Timer',
  description: 'Timer app made using next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={aldrich.className}>{children}</body>
    </html>
  )
}
