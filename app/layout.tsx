
import { Inter } from 'next/font/google'
import { Header } from './components/header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Game Market',
  description: 'Buy and sell game items',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black min-h-screen`}>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}

