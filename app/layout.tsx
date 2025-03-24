import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kebchi',
  description: 'Created by Kazaz',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
