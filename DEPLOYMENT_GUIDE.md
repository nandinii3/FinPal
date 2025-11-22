# AI Financial Assistant - Deployment Guide

## Overview
The AI Financial Assistant is a Next.js application that helps users manage their budgets with AI-powered insights. The app works in **demo mode** without any external dependencies and can be enhanced with Supabase for persistent data storage.

## Features
- **Budget Management**: Set monthly budgets for different spending categories
- **Transaction Tracking**: Add and track transactions with automatic categorization
- **AI Coach**: Get personalized financial advice based on spending patterns
- **Smart Categorization**: Rule-based categorization that works without API credits
- **Budget Visualization**: See spending breakdown and budget status at a glance

## Quick Start (Demo Mode)

The app works out of the box without any configuration:

1. **Clone/Download** the project
2. **Install dependencies**: `npm install` or `yarn install`
3. **Run locally**: `npm run dev` or `yarn dev`
4. **Open browser**: http://localhost:3000
5. **Login**: Enter any email to start using the app

Data is stored in browser's localStorage - it persists during the session but resets when you clear browser data.

## Environment Variables

### Demo Mode (No setup needed)
The app works perfectly without any environment variables. All data is stored locally in the browser.

### Production with Supabase (Optional)
To add persistent database storage:

1. **Create Supabase Project**:
   - Go to https://supabase.com
   - Create a new project
   - Copy your credentials

2. **Set Environment Variables** in Vercel:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   SUPABASE_SERVICE_ROLE_KEY=your_key
   \`\`\`

3. **Setup Database**:
   - Run the SQL migration from `scripts/init_schema.sql` in Supabase SQL editor
   - Or v0 can execute it automatically

## Deployment to Vercel

### Step 1: Push to GitHub
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-financial-assistant.git
git push -u origin main
\`\`\`

### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose your repository
5. Click "Deploy"

### Step 3: (Optional) Add Environment Variables
1. Go to your Vercel project settings
2. Click "Environment Variables"
3. Add Supabase credentials if you want persistent storage
4. Redeploy

## Deployment Without Environment Variables

The app is **fully functional without any environment variables**:
- ✅ Authentication works (demo mode)
- ✅ Budget management works
- ✅ Transaction tracking works
- ✅ AI coaching works (rule-based advice)
- ✅ Auto-categorization works (keyword-based)
- ✅ All UI and features are functional

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Main dashboard
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── auth/
│   │   └── login/page.tsx    # Login page
│   └── api/
│       ├── categorize/       # Transaction categorization
│       └── coach/            # Financial advice API
├── components/
│   ├── dashboard-layout.tsx  # Dashboard container
│   ├── budget-setup.tsx      # Budget management
│   ├── transaction-input.tsx # Add transactions
│   ├── ai-coach.tsx          # AI advice component
│   ├── budget-at-a-glance.tsx # Budget overview
│   └── transaction-history.tsx # Transaction list
├── lib/
│   ├── types.ts              # TypeScript types
│   └── supabase/             # Supabase clients
└── scripts/
    └── init_schema.sql       # Database schema
\`\`\`

## How It Works

### Demo Mode (No Setup)
1. User logs in with any email
2. Data is stored in browser's localStorage
3. All features work locally
4. Perfect for testing and prototyping

### With Supabase (Optional)
1. User logs in with email/password
2. Data syncs to Supabase database
3. Access data across devices
4. RLS policies protect user data

## Troubleshooting

### "Failed to categorize transaction"
- The app falls back to "Other" category
- Still works fine with manual categorization

### "Failed to get financial advice"
- The app provides default helpful advice
- All features continue to work

### Data disappeared
- Demo mode stores data in localStorage
- Clearing browser data or cookies will clear the data
- Use Supabase for persistent storage

## Customization

### Add More Categories
Edit `CATEGORIES` in `components/budget-setup.tsx`

### Change Color Scheme
Edit `globals.css` to modify the theme tokens

### Modify Categorization Rules
Edit `app/api/categorize/route.ts` to add more keywords

## Support

- Issues: Create an issue on GitHub
- Questions: Check the README and code comments
- Deployment help: Visit Vercel docs at https://vercel.com/docs

## License

MIT License - Feel free to use for personal and commercial projects.
