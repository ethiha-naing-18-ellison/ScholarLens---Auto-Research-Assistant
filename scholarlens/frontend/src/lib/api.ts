import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// API endpoints
export const searchApi = {
  search: (params: SearchParams) => 
    api.post('/api/search', params),
  
  ingest: (paperIds: string[]) => 
    api.post('/api/ingest', { paperIds }),
  
  summarize: (params: SummarizeParams) => 
    api.post('/api/summarize', params),
  
  generateReport: (params: ReportParams) => 
    api.post('/api/report', params),
  
  getReport: (reportId: string) => 
    api.get(`/api/report/${reportId}`),
  
  downloadReport: (reportId: string) => 
    api.get(`/api/report/${reportId}.pdf`, { responseType: 'blob' }),
}

// Types
export interface SearchParams {
  query: string
  yearFrom?: number
  yearTo?: number
  limit?: number
  language?: string
  openAccessOnly?: boolean
}

export interface SummarizeParams {
  paperIds: string[]
  summaryStyle?: 'technical' | 'executive'
  language?: string
  maxTokensPerPaper?: number
}

export interface ReportParams {
  topic: string
  paperIds?: string[]
  k?: number
  sections?: string[]
  charts?: string[]
  language?: string
  branding?: {
    logoUrl?: string
    brandName?: string
  }
}

export interface SearchResult {
  id: string
  source: string
  title: string
  authors: Array<{ name: string; affiliation?: string }>
  abstract: string
  doi?: string
  url?: string
  pdfUrl?: string
  year?: number
  venue?: string
  isOpenAccess: boolean
  score: number
}

export interface Report {
  id: string
  status: string
  pdfUrl?: string
  htmlPath?: string
  createdAt: string
}
