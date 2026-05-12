# Career Compass AI - Semantic Syllabus & Career Mapper

**AI-powered career intelligence platform that transforms academic syllabi into actionable career intelligence.**

Upload your syllabus → Get your career map in seconds.

## 🎯 What This Does

Analyzes your course curriculum and generates:
- ✅ **Skill Inventory** - What you're learning (by proficiency level)
- ✅ **Career Matching** - Which jobs you're being trained for
- ✅ **Market Data** - Salary ranges, demand trends, growth signals
- ✅ **Skill Gaps** - What's missing vs. what industry needs
- ✅ **Learning Roadmap** - Personalized path to close skill gaps
- ✅ **Career Progression** - 1, 3, and 5-year trajectory

## 🚀 Quick Start (2 minutes)

### 1. Get Your API Key
- Go to [console.anthropic.com](https://console.anthropic.com)
- Create account or log in
- Copy your API key

### 2. Setup Locally
```bash
# Clone/navigate to project
cd career-compass-ai

# Run setup script
bash setup.sh

# OR manually:
npm install
cp .env.local.example .env.local
# Edit .env.local, add your API key
```

### 3. Start Development
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) → Upload your syllabus → Explore results!

## 📊 System Architecture

```
┌─ FRONTEND ──────────────────────┐
│  Upload UI + Results Dashboard   │
│  (React + TailwindCSS)           │
└──────────────┬────────────────────┘
               │ POST /api/analyze
               ▼
┌─ BACKEND ───────────────────────┐
│  File parsing + API orchestration │
│  (TanStack Start)                │
└──────────────┬────────────────────┘
               │
               ▼
┌─ AI ENGINE ──────────────────────┐
│  Semantic analysis & mapping      │
│  (Claude 3.5 Sonnet via API)     │
└──────────────┬────────────────────┘
               │
               ▼
    ┌─────────────────────┐
    │  Structured JSON    │
    │  ✓ Modules          │
    │  ✓ Skills           │
    │  ✓ Roles            │
    │  ✓ Gaps             │
    │  ✓ Learning Path    │
    └─────────────────────┘
```

## 📁 Project Structure

```
career-compass-ai/
├── src/
│   ├── components/
│   │   ├── UploadCTA.tsx              ← File upload interface
│   │   └── ResultsDashboard.tsx       ← Results visualization
│   ├── routes/
│   │   └── api/
│   │       └── analyze.ts             ← Main API endpoint
│   ├── lib/
│   │   ├── claude-analyzer.ts         ← Claude integration
│   │   └── pdf-parser.ts              ← PDF utilities
│   └── types/
│       └── syllabus.ts                ← TypeScript schema
├── ARCHITECTURE.md                    ← Detailed breakdown
├── INTEGRATION_GUIDE.md               ← Setup & customization
├── .env.local.example                 ← Environment template
└── setup.sh                           ← Automated setup
```

## 🔧 Configuration

### Environment Variables

Create `.env.local`:
```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

All other configs have sensible defaults.

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **ARCHITECTURE.md** | Deep dive into system design, data flow, technical decisions |
| **INTEGRATION_GUIDE.md** | Step-by-step setup, API specs, troubleshooting |
| **README.md** | This file - quick overview |

## 📊 Sample Output

When you upload a syllabus, you get back:

### Career Readiness Score
```
Your curriculum prepares you for 78% of industry requirements
```

### Top Matching Roles
```
1. Backend Engineer (87% match)
   Salary: $95k - $140k | Demand: High | Trend: ↑ Growing
   
2. Full Stack Developer (82% match)
   Salary: $85k - $130k | Demand: High | Trend: ↑ Growing
   
3. DevOps Engineer (76% match)
   Salary: $100k - $150k | Demand: Medium | Trend: → Stable
```

### Critical Skill Gaps
```
1. Cloud Architecture (AWS/GCP) — IMMEDIATE
   Suggested: AWS Solutions Architect Certification (40 hrs)
   
2. Containerization (Docker/Kubernetes) — SHORT-TERM
   Suggested: "Docker for DevOps" course (30 hrs)
   
3. System Design — LONG-TERM
   Suggested: "Designing Data-Intensive Applications" (60 hrs)
```

### Learning Path
```
Next 12 weeks:
Week 1-4:   Master Docker containers
Week 5-8:   Learn Kubernetes orchestration
Week 9-12:  Build cloud-native application
```

## 🤖 How Claude Analysis Works

1. **Parse your syllabus** - Extracts modules, topics, concepts
2. **Identify skills** - Maps topics to real-world skills
3. **Research careers** - Identifies matching job titles
4. **Analyze market** - Gets salary ranges & demand
5. **Find gaps** - Compares curriculum vs. industry needs
6. **Create path** - Recommends learning for each gap

All powered by Claude's semantic understanding of education and careers.

## ✨ Key Features

### Smart Upload
- 📄 PDF and text file support
- 🎯 Drag & drop interface
- ⚡ Real-time processing feedback
- 🛡️ Secure file handling (20MB limit)

### Intelligent Analysis
- 🧠 AI-powered semantic extraction
- 💼 8-10 job role matching
- 📈 Current market data integration
- 🎯 Personalized skill gap analysis

### Interactive Dashboard
- 📊 Career readiness gauge
- 💰 Salary expectation charts
- 🎓 Skill inventory by level
- 🗺️ Career progression timelines
- 📚 Learning roadmap with timelines

## 🔐 Security & Privacy

✅ **API keys** stored server-side only  
✅ **File validation** - Type & size checks  
✅ **Content limits** - Designed for safety  
✅ **No data persistence** - Stateless analysis  
✅ **SSL/TLS** for all communications  

## 🐛 Troubleshooting

### API Key errors?
```bash
# Ensure .env.local exists and has your key
cat .env.local

# Should show:
# ANTHROPIC_API_KEY=sk-ant-...
```

### PDF parsing fails?
- Ensure PDF is valid and not encrypted
- Try max 20MB file size
- If still stuck, try converting to TXT first

### Analysis timeout?
- Usually takes 10-30 seconds
- Longer syllabi (20+ pages) may take up to 60s
- Check internet connection

### Local setup issues?
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 📈 Performance

- **Typical analysis time**: 10-30 seconds
- **Maximum syllabus size**: 50KB (usually ~15-20 pages)
- **API response**: < 90% of processing time
- **Frontend rendering**: < 10% of processing time

## 🚀 Production Deployment

When deploying:

1. **Install dependencies**
   ```bash
   npm install --production
   ```

2. **Set environment variables**
   ```bash
   ANTHROPIC_API_KEY=your-production-key
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Start production server**
   ```bash
   npm run preview
   # Or use your hosting platform's start command
   ```

## 🔄 Technology Stack

**Frontend**
- React 19
- TailwindCSS 4
- Framer Motion (animations)
- Recharts (data visualization)
- React Query (async data)
- TypeScript

**Backend**
- TanStack Start (full-stack React)
- Node.js (runtime)
- Anthropic SDK (Claude API)
- pdf-parse (PDF extraction)

**AI**
- Claude 3.5 Sonnet (semantic analysis)
- Web search integration (market data)

## 📚 Learn More

- [Anthropic Claude Docs](https://docs.anthropic.com/)
- [TanStack Start Docs](https://tanstack.com/start/)
- [React Query Docs](https://tanstack.com/query/)

## 🤝 Contributing

To extend this system:

1. **Add new analysis types** → Modify Claude prompts in `lib/claude-analyzer.ts`
2. **Support new file formats** → Add parser in `lib/pdf-parser.ts`
3. **Customize visualizations** → Edit `components/ResultsDashboard.tsx`
4. **Add new endpoints** → Create in `src/routes/api/`

## 📝 Future Roadmap

- [ ] Compare multiple syllabi
- [ ] Degree program analysis
- [ ] Certification recommendations
- [ ] Interview prep modules
- [ ] Mentor matching
- [ ] Real-time job integrations
- [ ] Mobile app

## 📄 License

[Your License Here]

## 🎓 About This Project

Built as a bridge between academic curriculum and professional career development. Uses AI to understand what you're learning and connects it to real-world job opportunities, market demands, and personalized career growth paths.

**Made for students who want clarity on their career path.**

---

### Next: [Read ARCHITECTURE.md](./ARCHITECTURE.md) for technical deep dive

**Questions?** Check [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) or review the source code.
