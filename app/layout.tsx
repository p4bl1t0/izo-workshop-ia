import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Fundamentos de IA para Desarrolladores | Instituto Zona Oeste',
  description:
    'Workshop práctico de 2 horas: Del IDE al ADE — cómo utilizar IA y agentes durante el proceso de desarrollo de software. Instituto Zona Oeste.',
  icons: {
    icon: [{ url: '/logo-izo.webp', type: 'image/webp' }],
    apple: '/logo-izo.webp',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#27282B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${openSans.variable} bg-[#27282B]`}>
      <body className={`${openSans.className} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
