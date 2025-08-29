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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              AI Research Assistant
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Search Academic Papers with AI
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find relevant research papers, extract insights, and generate comprehensive reports quickly.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">2.5M+</div>
              <div className="text-sm text-muted-foreground">Papers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Sources</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">AI</div>
              <div className="text-sm text-muted-foreground">Powered</div>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-3">Try searching for:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'machine learning healthcare',
                'climate change mitigation', 
                'quantum computing',
                'AI ethics'
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => handleSearch(example, { yearFrom: 2020, yearTo: 2024, limit: 25 })}
                  className="px-3 py-1 bg-muted hover:bg-muted/70 rounded-full text-sm transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="mb-8">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-8">
            <div>
              <h3 className="font-semibold text-destructive mb-1">Search Error</h3>
              <p className="text-muted-foreground">
                {error.message || 'Something went wrong while searching. Please try again.'}
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div>
            <SearchResults 
              results={results} 
              query={searchQuery}
              onSelectPapers={(paperIds) => {
                console.log('Selected papers:', paperIds)
              }}
            />
          </div>
        )}

        {/* No Search State */}
        {!results && !isLoading && !error && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">Ready to Search</h3>
            <p className="text-muted-foreground">
              Enter your research topic above to find relevant academic papers
            </p>
          </div>
        )}
      </div>
    </div>
  )
}