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
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative">
        <div className="text-center space-y-8 py-12">
          {/* Main Headlines */}
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              AI-Powered Research Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              <span className="text-gradient">Academic Research</span>
              <br />
              <span className="text-foreground">Made Simple</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Search millions of academic papers, extract insights with AI, and generate 
              comprehensive research reports in minutes.
            </p>
          </div>

          {/* Feature Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass p-6 rounded-2xl card-hover">
              <div className="text-3xl font-bold text-gradient">2.5M+</div>
              <div className="text-muted-foreground">Academic Papers</div>
            </div>
            <div className="glass p-6 rounded-2xl card-hover">
              <div className="text-3xl font-bold text-gradient">3</div>
              <div className="text-muted-foreground">Data Sources</div>
            </div>
            <div className="glass p-6 rounded-2xl card-hover">
              <div className="text-3xl font-bold text-gradient">AI</div>
              <div className="text-muted-foreground">Powered Analysis</div>
            </div>
          </div>

          {/* Quick Start Examples */}
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">Try searching for:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'machine learning healthcare',
                'climate change mitigation',
                'quantum computing',
                'artificial intelligence ethics'
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => handleSearch(example, { yearFrom: 2020, yearTo: 2024, limit: 25 })}
                  className="px-4 py-2 bg-muted/50 hover:bg-muted text-sm rounded-full transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="glass border-l-4 border-destructive p-6 rounded-xl fade-in">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-destructive">Search Error</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {error.message || 'Something went wrong. Please try again.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {results && (
        <div className="fade-in">
          <SearchResults 
            results={results} 
            query={searchQuery}
            onSelectPapers={(paperIds) => {
              // TODO: Navigate to report generation
              console.log('Selected papers:', paperIds)
            }}
          />
        </div>
      )}

      {/* No Search Yet State */}
      {!results && !isLoading && !error && (
        <div className="text-center py-12 space-y-6">
          <div className="w-24 h-24 mx-auto gradient-primary rounded-full flex items-center justify-center glow">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">Ready to discover research</h3>
            <p className="text-muted-foreground">
              Enter your research topic above to search millions of academic papers
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
