# Environment Variables Setup

## What You Need to Know

The **AI Financial Assistant** works perfectly without any environment variables. All features are functional in demo mode.

## For Development (No Setup Required)

Simply run:
\`\`\`bash
npm install
npm run dev
\`\`\`

The app will work with:
- ✅ Demo authentication
- ✅ Budget management
- ✅ Transaction tracking
- ✅ AI coaching (rule-based)
- ✅ Auto-categorization (keyword-based)
- ✅ Local data storage

## For Production/Deployment on Vercel

The app **deploys without any environment variables**. However, you can optionally add Supabase for cloud storage.

### Option 1: Deploy as-is (Recommended for MVP)

No environment variables needed. Deploy directly to Vercel.

**Steps:**
1. Push to GitHub
2. Go to vercel.com
3. Import your repository
4. Click "Deploy"

Done! Your app is live.

### Option 2: Add Supabase for Persistence (Advanced)

If you want cloud storage:

**Step 1: Create Supabase Account**
- Go to https://supabase.com/
- Sign up and create a new project
- Note your credentials:
  - Project URL
  - Anon Key
  - Service Role Key

**Step 2: Set Environment Variables in Vercel**

Go to your Vercel project:
1. Click "Settings"
2. Click "Environment Variables"
3. Add these variables:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL = your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_anon_key
SUPABASE_SERVICE_ROLE_KEY = your_service_role_key
\`\`\`

**Step 3: Setup Database (Optional)**

Run the SQL migration in Supabase:
\`\`\`sql
-- Copy content from scripts/init_schema.sql and run in Supabase SQL Editor
\`\`\`

**Step 4: Redeploy**

Push a new commit to trigger redeploy, or manually redeploy from Vercel dashboard.

## Environment Variables Reference

### Required: None
The app works without any environment variables.

### Optional: Supabase Integration
If you want to add cloud storage:

| Variable | Example | Purpose |
|----------|---------|---------|
| NEXT_PUBLIC_SUPABASE_URL | https://abc.supabase.co | Your Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | eyJhbG... | Public API key for frontend |
| SUPABASE_SERVICE_ROLE_KEY | eyJhbG... | Private API key for backend |

Note: These are only needed if you implement Supabase integration code.

## Running Locally

\`\`\`bash
# 1. Clone project
git clone <your-repo>
cd ai-financial-assistant

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev

# 4. Open browser
# http://localhost:3000

# 5. Test the app
# Login with any email
# Create budgets and transactions
\`\`\`

## Deploying to Vercel

\`\`\`bash
# 1. Push to GitHub
git add .
git commit -m "Deploy to Vercel"
git push

# 2. Go to Vercel
# Import your repository
# Click Deploy

# Done! Your app is live
\`\`\`

## FAQ

**Q: Do I need to add environment variables?**
A: No! The app works perfectly without them. Add them only if you want Supabase integration.

**Q: What if I don't add environment variables?**
A: The app will use localStorage (browser storage). Data stays on the user's device.

**Q: How do I test Supabase integration?**
A: After adding env vars, the app will automatically use Supabase if available.

**Q: Where do I find my Supabase credentials?**
A: In Supabase dashboard → Project Settings → API

**Q: Can I change environment variables later?**
A: Yes! Add or update them anytime in Vercel settings and redeploy.

## Common Issues

### "No environment variables found"
**Solution**: This is normal! The app works without them.

### Data not persisting across devices
**Solution**: Add Supabase environment variables for cloud storage.

### "Failed to connect to Supabase"
**Solution**: Check that your environment variables are correct in Vercel settings.

## Summary

- **For quick start**: No setup needed, just deploy
- **For production**: Still no setup needed, works great
- **For cloud storage**: Optionally add Supabase variables
- **For persistence**: Use Supabase or localStorage is fine

The app is production-ready without any configuration!
