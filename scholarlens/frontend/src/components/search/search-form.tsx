'use client'

import { useState } from 'react'

interface SearchFormProps {
  onSearch: (query: string, params: any) => void
  isLoading: boolean
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [query, setQuery] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [sources, setSources] = useState<string[]>([])
  const [year, setYear] = useState('')
  const [authors, setAuthors] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim() || isLoading) return
    
    const params = {
      sources: sources.length > 0 ? sources : undefined,
      year: year || undefined,
      authors: authors || undefined,
    }
    
    onSearch(query, params)
  }

  const handleSourceChange = (source: string, checked: boolean) => {
    if (checked) {
      setSources([...sources, source])
    } else {
      setSources(sources.filter(s => s !== source))
    }
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-lg">
      <form onSubmit={handleSubmit}>
        {/* Search Input */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-3">
            What would you like to research?
          </label>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., machine learning in healthcare, climate change mitigation..."
              className="w-full bg-gray-700 border border-gray-600 focus:border-blue-500 rounded-lg px-4 py-3 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
              disabled={isLoading}
            />
          </div>
          <p className="mt-2 text-gray-400 text-sm text-center">
            Press Enter or click Search to start your AI-powered research
          </p>
        </div>

        {/* Advanced Options Toggle */}
        <div className="mb-6 text-center">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="inline-flex items-center space-x-2 text-gray-300 hover:text-white font-medium transition-colors bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg border border-gray-600"
          >
            <span>{showAdvanced ? 'Hide' : 'Show'} Advanced Options</span>
            <span className={`transform transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="bg-gray-750 border border-gray-600 rounded-lg p-6 mb-6 space-y-6">
            {/* Data Sources */}
            <div>
              <label className="block text-white font-medium mb-3">Data Sources</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'arxiv', name: 'arXiv', description: 'Preprint repository' },
                  { id: 'crossref', name: 'Crossref', description: 'Published papers' },
                  { id: 'semantic_scholar', name: 'Semantic Scholar', description: 'Academic database' }
                ].map((source) => (
                  <label key={source.id} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sources.includes(source.id)}
                      onChange={(e) => handleSourceChange(source.id, e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                    />
                    <div>
                      <div className="text-white font-medium">{source.name}</div>
                      <div className="text-gray-400 text-sm">{source.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Year Filter */}
            <div>
              <label htmlFor="year" className="block text-white font-medium mb-3">
                Publication Year
              </label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 focus:border-blue-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="">Any year</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="older">Before 2018</option>
              </select>
            </div>

            {/* Authors Filter */}
            <div>
              <label htmlFor="authors" className="block text-white font-medium mb-3">
                Authors (optional)
              </label>
              <input
                type="text"
                id="authors"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                placeholder="e.g., John Smith, Jane Doe"
                className="w-full bg-gray-700 border border-gray-600 focus:border-blue-500 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
          </div>
        )}

        {/* Search Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="btn-primary px-12 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Searching...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>🔍</span>
                <span>Search with AI</span>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}