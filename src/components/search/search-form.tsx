'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SearchFormProps {
  onSearch: (query: string, filters: any) => void
  isLoading?: boolean
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [query, setQuery] = useState('')
  const [yearFrom, setYearFrom] = useState<number | undefined>(2020)
  const [yearTo, setYearTo] = useState<number | undefined>(2024)
  const [limit, setLimit] = useState(25)
  const [openAccessOnly, setOpenAccessOnly] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    onSearch(query, {
      yearFrom,
      yearTo,
      limit,
      openAccessOnly,
      language: 'en',
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card-modern relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-48 h-48 gradient-mesh rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 gradient-mesh rounded-full blur-3xl opacity-20"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="relative p-12">
          {/* Main Search Input */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center glow-subtle">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <Label htmlFor="query" className="text-2xl font-bold heading gradient-text">Research Topic</Label>
              </div>
              
              <div className="relative group">
                <Input
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., machine learning in healthcare, quantum computing, climate change mitigation..."
                  className="h-20 text-xl pl-12 pr-20 rounded-2xl border-border/60 bg-background/80 backdrop-blur-sm focus:bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300 group-hover:border-primary/30 input-modern"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
                  <kbd className="px-4 py-2 text-sm bg-muted/60 rounded-xl border border-border/40 font-mono">Enter</kbd>
                </div>
                
                {/* Search suggestions indicator */}
                {query.length > 2 && (
                  <div className="absolute left-12 -bottom-8 flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span>AI suggestions available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="group flex items-center space-x-4 px-6 py-3 glass-subtle rounded-xl hover:glass-strong transition-all duration-300 interactive"
              >
                <svg 
                  className={`w-6 h-6 transition-transform duration-300 text-primary ${showAdvanced ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="font-medium group-hover:text-primary transition-colors">Advanced Filters</span>
                {(yearFrom || yearTo || openAccessOnly || limit !== 25) && (
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                )}
              </button>
              
              {/* Quick Stats */}
              <div className="hidden lg:flex items-center space-x-6">
                <span className="text-sm text-muted-foreground font-medium">Sources:</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-4 py-2 glass-subtle rounded-xl">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm font-medium">arXiv</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 glass-subtle rounded-xl">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-sm font-medium">Crossref</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 glass-subtle rounded-xl">
                    <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                    <span className="text-sm font-medium">Semantic Scholar</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showAdvanced && (
              <div className="fade-in space-y-8 p-8 glass-subtle rounded-2xl border border-border/30 relative overflow-hidden">
                {/* Panel decoration */}
                <div className="absolute -top-12 -right-12 w-24 h-24 gradient-mesh rounded-full blur-2xl opacity-10"></div>
                
                <div className="relative">
                  <h3 className="text-xl font-semibold heading gradient-text mb-8">Advanced Search Options</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Year Range */}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span>Publication Year</span>
                      </Label>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="yearFrom" className="text-sm text-muted-foreground font-medium">From Year</Label>
                            <Input
                              id="yearFrom"
                              type="number"
                              value={yearFrom || ''}
                              onChange={(e) => setYearFrom(e.target.value ? parseInt(e.target.value) : undefined)}
                              placeholder="2020"
                              className="input-modern h-14"
                              min={1900}
                              max={2025}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="yearTo" className="text-sm text-muted-foreground font-medium">To Year</Label>
                            <Input
                              id="yearTo"
                              type="number"
                              value={yearTo || ''}
                              onChange={(e) => setYearTo(e.target.value ? parseInt(e.target.value) : undefined)}
                              placeholder="2024"
                              className="input-modern h-14"
                              min={1900}
                              max={2025}
                            />
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Filter papers published between these years
                        </div>
                      </div>
                    </div>

                    {/* Results Limit */}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold flex items-center space-x-3">
                        <div className="w-8 h-8 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                          </svg>
                        </div>
                        <span>Max Results</span>
                      </Label>
                      <div className="space-y-4">
                        <Input
                          id="limit"
                          type="number"
                          value={limit}
                          onChange={(e) => setLimit(parseInt(e.target.value) || 25)}
                          min={5}
                          max={100}
                          className="input-modern h-14"
                        />
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>5-100 papers</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-primary font-medium">{limit}</span>
                            <span>selected</span>
                          </div>
                        </div>
                      </div>
                    </div>

                                         {/* Access Type */}
                     <div className="space-y-4">
                       <Label className="text-base font-semibold flex items-center space-x-3">
                         <div className="w-8 h-8 bg-violet-500/20 rounded-xl flex items-center justify-center">
                           <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                           </svg>
                         </div>
                         <span>Access Type</span>
                       </Label>
                       <label className="group flex items-center space-x-4 p-6 rounded-xl bg-background/70 border border-border/40 cursor-pointer hover:bg-background/90 hover:border-primary/30 transition-all duration-300 interactive">
                         <input
                           id="openAccess"
                           type="checkbox"
                           checked={openAccessOnly}
                           onChange={(e) => setOpenAccessOnly(e.target.checked)}
                           className="w-6 h-6 text-primary bg-background border-border rounded-lg focus:ring-primary focus:ring-2 transition-all"
                         />
                         <div className="flex-1 space-y-2">
                           <div className="text-base font-medium group-hover:text-foreground transition-colors">Open Access Only</div>
                           <div className="text-sm text-muted-foreground">Include only free-to-read papers</div>
                         </div>
                         <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-500/20 rounded-xl">
                           <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                           <span className="text-sm text-emerald-400 font-medium">Free</span>
                         </div>
                       </label>
                     </div>
                   </div>
                 </div>
               </div>
             )}

            {/* Search Button */}
            <div className="relative">
              <Button 
                type="submit" 
                disabled={isLoading || !query.trim()}
                className="w-full h-20 text-xl font-bold rounded-2xl gradient-primary hover:glow-hover transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                {/* Button shimmer effect */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {isLoading ? (
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <span>Searching Academic Papers...</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="group-hover:tracking-wider transition-all duration-300">Search Academic Papers</span>
                      <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </div>
              </Button>
              
              {/* Search stats below button */}
              {!isLoading && (
                <div className="flex items-center justify-center space-x-8 mt-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>2.5M+ papers indexed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>AI-powered insights</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Real-time results</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
