import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { QueryProvider } from '@/components/providers/query-provider'
import '@/src/app/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} antialiased`}>
      <QueryProvider>
        <div className="min-h-screen bg-background">
          {/* Simple Header */}
          <header className="border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h1 className="text-xl font-bold">
                  {process.env.NEXT_PUBLIC_BRAND_NAME || 'ScholarLens'}
                </h1>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Ready</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main>
            <Component {...pageProps} />
          </main>

          {/* Simple Footer */}
          <footer className="border-t mt-16">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="text-sm text-muted-foreground">
                  © 2024 ScholarLens. AI-powered research assistant.
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Sources: arXiv • Crossref • Semantic Scholar</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </QueryProvider>
    </div>
  )
}