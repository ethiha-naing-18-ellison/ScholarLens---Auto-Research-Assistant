'use client'

import { useState } from 'react'
import SearchForm from '../components/search/search-form'
import SearchResults from '../components/search/search-results'
import { searchApi, SearchResult } from '../lib/api'

interface SearchParams {
  sources?: string[]
  year?: string
  authors?: string
}

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (query: string, params: SearchParams) => {
    if (!query.trim()) return
    
    setIsLoading(true)
    setHasSearched(true)
    setError(null)
    
    try {
      // Prepare search parameters for the API
      const searchParams = {
        query: query.trim(),
        limit: 20,
        ...(params.year && params.year !== '' && { 
          yearFrom: parseInt(params.year),
          yearTo: parseInt(params.year)
        })
      }

      console.log('Searching with params:', searchParams)
      console.log('API URL:', 'http://localhost:5182/api/Search')
      
      const response = await searchApi.search(searchParams)
      console.log('API Response:', response)
      
      if (response.data && response.data.results) {
        // Transform the API response to match our SearchResult interface
        const transformedResults = response.data.results.map((paper: any) => ({
          id: paper.id || `${Date.now()}-${Math.random()}`,
          title: paper.title || 'Untitled',
          authors: Array.isArray(paper.authors) 
            ? paper.authors.map((author: any) => typeof author === 'string' ? author : author.name || 'Unknown Author')
            : ['Unknown Author'],
          abstract: paper.abstract || 'No abstract available',
          source: paper.source || 'Unknown',
          year: paper.year || new Date().getFullYear(),
          citations: paper.citations || 0,
          url: paper.url || paper.pdfUrl || '#'
        }))
        
        setSearchResults(transformedResults)
        console.log(`Found ${transformedResults.length} papers`)
      } else {
        setSearchResults([])
        console.log('No results in response')
      }
    } catch (error: any) {
      console.error('Search failed:', error)
      setError(error.response?.data?.message || error.message || 'Search failed. Please try again.')
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      {/* Hero + Search Section - Unified Container */}
      <section className="page-container hero-spacing bg-gray-900">
        {/* Hero Block */}
        <div className="text-cap">
          <h1 className="hero-title">Search Academic Papers with AI Intelligence</h1>
          <p className="hero-subtitle">
            Discover groundbreaking research, extract insights, and generate comprehensive reports with cutting-edge AI.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn-primary">Get Started Free</button>
            <button className="btn-secondary">View Features</button>
          </div>
        </div>

        {/* Search Block - 40px spacing from hero CTAs */}
        <div className="mt-10">
          <div className="text-cap">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">Try AI-Powered Search</h2>
                <p className="text-gray-400">Enter your research topic and let AI find the most relevant papers</p>
              </div>
              <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {hasSearched && (
        <section className="page-container py-8 bg-gray-900">
          <div className="text-cap">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <p className="text-gray-400 mt-4">AI is analyzing millions of papers...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6 max-w-md mx-auto">
                  <div className="text-4xl mb-4">⚠️</div>
                  <h3 className="text-xl font-semibold text-white mb-3">Search Error</h3>
                  <p className="text-red-400">{error}</p>
                  <p className="text-gray-400 mt-2 text-sm">Make sure your backend server is running on port 5182</p>
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <SearchResults results={searchResults} />
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md mx-auto">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-white mb-3">No Papers Found</h3>
                  <p className="text-gray-400">No results found. Try different keywords or adjust your search filters.</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Features Section - 64px spacing from search */}
      <section id="features" className="page-container large-section-spacing bg-gray-900">
        <div className="text-cap">
          <h2 className="section-title">Powerful AI Features</h2>
          <p className="section-subtitle">Everything you need to accelerate your research</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="feature-card">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-3">Smart Analytics</h3>
            <p className="text-gray-400">Discover trends, connections, and insights across millions of research papers.</p>
          </div>
          
          <div className="feature-card">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-white mb-3">Research Library</h3>
            <p className="text-gray-400">Save, organize, and annotate papers in your personal research library.</p>
          </div>
          
          <div className="feature-card">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-3">Real-time Updates</h3>
            <p className="text-gray-400">Get automated recommendations for the latest research in your field.</p>
          </div>
          
          <div className="feature-card">
            <div className="text-4xl mb-4">🔌</div>
            <h3 className="text-xl font-semibold text-white mb-3">API Integration</h3>
            <p className="text-gray-400">Integrate with your workflow using our powerful REST API and tools.</p>
          </div>
        </div>
      </section>



      {/* About / Mission Section */}
      <section id="about" className="page-container large-section-spacing bg-gray-900">
        <h2 className="section-title text-white">Our Mission</h2>
        <p className="section-subtitle text-gray-400">Democratizing access to academic knowledge through AI</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="mission-card text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-white mb-3">Mission</h3>
            <p className="text-gray-400">Democratizing academic knowledge through AI-powered research tools.</p>
          </div>
          
          <div className="mission-card text-center">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-lg font-semibold text-white mb-3">Vision</h3>
            <p className="text-gray-400">A world where every researcher has instant access to relevant insights.</p>
          </div>
          
          <div className="mission-card text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-lg font-semibold text-white mb-3">Values</h3>
            <p className="text-gray-400">Innovation, accessibility, accuracy, and empowerment of researchers.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="page-container large-section-spacing bg-gray-900">
        <div className="text-center">
          <h2 className="section-title text-white">Get in Touch</h2>
          <p className="section-subtitle text-gray-400">Ready to revolutionize your research workflow?</p>
          
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="mission-card text-center">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-lg font-semibold text-white mb-3">Email Support</h3>
                <p className="text-gray-400 mb-4">Get help from our research experts</p>
                <a href="mailto:support@scholarlens.ai" className="text-blue-400 hover:text-blue-300">
                  support@scholarlens.ai
                </a>
              </div>
              
              <div className="mission-card text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-lg font-semibold text-white mb-3">Live Chat</h3>
                <p className="text-gray-400 mb-4">Chat with us during business hours</p>
                <button className="btn-primary">Start Chat</button>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 mb-6">
                Join thousands of researchers already using ScholarLens to accelerate their work
              </p>
              <button className="btn-primary px-8 py-4 text-lg">Get Started Today</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}