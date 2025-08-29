import { useMutation } from '@tanstack/react-query'
import { searchApi, SearchParams, SearchResult } from '@/lib/api'

export function useSearch() {
  return useMutation<SearchResult[], Error, SearchParams>({
    mutationFn: async (params: SearchParams) => {
      const response = await searchApi.search(params)
      // Backend returns { Results: [...], Metadata: {...} }
      return response.data.results || response.data
    },
    onError: (error) => {
      console.error('Search failed:', error)
    },
  })
}
