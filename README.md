# ScholarLens - Auto Research Assistant

A comprehensive full-stack application for automated academic research, paper discovery, text extraction, summarization, and professional report generation.

## 🌟 Features

- **Multi-Source Paper Search**: Automatically searches Crossref, arXiv, Semantic Scholar, and Unpaywall
- **Smart Deduplication**: Removes duplicate papers using DOI matching and title similarity
- **Open Access Focus**: Prioritizes freely accessible papers with PDF extraction
- **AI-Powered Summarization**: Generates structured summaries with key points, methods, results, and limitations
- **Professional Reports**: Creates branded PDF reports with charts, analysis, and references
- **Modern UI**: Responsive Next.js frontend with real-time search and filtering
- **Robust Backend**: ASP.NET Core API with PostgreSQL and Redis caching
- **Microservices Architecture**: Dedicated NLP service using FastAPI and transformers

## 🏗️ Architecture

```
/scholarlens
├── /frontend               # Next.js 14 + TypeScript + Tailwind
├── /backend                # ASP.NET Core 8 + EF Core + PostgreSQL
├── /nlp-service           # FastAPI + transformers + pdfminer
├── /db/migrations         # EF Core database migrations
├── /infra                 # Docker Compose + environment config
├── /docs                  # API documentation + demo reports
└── /tests                 # Unit tests + integration tests
```

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Git

### 1. Clone and Setup

```bash
git clone <repository-url>
cd scholarlens
cp infra/.env.example infra/.env
```

### 2. Configure Environment

Edit `infra/.env` to set your Unpaywall email:

```env
UNPAYWALL_EMAIL=your-email@example.com
```

### 3. Launch Services

```bash
cd infra
docker compose up --build
```

### 4. Access Applications

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **NLP Service**: http://localhost:8000
- **API Documentation**: http://localhost:8080/swagger

## 📖 Usage Guide

### Basic Search

1. Navigate to http://localhost:3000
2. Enter your research topic (e.g., "digital twins in plastic injection molding")
3. Adjust filters (year range, open access only, max results)
4. Click "Search Papers"

### Generate Reports

1. After search results appear, select papers of interest
2. Click "Generate Report" 
3. Configure report options (sections, charts, language)
4. Download the generated PDF report

### API Usage

```bash
# Search for papers
curl -X POST http://localhost:8080/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "digital twins manufacturing",
    "yearFrom": 2020,
    "yearTo": 2024,
    "limit": 25,
    "openAccessOnly": false
  }'

# Extract text from PDF
curl -X POST http://localhost:8000/api/v1/extract-text \
  -H "Content-Type: application/json" \
  -d '{"pdf_url": "https://arxiv.org/pdf/2301.00001.pdf"}'

# Summarize text
curl -X POST http://localhost:8000/api/v1/summarize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Your paper text here...",
    "style": "technical",
    "lang": "en",
    "max_tokens": 1200
  }'
```

## 🔧 Configuration

### Backend Configuration

Key settings in `backend/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=postgres;Database=scholarlens;Username=scholarlens;Password=scholarlens"
  },
  "ExternalApis": {
    "Crossref": {
      "BaseUrl": "https://api.crossref.org"
    },
    "Unpaywall": {
      "Email": "you@example.com"
    }
  },
  "Branding": {
    "Name": "ScholarLens",
    "PrimaryColor": "#204ECF"
  }
}
```

### NLP Service Configuration

Environment variables for model selection:

```env
# Use smaller models for development/low-memory environments
USE_SMALL_MODELS=true

# Model cache directory
MODEL_CACHE_DIR=/app/models

# Processing limits
MAX_PDF_SIZE_MB=50
MAX_TEXT_LENGTH=1000000
```

### Frontend Configuration

Next.js environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_BRAND_NAME=ScholarLens
```

## 🧪 Development

### Running Individual Services

#### Backend
```bash
cd backend/ScholarLens.Api
dotnet run
```

#### NLP Service
```bash
cd nlp-service
pip install -r requirements.txt
uvicorn main:app --reload
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Database Migrations

```bash
cd backend/ScholarLens.Api
dotnet ef migrations add MigrationName
dotnet ef database update
```

### Running Tests

```bash
# Backend tests
cd backend/ScholarLens.Api
dotnet test

# NLP service tests
cd nlp-service
pytest

# Frontend tests
cd frontend
npm test
```

## 📊 Report Generation

ScholarLens generates comprehensive PDF reports with:

### Standard Sections
- **Cover Page**: Topic, date, branding
- **Executive Summary**: Key findings across papers
- **Methodology**: Search strategy and ranking algorithm
- **Literature Overview**: Categorized paper analysis
- **Key Findings**: Synthesized insights
- **Comparative Analysis**: Paper-by-paper comparison table
- **Charts**: Publication trends, source breakdown, OA statistics
- **Individual Summaries**: Detailed per-paper analysis
- **Gaps & Future Work**: Research opportunities
- **References**: APA format with DOI/QR codes

### Customization Options
- Selectable sections and charts
- Multi-language support (English/Chinese)
- Custom branding (logo, colors, name)
- Various output formats (PDF, HTML preview)

## 🔍 Search & Ranking Algorithm

### Data Sources
1. **Crossref**: Comprehensive academic metadata
2. **arXiv**: Preprints and open access papers
3. **Semantic Scholar**: AI-enhanced paper data
4. **Unpaywall**: Open access PDF locations

### Ranking Formula
```
Score = 0.6 × BM25(keywords) + 0.3 × Semantic_Similarity + 0.1 × Recency_Decay
```

- **BM25**: Title/abstract keyword relevance
- **Semantic Similarity**: Contextual understanding (when available)
- **Recency Decay**: Exponential decay favoring recent papers

### Deduplication
- Exact DOI matching (highest priority)
- Jaro-Winkler title similarity >0.92 threshold
- Author name fuzzy matching for verification

## 🤖 NLP Processing

### Text Extraction
- **pdfminer.six**: Robust PDF text extraction
- **Size limits**: 50MB max file size
- **Quality checks**: Minimum character thresholds
- **Error handling**: Graceful fallbacks for corrupted PDFs

### Summarization Pipeline
1. **Text Chunking**: Sentence-aware splitting (1500 tokens max)
2. **Model Selection**: 
   - English: BART-large-cnn or DistilBART (small)
   - Chinese: mT5-multilingual (planned)
3. **Structured Output**:
   - TL;DR (≤60 words)
   - Key Points (3-8 bullets)
   - Methods, Results, Limitations
4. **Keyword Extraction**: RAKE algorithm with language-specific stopwords

## 🚦 Monitoring & Health Checks

### Health Endpoints
- **Backend**: `GET /health` - Database connectivity
- **NLP Service**: `GET /health` - Model availability
- **Frontend**: Build-time checks

### Logging
- **Structured Logging**: Serilog with correlation IDs
- **Request Tracing**: Full API request/response logging
- **Error Tracking**: Detailed error context and stack traces

### Performance Monitoring
- **Response Caching**: Redis with 24h TTL
- **Rate Limiting**: Configurable per-minute limits
- **Resource Usage**: Memory/CPU monitoring in containers

## 🔒 Security & Best Practices

### API Security
- **Input Validation**: FluentValidation with comprehensive rules
- **Error Handling**: Structured ProblemDetails responses
- **Rate Limiting**: Request throttling per client
- **CORS Configuration**: Configurable origin restrictions

### Container Security
- **Non-root Users**: All services run as non-privileged users
- **Minimal Images**: Alpine-based with security updates
- **Resource Limits**: Memory/CPU constraints in Docker Compose

### Data Privacy
- **No Persistent PDFs**: Temporary files deleted after processing
- **Metadata Only**: No full-text storage for copyrighted content
- **Audit Logging**: Request tracking with timestamps

## 🛠️ Troubleshooting

### Common Issues

#### Service Won't Start
```bash
# Check logs
docker compose logs backend
docker compose logs nlp
docker compose logs frontend

# Rebuild containers
docker compose down
docker compose up --build
```

#### Database Connection Issues
```bash
# Reset database
docker compose down -v
docker compose up postgres -d
# Wait for PostgreSQL to start, then:
docker compose up backend
```

#### Model Loading Failures
```bash
# Check NLP service logs
docker compose logs nlp

# Use smaller models
echo "USE_SMALL_MODELS=true" >> infra/.env
docker compose restart nlp
```

#### Search Returns No Results
- Verify Unpaywall email in `.env`
- Check API rate limits in logs
- Try broader search terms
- Disable "Open Access Only" filter

### Performance Tuning

#### Low Memory Environments
```env
# Use smaller AI models
USE_SMALL_MODELS=true

# Reduce concurrent processing
MAX_CONCURRENT_REQUESTS=1

# Lower chunk sizes
CHUNK_SIZE=512
```

#### High Volume Usage
```env
# Increase rate limits
RATE_LIMIT_REQUESTS_PER_MINUTE=1000

# Scale NLP service
docker compose up --scale nlp=3
```

## 📝 API Reference

### Search API

**POST** `/api/search`
```json
{
  "query": "machine learning",
  "yearFrom": 2020,
  "yearTo": 2024,
  "limit": 25,
  "language": "en",
  "openAccessOnly": false
}
```

**Response**: Array of SearchResult objects

### Ingestion API

**POST** `/api/ingest`
```json
{
  "paperIds": ["uuid1", "uuid2", "uuid3"]
}
```

**Response**: Status per paper (success/skipped/failed)

### Summarization API

**POST** `/api/summarize`
```json
{
  "paperIds": ["uuid1", "uuid2"],
  "summaryStyle": "technical",
  "language": "en",
  "maxTokensPerPaper": 1200
}
```

### Report Generation API

**POST** `/api/report`
```json
{
  "topic": "AI in Manufacturing",
  "paperIds": ["uuid1", "uuid2"],
  "k": 10,
  "sections": ["cover", "executive", "findings"],
  "charts": ["by-year", "source-breakdown"],
  "language": "en"
}
```

## 🗺️ Roadmap

### Short Term (v1.1)
- [ ] Enhanced Chinese language support
- [ ] Bulk PDF processing
- [ ] Advanced filtering (journal, impact factor)
- [ ] User authentication and saved searches

### Medium Term (v1.2)
- [ ] Citation network analysis
- [ ] Collaborative filtering recommendations
- [ ] Real-time progress tracking
- [ ] Export to reference managers

### Long Term (v2.0)
- [ ] Multi-language UI (internationalization)
- [ ] Advanced semantic search with embeddings
- [ ] Research trend prediction
- [ ] Integration with institutional repositories

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Add unit tests for new features
- Update documentation for API changes
- Test with Docker Compose before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Crossref** for comprehensive academic metadata
- **arXiv** for open science infrastructure
- **Semantic Scholar** for AI-enhanced research data
- **Unpaywall** for open access discovery
- **Hugging Face** for transformer models and tools

---

**Disclaimer**: ScholarLens is for research synthesis only. Always verify findings with original sources. The tool respects publisher ToS and copyright restrictions.
