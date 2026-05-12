#!/bin/bash
# Quick Setup Script for Career Compass AI

set -e

echo "🚀 Setting up Semantic Syllabus & Career Mapper..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Check for .env.local
if [ ! -f .env.local ]; then
    echo "⚠️  No .env.local file found"
    echo "Creating .env.local from example..."
    cp .env.local.example .env.local
    echo ""
    echo "📝 IMPORTANT: Update .env.local with your Anthropic API key:"
    echo "   1. Go to https://console.anthropic.com"
    echo "   2. Create/copy your API key"
    echo "   3. Replace 'your_anthropic_api_key_here' in .env.local"
    echo ""
else
    echo "✅ .env.local found"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your Anthropic API key (if not already done)"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:5173 in your browser"
echo "4. Upload a syllabus and explore career intelligence!"
echo ""
