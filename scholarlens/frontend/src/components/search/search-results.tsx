'use client'

import { useState } from 'react'
import { SearchResult } from '@/lib/api'
import { Button } from '@/components/ui/button'

interface SearchResultsProps {
  results: SearchResult[]
  query: string
  onSelectPapers: (paperIds: string[]) => void
}

export function SearchResults({ results, query, onSelectPapers }: SearchResultsProps) {
  const [selectedPapers, setSelectedPapers] = useState<Set<string>>(new Set())

  const togglePaper = (paperId: string) => {
    const newSelected = new Set(selectedPapers)
    if (newSelected.has(paperId)) {
      newSelected.delete(paperId)
    } else {
      newSelected.add(paperId)
    }
    setSelectedPapers(newSelected)
  }

  const selectAll = () => {
    setSelectedPapers(new Set(results.map(p => p.id)))
  }

  const clearSelection = () => {
    setSelectedPapers(new Set())
  }

  const handleGenerateReport = () => {
    onSelectPapers(Array.from(selectedPapers))
  }

  const getSourceColor = (source: string) => {
    switch (source.toLowerCase()) {
      case 'arxiv': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'crossref': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'semantic': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  if (!results.length) {
    return (
      <div className="text-center py-16 space-y-6">
        <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29.82-5.877 2.172M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.875a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z" />
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">No papers found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Try adjusting your search terms, expanding the year range, or removing the open access filter
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Results Header */}
      <div className="glass p-6 rounded-2xl border border-border/40">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">
              Search Results for <span className="text-gradient">"{query}"</span>
            </h2>
            <p className="text-muted-foreground">
              Found {results.length} academic papers • {selectedPapers.size} selected
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Selection Controls */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={selectAll}
                className="text-xs"
              >
                Select All
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearSelection}
                disabled={selectedPapers.size === 0}
                className="text-xs"
              >
                Clear
              </Button>
            </div>

            {/* Generate Report Button */}
            <Button 
              onClick={handleGenerateReport}
              disabled={selectedPapers.size === 0}
              className="gradient-primary glow-hover"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generate Report ({selectedPapers.size})
            </Button>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="grid gap-6">
        {results.map((paper, index) => (
          <div
            key={paper.id}
            className={`group relative glass p-6 rounded-2xl border border-border/40 cursor-pointer card-hover transition-all duration-300 ${
              selectedPapers.has(paper.id)
                ? 'ring-2 ring-primary border-primary/50 bg-primary/5'
                : 'hover:border-border/60'
            }`}
            onClick={() => togglePaper(paper.id)}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Selection Checkbox */}
            <div className="absolute top-4 right-4">
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                selectedPapers.has(paper.id) 
                  ? 'bg-primary border-primary' 
                  : 'border-border group-hover:border-primary/50'
              }`}>
                {selectedPapers.has(paper.id) && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>

            {/* Paper Content */}
            <div className="space-y-4 pr-8">
              {/* Title */}
              <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {paper.title}
              </h3>

              {/* Authors and Metadata */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="line-clamp-1">
                    {paper.authors.slice(0, 3).map(a => a.name).join(', ')}
                    {paper.authors.length > 3 && ` +${paper.authors.length - 3} more`}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  {paper.year && (
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{paper.year}</span>
                    </div>
                  )}
                  {paper.venue && (
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="line-clamp-1">{paper.venue}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags and Badges */}
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getSourceColor(paper.source)}`}>
                  {paper.source}
                </span>
                
                {paper.isOpenAccess && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                    Open Access
                  </span>
                )}

                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                  {(paper.score * 100).toFixed(0)}% relevance
                </span>
              </div>

              {/* Abstract */}
              {paper.abstract && (
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {paper.abstract}
                </p>
              )}

              {/* Action Links */}
              <div className="flex items-center space-x-4 pt-2">
                {paper.url && (
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-primary hover:text-primary/80 flex items-center space-x-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>View Paper</span>
                  </a>
                )}
                
                {paper.pdfUrl && (
                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-primary hover:text-primary/80 flex items-center space-x-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>PDF</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}