import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/components/providers/query-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'ScholarLens - AI Research Assistant',
  description: 'Advanced AI-powered academic paper search, analysis, and automated reporting platform',
  keywords: ['research', 'academic papers', 'AI', 'machine learning', 'citations', 'scientific literature'],
  authors: [{ name: 'ScholarLens Team' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>
          <div className="min-h-screen animated-bg">
            {/* Modern Gradient Header */}
            <header className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/80">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo and Brand */}
                  <div className="flex items-center space-x-4">
                    <div className="gradient-primary w-10 h-10 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gradient">
                        {process.env.NEXT_PUBLIC_BRAND_NAME || 'ScholarLens'}
                      </h1>
                      <p className="text-xs text-muted-foreground">AI Research Assistant</p>
                    </div>
                  </div>

                  {/* Status and Navigation */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="status-dot status-online"></div>
                      <span>Connected</span>
                    </div>
                    
                    {/* Feature Icons */}
                    <div className="hidden md:flex items-center space-x-2">
                      <div className="glass px-3 py-1.5 rounded-lg text-xs font-medium">
                        🔍 Search
                      </div>
                      <div className="glass px-3 py-1.5 rounded-lg text-xs font-medium">
                        📊 Analyze
                      </div>
                      <div className="glass px-3 py-1.5 rounded-lg text-xs font-medium">
                        📋 Report
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 lg:px-8 py-8">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border/40 bg-background/80 backdrop-blur-xl mt-16">
              <div className="container mx-auto px-4 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    © 2024 ScholarLens. Powered by AI for academic research excellence.
                  </div>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <span className="text-xs text-muted-foreground">Sources:</span>
                    <div className="flex space-x-2">
                      {['arXiv', 'Crossref', 'Semantic Scholar'].map((source) => (
                        <span key={source} className="px-2 py-1 bg-muted/50 rounded text-xs">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </QueryProvider>
      </body>
    </html>
  )
}
