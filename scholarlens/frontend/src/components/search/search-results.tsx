'use client'

import { useState } from 'react'

interface SearchResult {
  id: string
  title: string
  authors: string[]
  abstract: string
  source: string
  year: number
  citations: number
  url: string
}

interface SearchResultsProps {
  results: SearchResult[]
}

export default function SearchResults({ results }: SearchResultsProps) {
  const [selectedPapers, setSelectedPapers] = useState<string[]>([])

  const getSourceColor = (source: string) => {
    switch (source.toLowerCase()) {
      case 'arxiv':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'pubmed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'crossref':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const togglePaperSelection = (paperId: string) => {
    setSelectedPapers(prev => 
      prev.includes(paperId) 
        ? prev.filter(id => id !== paperId)
        : [...prev, paperId]
    )
  }

  const selectAllPapers = () => {
    setSelectedPapers(results.map(paper => paper.id))
  }

  const clearSelection = () => {
    setSelectedPapers([])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Search Results</h2>
            <p className="text-gray-400">Found {results.length} relevant papers</p>
          </div>
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg px-3 py-1">
            <span className="text-blue-400 font-medium text-sm">AI Powered</span>
          </div>
        </div>
        
        {selectedPapers.length > 0 && (
          <div className="bg-gray-700 rounded-lg p-4 flex flex-wrap items-center gap-4">
            <span className="text-gray-300 font-medium">
              {selectedPapers.length} papers selected
            </span>
            <button
              onClick={selectAllPapers}
              className="btn-secondary py-2 px-4 text-sm"
            >
              Select All
            </button>
            <button
              onClick={clearSelection}
              className="btn-secondary py-2 px-4 text-sm"
            >
              Clear
            </button>
            <button
              onClick={() => console.log('Generate report for:', selectedPapers)}
              className="btn-primary py-2 px-4 text-sm"
            >
              Generate Report ({selectedPapers.length})
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-4">
        {results.map((paper, index) => (
          <div
            key={paper.id}
            className={`bg-gray-800 border border-gray-700 rounded-xl p-6 transition-all hover:border-blue-500 hover:bg-gray-750 ${
              selectedPapers.includes(paper.id) ? 'ring-2 ring-blue-500/50 border-blue-500' : ''
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedPapers.includes(paper.id)}
                  onChange={() => togglePaperSelection(paper.id)}
                  className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-400 text-sm">#{index + 1}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSourceColor(paper.source)}`}>
                {paper.source}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white mb-3 leading-tight hover:text-blue-400 transition-colors">
              {paper.title}
            </h3>

            {/* Authors */}
            <div className="mb-4">
              <span className="text-blue-400 font-medium text-sm">Authors: </span>
              <span className="text-gray-300">{paper.authors.join(', ')}</span>
            </div>

            {/* Abstract */}
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <h4 className="text-gray-400 font-medium text-sm mb-2">Abstract</h4>
              <p className="text-gray-200 leading-relaxed">
                {paper.abstract}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-700 pt-4">
              <div className="flex items-center space-x-6 text-sm">
                <span className="text-gray-400">
                  <span className="text-green-400">Year:</span> {paper.year}
                </span>
                <span className="text-gray-400">
                  <span className="text-blue-400">Citations:</span> {paper.citations}
                </span>
              </div>
              
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary py-2 px-4 text-sm hover:bg-blue-500 hover:border-blue-500 hover:text-white"
              >
                Read Paper →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {results.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-md mx-auto">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-3">No Papers Found</h3>
            <p className="text-gray-400">
              Try different keywords or adjust your search filters.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}