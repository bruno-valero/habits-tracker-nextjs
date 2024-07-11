import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { QueryClientContextProvider } from '@/components/providers/query-client'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Hábitos',
    default: 'Hábitos',
  },
  description: 'Gerencie seus Hábitos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientContextProvider>
            <Toaster richColors position="top-right" />
            {children}
          </QueryClientContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
