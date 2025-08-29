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
            {/* Modern Header */}
            <header className="sticky top-0 z-50 glass-strong border-b border-border/30 backdrop-blur-xl">
              <div className="container mx-auto px-4 lg:px-6">
                <div className="flex h-20 items-center justify-between">
                  {/* Logo and Brand */}
                  <div className="flex items-center space-x-4">
                    <div className="relative group">
                      <div className="gradient-primary w-10 h-10 rounded-2xl flex items-center justify-center glow-subtle group-hover:glow transition-all duration-300">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-1">
                      <h1 className="text-xl font-bold gradient-text heading">
                        {process.env.NEXT_PUBLIC_BRAND_NAME || 'ScholarLens'}
                      </h1>
                      <p className="text-xs text-muted-foreground font-medium">AI Research Assistant</p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center space-x-6">
                    {/* Status Indicator */}
                    <div className="hidden sm:flex items-center space-x-3 glass-subtle px-4 py-2 rounded-xl">
                      <div className="status-dot status-online"></div>
                      <span className="text-sm font-medium text-muted-foreground">Connected</span>
                    </div>
                    
                    {/* Feature Navigation */}
                    <nav className="hidden md:flex items-center space-x-2">
                      <div className="glass-subtle px-4 py-2 rounded-xl text-sm font-medium interactive flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>Search</span>
                      </div>
                      <div className="glass-subtle px-4 py-2 rounded-xl text-sm font-medium interactive flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span>Analyze</span>
                      </div>
                      <div className="glass-subtle px-4 py-2 rounded-xl text-sm font-medium interactive flex items-center space-x-2">
                        <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                        <span>Report</span>
                      </div>
                    </nav>
                    
                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 glass-subtle rounded-xl interactive">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 lg:px-6 py-8">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>

            {/* Modern Footer */}
            <footer className="border-t border-border/30 glass-subtle mt-20">
              <div className="container mx-auto px-4 lg:px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Brand Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="gradient-primary w-8 h-8 rounded-xl flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold gradient-text">ScholarLens</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Advanced AI-powered research platform helping researchers discover, analyze, and synthesize academic knowledge.
                    </p>
                  </div>

                  {/* Quick Links */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Quick Links</h4>
                    <div className="space-y-2">
                      <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Search Papers</a>
                      <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Generate Reports</a>
                      <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">API Documentation</a>
                      <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Help Center</a>
                    </div>
                  </div>

                  {/* Data Sources */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Data Sources</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>arXiv</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span>Crossref</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                        <span>Semantic Scholar</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border/30 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                  <div className="text-sm text-muted-foreground">
                    © 2024 ScholarLens. All rights reserved.
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Powered by AI</span>
                    <span>•</span>
                    <span>2.5M+ Papers</span>
                    <span>•</span>
                    <span>Real-time Updates</span>
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
