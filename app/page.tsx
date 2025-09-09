'use client'

import { useState } from 'react'

interface SearchResult {
  id: string
  title: string
  authors: { name: string }[]
  abstract: string
  source: string
  year: number
  url: string
  score: number
}

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('http://localhost:5182/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query.trim(),
          limit: 20
        })
      })

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`)
      }

      const data = await response.json()
      setResults(data.results || [])
    } catch (err) {
      console.error('Search error:', err)
      setError('Search failed. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          ScholarLens
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search academic papers..."
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
            required
          />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Found {results.length} papers
            </h2>
            <div className="space-y-4">
              {results.map((result) => (
                <div key={result.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-900 mb-2">{result.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {result.authors.map(a => a.name).join(', ')} • {result.year} • {result.source}
                  </p>
                  <p className="text-sm text-gray-700">{result.abstract}</p>
                  {result.url && (
                    <a 
                      href={result.url} 
                      target="_blank" 
                      className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Paper →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}