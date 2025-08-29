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
      case 'crossref': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'semantic': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  if (!results.length) {
    return (
      <div className="text-center py-16 space-y-6">
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
    <div className="space-y-10">
      {/* Enhanced Results Header */}
      <div className="glass-strong p-8 rounded-3xl border border-border/30 relative overflow-hidden">
        {/* Header decoration */}
        <div className="absolute -top-16 -right-16 w-32 h-32 gradient-mesh rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <h2 className="text-3xl font-bold heading">
                Search Results for <span className="text-gradient">"{query}"</span>
              </h2>
            </div>
            <div className="flex items-center space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{results.length} papers found</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{selectedPapers.size} selected</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center glass-subtle rounded-2xl p-1.5">
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                Grid
              </button>
            </div>

            {/* Selection Controls */}
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={selectAll}
                className="px-4 py-2 rounded-xl border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
              >
                Select All
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearSelection}
                disabled={selectedPapers.size === 0}
                className="px-4 py-2 rounded-xl border-border/50 hover:border-destructive/50 hover:bg-destructive/10 transition-all duration-300 disabled:opacity-50"
              >
                Clear
              </Button>
            </div>

            {/* Generate Report Button */}
            <Button 
              onClick={handleGenerateReport}
              disabled={selectedPapers.size === 0}
              className="px-6 py-3 rounded-2xl gradient-primary hover:glow-hover transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <div className="relative flex items-center space-x-3">
                <span className="font-semibold">Generate Report</span>
                {selectedPapers.size > 0 && (
                  <span className="px-2 py-1 bg-white/20 rounded-full text-sm font-medium">
                    {selectedPapers.size}
                  </span>
                )}
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Results Grid/List */}
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
        {results.map((paper, index) => (
          <div
            key={paper.id}
            className={`group relative glass-strong p-8 rounded-3xl border cursor-pointer card-interactive transition-all duration-500 fade-in ${
              selectedPapers.has(paper.id)
                ? 'ring-2 ring-primary border-primary/50 bg-primary/10 glow-subtle'
                : 'border-border/40 hover:border-border/70'
            }`}
            onClick={() => togglePaper(paper.id)}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Selection Checkbox */}
            <div className="absolute top-6 right-6 z-10">
              <div className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                selectedPapers.has(paper.id) 
                  ? 'bg-primary border-primary shadow-lg shadow-primary/30 glow-subtle' 
                  : 'border-border/60 bg-background/50 backdrop-blur-sm group-hover:border-primary/50 group-hover:bg-primary/10'
              }`}>
                {selectedPapers.has(paper.id) && (
                  <span className="text-white text-sm font-bold">✓</span>
                )}
              </div>
            </div>

            {/* Enhanced Paper Content */}
            <div className="space-y-6 pr-10">
              {/* Title */}
              <h3 className="font-bold text-xl leading-tight line-clamp-3 group-hover:text-primary transition-colors duration-300 heading">
                {paper.title}
              </h3>

              {/* Authors and Metadata */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground line-clamp-1 font-medium">
                    {paper.authors.slice(0, 3).map(a => a.name).join(', ')}
                    {paper.authors.length > 3 && (
                      <span className="text-primary font-semibold"> +{paper.authors.length - 3} more</span>
                    )}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {paper.year && (
                    <div className="flex items-center space-x-2 px-3 py-1 glass-subtle rounded-full">
                      <span className="font-medium">{paper.year}</span>
                    </div>
                  )}
                  {paper.venue && (
                    <div className="flex items-center space-x-2 px-3 py-1 glass-subtle rounded-full">
                      <span className="font-medium line-clamp-1">{paper.venue}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags and Badges */}
              <div className="flex flex-wrap gap-3">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 hover:scale-105 ${getSourceColor(paper.source)}`}>
                  {paper.source}
                </span>
                
                {paper.isOpenAccess && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all duration-300 hover:scale-105">
                    Open Access
                  </span>
                )}

                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30 transition-all duration-300 hover:scale-105">
                  {(paper.score * 100).toFixed(0)}% match
                </span>
              </div>

              {/* Enhanced Abstract */}
              {paper.abstract && (
                <div className="glass-subtle p-4 rounded-2xl border border-border/30">
                  <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">
                    {paper.abstract}
                  </p>
                </div>
              )}

              {/* Action Links */}
              <div className="flex items-center space-x-4 pt-2">
                {paper.url && (
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="group flex items-center space-x-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-xs font-medium transition-all duration-300 interactive"
                  >
                    <span>View Paper</span>
                  </a>
                )}
                
                {paper.pdfUrl && (
                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="group flex items-center space-x-2 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl text-xs font-medium transition-all duration-300 interactive"
                  >
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
