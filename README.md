# AI Financial Assistant

A modern, AI-powered personal finance management app built with Next.js. Track budgets, categorize transactions, and get personalized financial coaching—all without requiring any API credits or external services.

## Features

🎯 **Budget Management**
- Set monthly budgets for multiple spending categories
- Visual budget tracking with progress bars
- Overspending alerts

💰 **Transaction Tracking**
- Add transactions with descriptions and amounts
- Automatic category suggestions using smart rules
- Transaction history with detailed breakdown

🤖 **AI Financial Coach**
- Personalized financial advice based on spending patterns
- Smart recommendations for budget optimization
- Works without any API credits required

📊 **Dashboard**
- Real-time budget overview
- Spending breakdown by category
- Total budget, spent, and remaining amounts

🔐 **Privacy First**
- Data stored locally in browser (demo mode)
- Optional Supabase integration for cloud storage
- No tracking or data collection

## Quick Start

\`\`\`bash
# 1. Clone or download
git clone <your-repo>
cd ai-financial-assistant

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open browser
# Visit http://localhost:3000
# Login with any email
\`\`\`

## Deploy to Vercel

\`\`\`bash
# 1. Push to GitHub
git push

# 2. Go to https://vercel.com
# 3. Click "New Project"
# 4. Select your repository
# 5. Deploy!
\`\`\`

No environment variables needed - the app works perfectly in demo mode!

## Usage

### Set a Budget
1. Go to "Manage" tab
2. Select a category
3. Enter your monthly budget limit
4. Click "Set Budget"

### Add a Transaction
1. Go to "Manage" tab
2. Enter amount and description
3. Click "Auto-Categorize" or select manually
4. Click "Add Transaction"

### Get Financial Advice
1. Go to "Overview" tab
2. Click "Get Financial Advice"
3. Receive personalized coaching

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS + shadcn/ui
- **Storage**: localStorage (demo) / Supabase (optional)
- **API Routes**: Next.js Route Handlers
- **Language**: TypeScript

## Optional: Add Supabase for Persistence

To enable cloud storage:

1. Create account at https://supabase.com
2. Create a new project
3. Copy your credentials
4. Set environment variables in Vercel
5. Run the database migration

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx                 # Main dashboard
│   ├── auth/login/page.tsx      # Login page
│   └── api/
│       ├── categorize/route.ts  # Transaction categorizer
│       └── coach/route.ts       # Financial advice engine
├── components/                  # React components
├── lib/                         # Utilities and types
└── scripts/                     # Database migrations
\`\`\`

## Customization

- **Categories**: Edit `CATEGORIES` in `components/budget-setup.tsx`
- **Colors**: Modify `app/globals.css`
- **Rules**: Update categorization logic in `app/api/categorize/route.ts`

## FAQ

**Q: Is my data saved?**
A: In demo mode, data is saved to your browser's localStorage. If you want persistent cloud storage, enable Supabase integration.

**Q: Do I need API credits?**
A: No! The app uses smart rules for categorization and advice. Optional AI API integration requires credits.

**Q: Can I use this with multiple devices?**
A: With Supabase enabled, yes. In demo mode, data stays on one device.

**Q: Is it free to deploy?**
A: Yes! Vercel has a free tier. Supabase also offers a free tier with database storage.

## License

MIT - Use freely for personal and commercial projects.

## Support

- 📖 [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- 🐛 [Report Issues](https://github.com/your-repo/issues)
- 💬 [Discussions](https://github.com/your-repo/discussions)

---

Built with ❤️ using Next.js and modern web technologies.
