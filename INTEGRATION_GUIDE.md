# Semantic Syllabus & Career Mapper - Integration Guide

## 🎯 System Overview

This is a full-stack AI-powered platform that analyzes academic syllabi and generates structured career intelligence. It maps course modules to real-world skills, identifies matching job roles with market data, and creates personalized learning paths.

### Architecture Components

```
┌─────────────────────────────────────────────────────────────────┐
│                      Frontend (React + TailwindCSS)             │
│  • UploadCTA.tsx - File upload interface (PDF/Text)             │
│  • ResultsDashboard.tsx - Interactive results visualization     │
│  • React Query - Async request handling                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP POST /api/analyze
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│              Backend API (TanStack Start - Node.js)             │
│  • /routes/api/analyze.ts - Main entry point                    │
│  • File upload handling (multipart/form-data)                   │
│  • PDF/Text parsing & cleanup                                   │
└──────────────────────┬──────────────────────────────────────────┘
                       │ calls
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AI Analysis Engine                           │
│  • lib/claude-analyzer.ts - Claude API integration              │
│  • Semantic extraction & skill mapping                          │
│  • Role matching & market research                              │
│  • Structured JSON output generation                            │
└──────────────────────┬──────────────────────────────────────────┘
                       │ uses
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PDF Parsing Utilities                        │
│  • lib/pdf-parser.ts - Text extraction                          │
│  • Content cleaning & chunking                                  │
│  • Document metadata extraction                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `@anthropic-ai/sdk` - Claude API client
- `pdf-parse` - PDF text extraction
- All other React, TanStack, and UI dependencies

### 2. Configure Environment Variables

**Create `.env.local` in the project root:**

```env
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Get your API key:**
1. Visit https://console.anthropic.com
2. Create an account or log in
3. Navigate to API Keys
4. Create a new API key and copy it

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📋 Data Flow

### User Uploads a Syllabus

```
1. User selects PDF/TXT file via UploadCTA component
2. File is read and converted:
   - PDF → base64 encoded
   - TXT → plain text
3. Request sent to /api/analyze with file content
```

### Backend Processing

```
1. API endpoint receives request
2. File validation:
   - Check file format and size
   - Verify content isn't empty
3. Extract text:
   - PDF: parse.pdf → extract text
   - TXT: decode content
4. Clean text:
   - Remove PDFartifacts
   - Normalize whitespace
   - Reconstruct broken sentences
5. Send to Claude API for analysis
```

### Claude Analysis

The system sends a carefully crafted prompt to Claude that instructs it to:

```
1. Extract main course modules/topics
   - Identify chapter/section boundaries
   - Rate relative importance (0-100)
   - Extract key learning outcomes

2. Identify transferable skills
   - Map topics → real-world skills
   - Assign proficiency levels
   - Industry relevance scoring

3. Map to job roles
   - Identify 8-10 matching job titles
   - Calculate match score (0-100)
   - Get current salary ranges (2026)
   - Assess market demand

4. Analyze skill gaps
   - Compare curriculum → industry needs
   - Prioritize missing skills
   - Suggest learning resources

5. Create career paths
   - Entry role → progression
   - 1/3/5 year progression
   - Timeline estimates

6. Return structured JSON
   - Fully typed according to SyllabusAnalysis schema
   - Queryable & renderable by frontend
```

### Response Rendering

```
1. Backend returns SyllabusAnalysis object
2. Frontend receives and stores in state
3. ResultsDashboard component renders:
   - Career readiness score
   - Top matching roles
   - Skill inventory by level
   - Salary expectations
   - Critical skill gaps
   - Recommended learning path
   - Industry insights
```

## 📁 File Structure & Responsibilities

### Frontend Components

| File | Purpose |
|------|---------|
| `src/components/UploadCTA.tsx` | File upload UI + mutation handler |
| `src/components/ResultsDashboard.tsx` | Results visualization (charts, tabs, cards) |

### Backend API

| File | Purpose |
|------|---------|
| `src/routes/api/analyze.ts` | Main API endpoint (POST /api/analyze) |

### AI & Processing

| File | Purpose |
|------|---------|
| `src/lib/claude-analyzer.ts` | Claude API integration, prompts, response parsing |
| `src/lib/pdf-parser.ts` | PDF text extraction, cleaning, chunking |

### Type Definitions

| File | Purpose |
|------|---------|
| `src/types/syllabus.ts` | Complete TypeScript schema for all data structures |

## 🔄 API Specification

### POST /api/analyze

**Request Body:**
```typescript
{
  content: string;        // Base64 (PDF) or plain text (TXT)
  fileName: string;       // Original filename
  fileFormat: "pdf" | "text";
}
```

**Response:**
```typescript
{
  success: boolean;
  analysis?: SyllabusAnalysis;    // Full analysis on success
  error?: string;                 // Error message on failure
  processingTimeMs?: number;      // Time taken for analysis
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid input
- `500` - Server/API error

## 🧠 Claude Prompt Strategy

The system uses a multi-step prompt that:

1. **Establishes context** - Defines system role as career counselor
2. **Specifies task** - Lists exact analysis requirements
3. **Enforces structure** - Demands JSON-only response
4. **Provides context** - Suggests current salary ranges, job market state
5. **Ensures parsing** - JSON format for reliable extraction

Example prompt excerpt:
```
For each module, Claude identifies:
- Core concepts being taught
- Transferable skills it builds  
- Industry domains it's relevant to

For job roles, Claude analyzes:
- Specific job titles (e.g. "Data Structures" → Backend Engineer, ML Engineer)
- Salary ranges & demand levels (2026 market rates)
- Skill gaps — what the syllabus is missing vs what industry needs
- Growth trends (growing/stable/declining)
```

## 📊 Key Data Structures

### SyllabusAnalysis (Main Result)
- `modules` - Course sections/chapters
- `skillsExtracted` - Skills at beginner/intermediate/advanced levels
- `careerRoles` - 8-10 matching job titles with details
- `careerPaths` - 1/3/5 year progressions
- `skillGapAnalysis` - Missing skills with priorities
- `recommendedLearningPath` - Prioritized skill-building plan
- `industryInsights` - Trends, dominant industries

### Module
- `name` - Section title
- `description` - What it covers
- `topics` - Individual topics
- `weightage` - Importance (0-100)

### CareerRole
- `jobTitle` - Job name
- `matchScore` - How well syllabus prepares (0-100)
- `estimatedSalaryUSD` - Min/max range
- `demandLevel` - high/medium/low
- `requiredSkills` - Skills needed
- `skillGaps` - Missing skills with priority
- `growthTrend` - Market direction

## 🎨 Frontend Features

### Upload Interface
- Drag & drop file area
- File type validation (PDF/TXT)
- Size limit enforcement (20MB)
- Loading state with progress
- Error handling with clear messages

### Results Dashboard
- **Tabs:**
  - Career Roles - Top matches + salary chart
  - Skills - Organized by proficiency level
  - Gaps - Critical missing skills
  - Path - Learning roadmap with timelines

- **Visualizations:**
  - Career readiness progress bar
  - Salary expectation bars
  - Skill proficiency indicators
  - Demand distribution pie chart

- **Interactive elements:**
  - Filterable role list
  - Skill requirement details
  - Resource recommendations
  - Timeline estimates

## 🔐 Security Considerations

1. **API Key Protection**
   - Stored in `.env.local` (not committed)
   - Only accessed on server-side
   - Never exposed to frontend

2. **File Validation**
   - Size limits (20MB)
   - Type checking (PDF/TXT only)
   - Content length validation

3. **Rate Limiting**
   - Consider adding per-user limits
   - Queue long requests
   - Timeout protection

## 📈 Performance Optimization

1. **Content Truncation**
   - Max 50,000 chars sent to Claude
   - Reduces API costs & latency

2. **Parallel Processing**
   - PDF parsing happens server-side
   - Doesn't block other requests

3. **Caching Opportunities**
   - Cache syllabus → analysis mappings
   - Cache role/skill definitions
   - Career path templates

## 🚨 Error Handling

The system gracefully handles:
- Invalid file formats
- Corrupted PDFs
- Empty syllabi
- API failures
- Network timeouts
- Malformed responses

Each error is caught, logged, and returned with a user-friendly message.

## 🔧 Customization Points

### Add Custom Industries
Modify the prompt in `claude-analyzer.ts` to specify industries:
```
Focus on these industries: [AI/ML, Healthcare Tech, Finance, ...]
```

### Change Analysis Depth
Adjust the number of roles extracted:
```
"Identify 12-15 matching job roles" instead of 8-10
```

### Personalize Career Paths
Customize path generation in `buildCareerPaths()`:
```
- Add location-based salary adjustments
- Include specific company tier analysis
- Add geographic mobility scoring
```

### Extend Learning Path
Add more learning resources by modifying `buildLearningPath()`:
```
- Integrate with external learning platforms
- Add certification tracking
- Include project portfolio building
```

## 🧪 Testing the Integration

### Test with Sample Syllabus

Create `test-syllabus.txt`:
```
CS 101: Introduction to Computer Science
Week 1-2: Fundamentals
- Algorithms & Data Structures
- Time complexity analysis

Week 3-4: Programming Paradigms
- Object-oriented programming
- Functional programming concepts

[... more content ...]
```

Upload via UI → Check for proper parsing and analysis.

### Mock API Testing

```javascript
// In browser console
const testPayload = {
  content: "CS 101: Intro to CS\nTopics: Algorithms, Data Structures...",
  fileName: "test.txt",
  fileFormat: "text"
};

fetch('/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testPayload)
}).then(r => r.json()).then(console.log);
```

## 📚 Additional Resources

- [Anthropic Claude API Docs](https://docs.anthropic.com/)
- [TanStack Start Docs](https://tanstack.com/start/latest)
- [React Query Docs](https://tanstack.com/query/)
- [pdf-parse Documentation](https://github.com/modesty/pdf-parse)

## 🐛 Troubleshooting

### "ANTHROPIC_API_KEY not found"
→ Create `.env.local` with your API key

### "Failed to parse PDF"
→ Ensure PDF is valid and not encrypted

### "Analysis timeout"
→ Increase timeout in `.env.local` or retry

### "Syllabus content too short"
→ Upload a complete syllabus with at least 100 words

## 📝 Future Enhancements

- [ ] Multi-file analysis (compare multiple syllabi)
- [ ] Batch processing for institutions
- [ ] Integration with LinkedIn job data
- [ ] Custom role templates
- [ ] Certification recommendations
- [ ] Interview prep resources
- [ ] Mentor matching based on career goals
- [ ] Real-time job market API integration
