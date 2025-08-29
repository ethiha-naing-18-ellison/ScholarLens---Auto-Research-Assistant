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
  const [yearFrom, setYearFrom] = useState<number | undefined>(2019)
  const [yearTo, setYearTo] = useState<number | undefined>(2025)
  const [limit, setLimit] = useState(25)
  const [openAccessOnly, setOpenAccessOnly] = useState(false)

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
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl border border-border/40 backdrop-blur-xl">
        {/* Main Search Input */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <Label htmlFor="query" className="text-lg font-semibold">Research Topic</Label>
            </div>
            
            <div className="relative">
              <Input
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., machine learning in healthcare, quantum computing, climate change mitigation..."
                className="h-14 text-lg pl-6 pr-12 rounded-2xl border-border/60 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-1 text-xs bg-muted/50 rounded border">⏎</kbd>
              </div>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <div className="space-y-6 p-6 bg-muted/20 rounded-2xl border border-border/40">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Year Range */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Publication Year</span>
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    id="yearFrom"
                    type="number"
                    value={yearFrom || ''}
                    onChange={(e) => setYearFrom(e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="From"
                    className="rounded-xl bg-background/50"
                    min={1900}
                    max={2025}
                  />
                  <Input
                    id="yearTo"
                    type="number"
                    value={yearTo || ''}
                    onChange={(e) => setYearTo(e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="To"
                    className="rounded-xl bg-background/50"
                    min={1900}
                    max={2025}
                  />
                </div>
              </div>

              {/* Results Limit */}
              <div className="space-y-3">
                <Label htmlFor="limit" className="text-sm font-medium flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <span>Max Results</span>
                </Label>
                <Input
                  id="limit"
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(parseInt(e.target.value) || 25)}
                  min={5}
                  max={100}
                  className="rounded-xl bg-background/50"
                />
                <div className="text-xs text-muted-foreground">5-100 papers</div>
              </div>

              {/* Access Type */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  <span>Access Type</span>
                </Label>
                <label className="flex items-center space-x-3 p-3 rounded-xl bg-background/50 border border-border/40 cursor-pointer hover:bg-background/70 transition-colors">
                  <input
                    id="openAccess"
                    type="checkbox"
                    checked={openAccessOnly}
                    onChange={(e) => setOpenAccessOnly(e.target.checked)}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Open Access Only</div>
                    <div className="text-xs text-muted-foreground">Free-to-read papers only</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-400">Free</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <Button 
            type="submit" 
            disabled={isLoading || !query.trim()}
            className="w-full h-14 text-lg font-semibold rounded-2xl gradient-primary hover:glow-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Searching Academic Papers...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search Academic Papers</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
