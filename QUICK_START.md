# Quick Start Guide - AI Financial Assistant

## 5-Minute Setup

### Step 1: Get the Code
\`\`\`bash
# Option A: Clone from GitHub
git clone https://github.com/your-username/ai-financial-assistant
cd ai-financial-assistant

# Option B: Download ZIP and extract
unzip ai-financial-assistant.zip
cd ai-financial-assistant
\`\`\`

### Step 2: Install & Run
\`\`\`bash
npm install
npm run dev
\`\`\`

Open http://localhost:3000 in your browser.

### Step 3: Test the App
1. **Login**: Enter any email (e.g., test@example.com)
2. **Create Budget**: 
   - Go to "Manage" tab
   - Select "Food" category
   - Set budget to $500
   - Click "Set Budget"
3. **Add Transaction**:
   - Enter amount: 12.50
   - Description: "Coffee at Starbucks"
   - Click "Auto-Categorize" → should suggest "Food"
   - Click "Add Transaction"
4. **Get Advice**:
   - Go to "Overview" tab
   - Click "Get Financial Advice"
   - See personalized coaching

Done! Everything works.

## Deploy to Vercel (1 minute)

\`\`\`bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Go to https://vercel.com
# 3. Click "Add New" → "Project"
# 4. Import your GitHub repository
# 5. Click "Deploy"

# Your app is now live!
\`\`\`

Copy the Vercel URL and share it.

## Features You Can Use Right Now

✅ Budget Setup
- Set monthly budgets
- Track spending by category

✅ Add Transactions
- Enter amount and description
- Auto-categorize or select manually

✅ Get Financial Advice
- Click "Get Financial Advice"
- Get personalized coaching

✅ View Dashboard
- See total budget and spent
- Track remaining balance
- Visual progress bars

## What's Already Working

- Demo authentication (no login needed)
- Budget management
- Transaction tracking
- AI categorization (rule-based)
- Financial coaching (smart advice)
- All UI and interactions

## Optional: Add Cloud Storage

Want data to sync across devices?

1. Create Supabase account: https://supabase.com
2. Create a project
3. Copy your credentials
4. Add to Vercel environment variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
5. Redeploy

That's it! Data now syncs to the cloud.

## Troubleshooting

**Port 3000 already in use?**
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

**Module not found error?**
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

**App not loading?**
- Check browser console for errors
- Try clearing cache: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
- Restart dev server: Ctrl+C then npm run dev

**Transactions not saving?**
- Check browser localStorage is enabled
- Not using private/incognito mode
- Check console for JavaScript errors

## Need Help?

1. Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Check [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
3. Check code comments
4. Try a hard refresh: Ctrl+F5

## Next Steps

1. **Customize**: Edit colors in `app/globals.css`
2. **Add categories**: Edit `components/budget-setup.tsx`
3. **Deploy**: Push to Vercel
4. **Share**: Send the live URL to others

You're ready to go! 🚀
