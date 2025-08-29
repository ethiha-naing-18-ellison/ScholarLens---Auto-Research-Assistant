'use client'

import { useState } from 'react'
import { SearchForm } from '@/components/search/search-form'
import { SearchResults } from '@/components/search/search-results'
import { useSearch } from '@/lib/hooks/use-search'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: results, isLoading, error, mutate: search } = useSearch()

  const handleSearch = (query: string, filters: any) => {
    setSearchQuery(query)
    search({
      query,
      yearFrom: filters.yearFrom,
      yearTo: filters.yearTo,
      limit: filters.limit || 25,
      language: filters.language || 'en',
      openAccessOnly: filters.openAccessOnly || false,
    })
  }

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative py-20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 gradient-mesh rounded-full blur-3xl opacity-30 float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 gradient-mesh rounded-full blur-2xl opacity-20 float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 gradient-mesh rounded-full blur-3xl opacity-10 float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="relative text-center space-y-16">
          {/* Status Badge */}
          <div className="inline-flex items-center px-6 py-3 glass-subtle rounded-full text-sm font-medium space-x-4 mb-8">
            <div className="flex items-center space-x-2">
              <div className="status-dot status-online"></div>
              <span className="text-primary font-semibold">Live</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <span className="text-muted-foreground">AI-Powered Research Platform</span>
          </div>
          
          {/* Main Headlines */}
          <div className="space-y-8 max-w-6xl mx-auto">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold heading text-balance leading-tight">
              <span className="gradient-text block">Academic Research</span>
              <span className="text-foreground/90 block">Made</span>
              <span className="gradient-text block">Effortless</span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed text-balance">
              Discover, analyze, and synthesize academic knowledge with the power of AI. 
              Search millions of papers and generate comprehensive research reports in seconds.
            </p>
          </div>

          {/* Feature Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card-modern card-hover group">
              <div className="space-y-4">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center glow-subtle mx-auto group-hover:glow transition-all duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="text-5xl font-bold gradient-text heading">2.5M+</div>
                <div className="text-muted-foreground font-medium text-lg">Academic Papers</div>
                <div className="text-sm text-muted-foreground">Across all disciplines</div>
              </div>
            </div>
            
            <div className="card-modern card-hover group">
              <div className="space-y-4">
                <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center glow-subtle mx-auto group-hover:glow transition-all duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-5xl font-bold gradient-text heading">3</div>
                <div className="text-muted-foreground font-medium text-lg">Premium Sources</div>
                <div className="text-sm text-muted-foreground">Real-time updates</div>
              </div>
            </div>
            
            <div className="card-modern card-hover group">
              <div className="space-y-4">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center glow-subtle mx-auto group-hover:glow transition-all duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="text-5xl font-bold gradient-text heading">AI</div>
                <div className="text-muted-foreground font-medium text-lg">Powered Analysis</div>
                <div className="text-sm text-muted-foreground">Advanced algorithms</div>
              </div>
            </div>
          </div>

          {/* Quick Start Examples */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground font-medium">Popular Research Topics</p>
              <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                {[
                  { text: 'machine learning healthcare', icon: '🏥' },
                  { text: 'climate change mitigation', icon: '🌍' },
                  { text: 'quantum computing', icon: '⚛️' },
                  { text: 'artificial intelligence ethics', icon: '🤖' },
                  { text: 'renewable energy systems', icon: '⚡' },
                  { text: 'neurological disorders', icon: '🧠' }
                ].map((example) => (
                  <button
                    key={example.text}
                    onClick={() => handleSearch(example.text, { yearFrom: 2020, yearTo: 2024, limit: 25 })}
                    className="group px-6 py-4 glass-subtle hover:glass-strong rounded-2xl text-sm font-medium transition-all duration-300 interactive flex items-center space-x-3"
                  >
                    <span className="text-lg">{example.icon}</span>
                    <span className="group-hover:text-primary transition-colors">{example.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      </section>

      {/* Error Display */}
      {error && (
        <section className="max-w-3xl mx-auto">
          <div className="card-modern border-l-4 border-destructive fade-in">
            <div className="flex items-start space-x-6">
              <div className="w-8 h-8 bg-destructive/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-destructive">Search Error</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {error.message || 'Something went wrong while searching. Please check your connection and try again.'}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="btn-secondary text-destructive hover:bg-destructive/10"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {results && (
        <section className="fade-in">
          <SearchResults 
            results={results} 
            query={searchQuery}
            onSelectPapers={(paperIds) => {
              // TODO: Navigate to report generation
              console.log('Selected papers:', paperIds)
            }}
          />
        </section>
      )}

      {/* No Search Yet State */}
      {!results && !isLoading && !error && (
        <section className="text-center py-20 space-y-8 max-w-3xl mx-auto">
          <div className="relative">
            <div className="w-24 h-24 mx-auto gradient-primary rounded-3xl flex items-center justify-center glow-subtle float">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary/20 rounded-full animate-ping"></div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-3xl font-bold heading gradient-text">Ready to Explore</h3>
            <p className="text-lg text-muted-foreground leading-relaxed text-balance">
              Enter your research topic in the search form above to discover 
              relevant academic papers from millions of publications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="card-modern space-y-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-center">Smart Search</h4>
              <p className="text-sm text-muted-foreground text-center">AI-powered semantic search across millions of papers</p>
            </div>
            
            <div className="card-modern space-y-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-center">Instant Analysis</h4>
              <p className="text-sm text-muted-foreground text-center">Get AI-generated insights and summaries instantly</p>
            </div>
            
            <div className="card-modern space-y-4">
              <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-center">Export Reports</h4>
              <p className="text-sm text-muted-foreground text-center">Generate comprehensive research reports in minutes</p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
