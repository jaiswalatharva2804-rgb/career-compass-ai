# Architecture Breakdown - Semantic Syllabus & Career Mapper

Complete implementation of an AI-powered system that analyzes academic syllabi and generates structured career intelligence. This document provides the architecture breakdown and integration guide.

## 🎯 What This System Does

```
User uploads syllabus (PDF/text)
            ↓
Extract & clean text
            ↓
Semantic analysis via Claude API
            ↓
Map modules → Skills → Job Roles → Market Demand
            ↓
Generate visual career report + skill gap analysis
```

## 🏗️ The Complete Stack

### Frontend Layer (React + TailwindCSS)
- **Upload UI** - Drag & drop interface for PDF/text input
- **Results Dashboard** - Module cards, career path visualization, skill gap charts
- All interactive visualizations and real-time feedback

### Backend API Layer (TanStack Start)
- **REST Endpoint** - `/api/analyze` handles file submissions
- **PDF Parsing** - Text extraction from uploaded syllabi
- **Content Processing** - Cleaning, chunking, metadata extraction

### AI Engine (Claude API)
- **Semantic Analysis** - Identifies concepts, skills, relevance
- **Role Mapping** - Maps skills to specific job titles
- **Market Research** - Current salary ranges, demand levels
- **Gap Analysis** - Identifies missing industry skills
- **Career Pathing** - Proposes progression timelines

## 📊 Data Pipeline Architecture

```
┌──────────────────────────────────────────────────────────┐
│  FRONTEND - React Components                             │
│  ┌──────────────────────────────────────────────────┐   │
│  │ UploadCTA.tsx                                    │   │
│  │ - File drop zone                                 │   │
│  │ - Type validation (PDF/TXT)                      │   │
│  │ - Size limit enforcement (20MB)                  │   │
│  │ - Loading state + progress                       │   │
│  │ - Error handling                                 │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ ResultsDashboard.tsx                             │   │
│  │ - Tabbed interface (Roles/Skills/Gaps/Path)     │   │
│  │ - Career readiness gauge                         │   │
│  │ - Salary projections chart                       │   │
│  │ - Skill inventory by level                       │   │
│  │ - Learning path with timelines                   │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────┬──────────────────────────────┘
                          │ HTTP POST /api/analyze
                          │ Content-Type: application/json
                          │ { content, fileName, fileFormat }
                          ▼
┌──────────────────────────────────────────────────────────┐
│  API LAYER - TanStack Start                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │ /routes/api/analyze.ts                           │   │
│  │ - Request validation                             │   │
│  │ - File format detection                          │   │
│  │ - Call PDF parser or use text directly           │   │
│  │ - Delegate to Claude analyzer                    │   │
│  │ - Return structured response                     │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ /lib/pdf-parser.ts                               │   │
│  │ - Buffer to PDF parsing (pdf-parse)              │   │
│  │ - Text extraction & cleaning                     │   │
│  │ - Chunk text by sections                         │   │
│  │ - Extract document metadata                      │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────┬──────────────────────────────┘
                          │ Calls Claude API
                          │ System + User Prompts
                          ▼
┌──────────────────────────────────────────────────────────┐
│  AI ENGINE - Claude Analysis                             │
│  ┌──────────────────────────────────────────────────┐   │
│  │ /lib/claude-analyzer.ts                          │   │
│  │ - System prompt (career counselor mode)          │   │
│  │ - Analysis prompt (structured extraction)        │   │
│  │ - JSON response parsing                          │   │
│  │ - Schema validation & enrichment                 │   │
│  │                                                   │   │
│  │ Extraction steps:                                │   │
│  │ 1. Parse modules/topics                          │   │
│  │ 2. Identify skills by proficiency                │   │
│  │ 3. Map to 8-10 job roles                         │   │
│  │ 4. Analyze skill gaps                            │   │
│  │ 5. Create career progressions                    │   │
│  │ 6. Generate learning recommendations             │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────┬──────────────────────────────┘
                          │ Returns JSON response
                          ▼
┌──────────────────────────────────────────────────────────┐
│  RESPONSE - SyllabusAnalysis (TypeScript Type)           │
│                                                          │
│  ├─ modules:              Courses/topics                 │
│  ├─ skillsExtracted:      Skills by proficiency          │
│  ├─ careerRoles:          8-10 matching jobs             │
│  ├─ careerPaths:          1/3/5 year progressions        │
│  ├─ skillGapAnalysis:     Missing critical skills        │
│  ├─ recommendedLearningPath: Skill-building timeline     │
│  ├─ industryInsights:     Market trends & insights       │
│  └─ overallCareerReadiness: Score (0-100)               │
│                                                          │
│  All fields fully typed according to /types/syllabus.ts  │
└──────────────────────────────────────────────────────────┘
```

## 🔌 Technical Decisions & Rationale

| Aspect | Choice | Why |
|--------|--------|-----|
| **AI Model** | Claude 3.5 Sonnet | Best balance of reasoning capability, speed, and cost |
| **PDF Parsing** | pdf-parse library | Reliable Node.js solution, handles complex PDFs |
| **Backend** | TanStack Start | Full-stack React, server-side file handling |
| **API Communication** | REST/JSON | Simple, standard, widely compatible |
| **Job Market Data** | Claude web search | Live, current, no subscription needed |
| **Frontend Charts** | Recharts | React-native, responsive, TypeScript support |
| **Output Format** | Strongly typed JSON | Predictable, renderable, compile-time safe |

## 📦 Component Responsibilities

### Frontend Components

#### `UploadCTA.tsx`
- **Displays**: File upload interface
- **Handles**: File selection, drag-drop, validation
- **Mutates**: Posts to `/api/analyze` via React Query
- **Displays**: Loading state, errors, success
- **Renders**: Results via `ResultsDashboard` on success

#### `ResultsDashboard.tsx`
- **Displays**: Complete analysis results
- **Organizes**: Tabbed interface (Roles/Skills/Gaps/Path)
- **Charts**: Salary expectations, demand distribution
- **Lists**: Top careers, skill inventories
- **Actions**: Learning path recommendations

### Backend API

#### `/api/analyze` (POST)
```
Input:  { content, fileName, fileFormat }
Process:
  1. Validate input
  2. Parse file (PDF or text)
  3. Clean extracted text
  4. Call Claude analyzer
  5. Validate response
  6. Return SyllabusAnalysis

Output: { success, analysis?, error?, processingTimeMs }
```

### AI Integration

#### `claude-analyzer.ts`
- **System Prompt**: Establishes role as career counselor
- **User Prompt**: 
  - Requests specific analyses (modules, skills, roles)
  - Provides market context (2026 salary ranges)
  - Demands JSON-only output
  - Specifies schema fields
- **Response Parsing**: Extracts JSON from potentially wrapped responses
- **Validation**: Fills missing fields with sensible defaults

#### `pdf-parser.ts`
- **Extract**: Uses pdf-parse to read PDF buffers
- **Clean**: Removes artifacts, normalizes whitespace
- **Chunk**: Splits by section headers
- **Metadata**: Estimates pages, word count, topics

## 🔐 Security & Error Handling

### Input Validation
```typescript
✓ File size limit: 20MB
✓ File type check: PDF or TXT only
✓ Content length minimum: 100 characters
✓ Content maximum: 50,000 characters
✓ Encoding validation: UTF-8
```

### API Key Protection
```typescript
✓ Stored in .env.local (never committed)
✓ Only loaded server-side
✓ No exposure to frontend/client
✓ Can be rotated safely
```

### Error Recovery
```typescript
✓ Invalid PDF → Clear error message
✓ Empty content → Validation feedback
✓ API timeout → Retry mechanism
✓ Malformed response → Type validation
✓ Network error → User-friendly message
```

## 💾 Database/State Management

**Current approach**: Stateless analysis
- Each upload triggers new analysis
- Results stored in frontend component state
- Can be persisted to browser localStorage
- Future: Add backend persistence for history

**Future enhancement**:
```typescript
// Could add:
- User accounts
- Analysis history
- Saved career paths
- Skill tracking over time
- Comparative analysis
```

## 🎨 UI/UX Features

### Upload Experience
- **Drag & drop** for intuitive file submission
- **Visual feedback** for hover/drag states
- **Progress indication** during analysis
- **Clear error messages** with recovery options
- **Loading animation** with eta indicators

### Results Presentation
- **Gamified score** (career readiness %)
- **Visual hierarchy** using cards and sections
- **Interactive tabs** for different views
- **Color coding** for priority levels
- **Charts** for salary and demand visualization
- **Call-to-action** for learning paths

### Responsive Design
- Mobile-optimized upload interface
- Stacked layout for smaller screens
- Touch-friendly interactions
- Readable on all device sizes

## 🚀 Performance Optimization

### Content Handling
```typescript
// Truncate long syllabi to avoid API limits
const MAX_LENGTH = 50000;
if (text.length > MAX_LENGTH) {
  text = text.substring(0, MAX_LENGTH);
}
```

### Caching Opportunities
```typescript
// Future: Add caching
- Syllabus text → Analysis mapping
- Career role definitions
- Skill taxonomies
- Salary data (refresh daily)
```

### Async Processing
```typescript
// Frontend uses React Query for:
- Request batching
- Automatic retries (3x)
- Error boundary handling
- Stale-while-revalidate caching
```

## 📈 Extensibility Points

### Add New Career Roles
Modify Claude prompt to focus on specific industries:
```typescript
"Focus on tech roles in: AI/ML, DevOps, Cloud Architecture..."
```

### Custom Skill Taxonomies
Extend the skill extraction logic:
```typescript
skillsExtracted.map(skill => ({
  ...skill,
  certifications: getCertifications(skill.name),
  learningPaths: generateCustomPath(skill),
}))
```

### Market Data Integration
Replace Claude web search with API:
```typescript
const jobData = await fetch('https://api.indeed.com/jobs?...');
// Integrate real-time salary & demand data
```

### Comparative Analysis
Enable multi-file uploads:
```typescript
POST /api/analyze/compare
{
  syllabi: [file1, file2, file3]
  // Returns: Skills overlap, combined roles, gaps
}
```

## 🧪 Testing Checklist

```
□ Upload PDF syllabus → Parse correctly
□ Upload TXT syllabus → Accept as text
□ Large file (18MB) → Process successfully
□ Empty file → Show validation error
□ Corrupted PDF → Handle gracefully
□ Timeout after 60s → Show retry option
□ API error → Display user-friendly message
□ Results render → All tabs work
□ Mobile view → Responsive layout
□ Accessibility → Keyboard navigation, screen readers
```

## 📝 Environment Configuration

Create `.env.local`:
```env
# Required
ANTHROPIC_API_KEY=sk-ant-...

# Optional
ANTHROPIC_API_BASE=https://api.anthropic.com
ANTHROPIC_HTTP_CLIENT_TIMEOUT=300000
MAX_SYLLABUS_SIZE=50000
```

## 🚀 Deployment Considerations

### Build Command
```bash
npm run build
```

### Server Requirements
- **Runtime**: Node.js 18+
- **Memory**: 512MB minimum
- **Timeout**: 60+ seconds for API requests

### Environment Variables
- Set `ANTHROPIC_API_KEY` on production server
- Use secure secret management (AWS Secrets Manager, etc.)
- Rotate API keys periodically

### Scaling Considerations
- Add rate limiting per user/IP
- Implement request queue for high volume
- Cache analysis results by content hash
- Consider async job processing for large files

## 📚 API Documentation

### Endpoint: POST /api/analyze

**Request:**
```javascript
{
  "content": "base64_encoded_pdf_or_plain_text",
  "fileName": "syllabus.pdf",
  "fileFormat": "pdf"
}
```

**Success Response (200):**
```javascript
{
  "success": true,
  "analysis": {
    "syllabusTitle": "CS 101: Introduction to Computer Science",
    "analysisDate": "2024-01-15T10:30:00Z",
    "modules": [...],
    "skillsExtracted": [...],
    "careerRoles": [...],
    "overallCareerReadiness": { "score": 78, "assessmentText": "..." },
    "topThreeRoles": [...],
    "recommendedLearningPath": [...],
    "industryInsights": {...}
  },
  "processingTimeMs": 8743
}
```

**Error Response (400/500):**
```javascript
{
  "success": false,
  "error": "Descriptive error message"
}
```

## 🎓 Learning & Skill Development

### For Developers
- Study Claude API prompt engineering
- Learn TanStack Start server patterns
- Understand PDF parsing challenges
- Explore React Query patterns
- Practice TypeScript with strict mode

### For Product
- Analyze user syllabi patterns
- Track career recommendation accuracy
- Measure learning path effectiveness
- Iterate on UI/UX

## 🔮 Future Enhancements

**Phase 2:**
- [ ] Multi-syllabus comparative analysis
- [ ] Degree program evaluation
- [ ] Certification roadmaps
- [ ] Mentor matching system

**Phase 3:**
- [ ] Real-time job market integration
- [ ] LinkedIn skill verification
- [ ] Interview prep modules
- [ ] Portfolio building guides

**Phase 4:**
- [ ] Mobile app (React Native)
- [ ] AI career coach (chatbot)
- [ ] Institutional dashboard
- [ ] Employer integration

---

**Architecture Version**: 1.0
**Last Updated**: 2026-05-11  
**Status**: Production Ready ✅
