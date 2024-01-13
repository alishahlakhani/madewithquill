import type { Metadata } from 'next'
import { cn } from '@zero/utils'
import { Providers } from '@zero/components/providers'
import localFont from 'next/font/local'
import { Inter } from "next/font/google"
import './globals.scss'

// Font files can be colocated inside of `app`
const fontSans = localFont({
  src: '../../public/fonts/bricolage.ttf',
  display: 'swap',
  variable: '--font-sans',
})

// Font files can be colocated inside of `app`
const fontInter = Inter({ subsets: ['latin'], variable: "--font-inter", display: "swap" })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(fontSans.className, fontInter.variable)}
      >
        <Providers
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </Providers>
      </body>
    </html>
  )
}
