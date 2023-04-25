import { Modal } from './components/modals/Modal'
import { RegisterModal } from './components/modals/RegsiterModal'
import { Navbar } from './components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { ToasterProvider } from './providers/ToasterProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb clone',
  description: 'clone to learn nextjs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
      <ToasterProvider/>
      <RegisterModal/>
      <Navbar/>
      </body>
    </html>
  )
}
