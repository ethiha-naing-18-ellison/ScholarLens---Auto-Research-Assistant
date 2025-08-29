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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

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
      case 'crossref': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'semantic': return 'bg-violet-500/20 text-violet-400 border-violet-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  if (!results.length) {
    return (
      <section className="text-center py-20 space-y-8">
        <div className="w-20 h-20 mx-auto bg-muted/50 rounded-2xl flex items-center justify-center">
          <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29.82-5.877 2.172M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.875a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z" />
          </svg>
        </div>
        <div className="space-y-4">
          <h3 className="text-3xl font-bold heading gradient-text">No papers found</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Try adjusting your search terms, expanding the year range, or removing the open access filter
          </p>
        </div>
      </section>
    )
  }

  return (
    <div className="space-y-12">
      {/* Results Header */}
      <div className="card-modern relative overflow-hidden">
        {/* Header decoration */}
        <div className="absolute -top-16 -right-16 w-32 h-32 gradient-mesh rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center glow-subtle">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold heading">
                  Search Results for <span className="gradient-text">"{query}"</span>
                </h2>
              </div>
              <div className="flex items-center space-x-8 text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-semibold text-lg">{results.length} papers found</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold text-lg">{selectedPapers.size} selected</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              {/* View Mode Toggle */}
              <div className="flex items-center glass-subtle rounded-2xl p-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>

              {/* Selection Controls */}
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={selectAll}
                  className="px-6 py-3 rounded-xl border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Select All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearSelection}
                  disabled={selectedPapers.size === 0}
                  className="px-6 py-3 rounded-xl border-border/50 hover:border-destructive/50 hover:bg-destructive/10 transition-all duration-300 disabled:opacity-50"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </Button>
              </div>

              {/* Generate Report Button */}
              <Button 
                onClick={handleGenerateReport}
                disabled={selectedPapers.size === 0}
                className="px-8 py-3 rounded-2xl gradient-primary hover:glow-hover transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center space-x-3">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-semibold text-lg">Generate Report</span>
                  {selectedPapers.size > 0 && (
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                      {selectedPapers.size}
                    </span>
                  )}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid/List */}
      <div className={`grid gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
        {results.map((paper, index) => (
          <div
            key={paper.id}
            className={`group relative card-modern cursor-pointer card-interactive transition-all duration-500 fade-in ${
              selectedPapers.has(paper.id)
                ? 'ring-2 ring-primary border-primary/50 bg-primary/10 glow-subtle'
                : 'border-border/40 hover:border-border/70'
            }`}
            onClick={() => togglePaper(paper.id)}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Selection Checkbox */}
            <div className="absolute top-6 right-6 z-10">
              <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                selectedPapers.has(paper.id) 
                  ? 'bg-primary border-primary shadow-lg shadow-primary/30 glow-subtle' 
                  : 'border-border/60 bg-background/50 backdrop-blur-sm group-hover:border-primary/50 group-hover:bg-primary/10'
              }`}>
                {selectedPapers.has(paper.id) && (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>

            {/* Paper Content */}
            <div className="space-y-6 pr-12">
              {/* Title */}
              <h3 className="font-bold text-2xl leading-tight line-clamp-3 group-hover:text-primary transition-colors duration-300 heading">
                {paper.title}
              </h3>

              {/* Authors and Metadata */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-base text-muted-foreground line-clamp-1 font-medium">
                    {paper.authors.slice(0, 3).map(a => a.name).join(', ')}
                    {paper.authors.length > 3 && (
                      <span className="text-primary font-semibold"> +{paper.authors.length - 3} more</span>
                    )}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-base text-muted-foreground">
                  {paper.year && (
                    <div className="flex items-center space-x-2 px-4 py-2 glass-subtle rounded-xl">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">{paper.year}</span>
                    </div>
                  )}
                  {paper.venue && (
                    <div className="flex items-center space-x-2 px-4 py-2 glass-subtle rounded-xl">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="font-medium line-clamp-1">{paper.venue}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags and Badges */}
              <div className="flex flex-wrap gap-3">
                <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-300 hover:scale-105 ${getSourceColor(paper.source)}`}>
                  {paper.source}
                </span>
                
                {paper.isOpenAccess && (
                  <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all duration-300 hover:scale-105">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                    Open Access
                  </span>
                )}

                <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-primary/20 text-primary border border-primary/30 transition-all duration-300 hover:scale-105">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {(paper.score * 100).toFixed(0)}% match
                </span>
              </div>

              {/* Abstract */}
              {paper.abstract && (
                <div className="glass-subtle p-6 rounded-2xl border border-border/30">
                  <p className="text-base text-muted-foreground line-clamp-4 leading-relaxed">
                    {paper.abstract}
                  </p>
                </div>
              )}

              {/* Action Links */}
              <div className="flex items-center space-x-4 pt-4">
                {paper.url && (
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="group flex items-center space-x-2 px-4 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-sm font-medium transition-all duration-300 interactive"
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="group flex items-center space-x-2 px-4 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl text-sm font-medium transition-all duration-300 interactive"
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download PDF</span>
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
