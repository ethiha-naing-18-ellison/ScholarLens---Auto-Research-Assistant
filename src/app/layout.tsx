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
      <body className={`${inter.variable} antialiased`}>
        <QueryProvider>
          <div className="min-h-screen animated-bg relative">
            {/* Premium Header */}
            <header className="sticky top-0 z-50 glass-strong border-b border-border/30">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                  {/* Enhanced Logo and Brand */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="gradient-primary w-12 h-12 rounded-2xl flex items-center justify-center glow-subtle rotate-3 transform transition-transform duration-300 hover:rotate-0">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <h1 className="text-2xl font-bold text-gradient heading">
                        {process.env.NEXT_PUBLIC_BRAND_NAME || 'ScholarLens'}
                      </h1>
                      <p className="text-xs text-muted-foreground font-medium">AI Research Assistant</p>
                    </div>
                  </div>

                  {/* Enhanced Navigation */}
                  <div className="flex items-center space-x-4">
                    {/* Status Indicator */}
                    <div className="hidden sm:flex items-center space-x-3 glass-subtle px-4 py-2 rounded-full">
                      <div className="status-dot status-online"></div>
                      <span className="text-sm font-medium text-muted-foreground">Connected</span>
                    </div>
                    
                    {/* Mobile Status Indicator */}
                    <div className="sm:hidden flex items-center space-x-2">
                      <div className="status-dot status-online"></div>
                    </div>
                    
                    {/* Feature Pills */}
                    <div className="hidden lg:flex items-center space-x-3">
                      <div className="glass-subtle px-4 py-2 rounded-full text-sm font-medium interactive flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>Search</span>
                      </div>
                      <div className="glass-subtle px-4 py-2 rounded-full text-sm font-medium interactive flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span>Analyze</span>
                      </div>
                      <div className="glass-subtle px-4 py-2 rounded-full text-sm font-medium interactive flex items-center space-x-2">
                        <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                        <span>Report</span>
                      </div>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <button className="lg:hidden p-2 glass-subtle rounded-xl interactive">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content with Enhanced Spacing */}
            <main className="container mx-auto px-6 lg:px-8 py-12">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>

            {/* Premium Footer */}
            <footer className="border-t border-border/30 glass-subtle mt-24">
              <div className="container mx-auto px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
                    <div className="text-sm text-muted-foreground font-medium">
                      © 2024 ScholarLens. Powered by AI for academic research excellence.
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>Trusted by researchers worldwide</span>
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      <span>2.5M+ papers indexed</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <span className="text-xs text-muted-foreground font-medium">Data Sources:</span>
                    <div className="flex space-x-3">
                      {[
                        { name: 'arXiv', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
                        { name: 'Crossref', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
                        { name: 'Semantic Scholar', color: 'bg-violet-500/20 text-violet-400 border-violet-500/30' }
                      ].map((source) => (
                        <span 
                          key={source.name} 
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border interactive ${source.color}`}
                        >
                          {source.name}
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
