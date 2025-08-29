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
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="query" className="text-sm font-medium">Research Topic</Label>
          <div className="relative">
            <Input
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., machine learning in healthcare, quantum computing..."
              className=""
              required
            />

          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground"
          >

            <span>Advanced Filters</span>
            {(yearFrom || yearTo || openAccessOnly || limit !== 25) && (
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            )}
          </button>
          
          <div className="hidden sm:flex items-center space-x-2 text-xs text-muted-foreground">
            <span>Sources:</span>
            <span className="px-2 py-1 bg-muted rounded">arXiv</span>
            <span className="px-2 py-1 bg-muted rounded">Crossref</span>
            <span className="px-2 py-1 bg-muted rounded">Semantic Scholar</span>
          </div>
        </div>

        {showAdvanced && (
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Publication Year</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    value={yearFrom || ''}
                    onChange={(e) => setYearFrom(e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="From"
                    min={1900}
                    max={2025}
                  />
                  <Input
                    type="number"
                    value={yearTo || ''}
                    onChange={(e) => setYearTo(e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="To"
                    min={1900}
                    max={2025}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Max Results</Label>
                <Input
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(parseInt(e.target.value) || 25)}
                  min={5}
                  max={100}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Access Type</Label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={openAccessOnly}
                    onChange={(e) => setOpenAccessOnly(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Open Access Only</span>
                </label>
              </div>
            </div>
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isLoading || !query.trim()}
          className="w-full"
        >
{isLoading ? 'Searching...' : 'Search Papers'}
        </Button>
      </form>
    </div>
  )
}