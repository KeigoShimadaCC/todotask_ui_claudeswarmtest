# 🚀 Quick Start Guide

Get your Agent Activity Dashboard up and running in 5 minutes!

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [First Time Setup](#first-time-setup)
- [Running the Dashboard](#running-the-dashboard)
- [Connecting Your First Agent](#connecting-your-first-agent)
- [Verifying Everything Works](#verifying-everything-works)
- [Next Steps](#next-steps)

---

## Prerequisites

Before you begin, make sure you have:

✅ **Node.js** (v18 or v20 LTS recommended) - [Download here](https://nodejs.org/)  
✅ **npm** (comes with Node.js) or **yarn**  
✅ **Git** - [Download here](https://git-scm.com/)

**Verify your installation:**

```bash
node --version   # Should show v18.x or v20.x
npm --version    # Should show 8.0.0 or higher
git --version    # Should show 2.0.0 or higher
```

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/KeigoShimadaCC/todotask_ui_claudeswarmtest.git
cd todotask_ui_claudeswarmtest
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (~2-3 minutes).

---

## First Time Setup

### Step 3: Generate Prisma Client

```bash
npx prisma generate
```

### Step 4: Initialize the Database

```bash
npx prisma migrate dev
```

This creates the SQLite database and applies all migrations.

**You should see:**
```
✔ Generated Prisma Client
✔ Your database is now in sync with your schema
```

### Step 5: Create Environment File (Optional)

Create a `.env` file in the root directory if you need custom configuration:

```bash
# Default values (optional, works without this file)
DATABASE_URL="file:./prisma/dev.db"
PORT=3000
```

---

## Running the Dashboard

### Step 6: Start the Development Server

```bash
npm run dev
```

**You should see:**
```
✓ Ready in 1.2s
Local: http://localhost:3000
```

### Step 7: Open the Dashboard

Open your browser and navigate to:

**http://localhost:3000**

You should see the Agent Activity Dashboard with an empty state (no agents yet).

---

## Connecting Your First Agent

Now let's connect a test agent to verify everything works!

### Step 8: Run the Example Agent

Open a **new terminal** (keep the dev server running) and run:

```bash
npx ts-node examples/agent-example.ts
```

**You should see in the terminal:**
```
Starting test agent: ExampleCodeAgent
Agent registered: ExampleCodeAgent (agent_abc123)
Agent work completed!
```

### Step 9: Watch the Dashboard

Go back to your browser at http://localhost:3000 and you'll see:

✅ **ExampleCodeAgent** appears in the agent list  
✅ Real-time progress updates  
✅ Status changes from "working" to "completed"  
✅ Activity feed showing all actions

**Congratulations! 🎉** Your dashboard is fully operational!

---

## Verifying Everything Works

### Test Multiple Agents

Run multiple agents simultaneously:

```bash
npx ts-node scripts/test-agent.ts
```

If your dev server is on a different port (e.g., 3001):

```bash
PORT=3001 npx ts-node scripts/test-agent.ts
```

This will launch 3 test agents working in parallel. Watch them all on the dashboard!

### Explore the UI

Click around the dashboard to see:

- **Agent Status Cards** - Current state of each agent
- **Activity Feed** - Real-time log of all agent actions
- **Metrics** - Overview statistics
- **Progress Bars** - Visual progress tracking

---

## Next Steps

### For Dashboard Users

1. **Customize the UI** - Edit components in `/components`
2. **Add authentication** - Integrate your auth provider
3. **Deploy to production** - See [README.md](README.md#deployment) for deployment guides
4. **Monitor agents** - Use the dashboard to track your AI agents

### For Agent Developers

1. **Read the Agent Instructions** - See [AGENT_INSTRUCTIONS.md](AGENT_INSTRUCTIONS.md)
2. **Integrate your agent** - Use the SDK to connect your code
3. **Test your integration** - Verify on the dashboard
4. **Handle edge cases** - Implement error handling and retry logic

---

## Common Commands

Here's a quick reference of commands you'll use frequently:

```bash
# Start the dashboard
npm run dev

# Reset the database (clears all data)
npx prisma migrate reset

# View the database in a GUI
npx prisma studio

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

---

## Quick Troubleshooting

### Issue: Port 3000 is already in use

**Solution:** Change the port

```bash
PORT=3001 npm run dev
```

### Issue: Prisma Client errors

**Solution:** Regenerate the Prisma client

```bash
npx prisma generate
```

### Issue: Database is locked

**Solution:** Close any Prisma Studio instances and restart

```bash
# Find and kill Prisma Studio process
pkill -f "prisma studio"
npm run dev
```

### Issue: Changes not reflecting

**Solution:** Clear Next.js cache

```bash
rm -rf .next
npm run dev
```

---

## Project Structure at a Glance

```
todotask_ui_claudeswarmtest/
├── app/               # Next.js pages and API routes
├── components/        # UI components
├── sdk/              # Agent SDK (use this in your agents!)
├── examples/         # Example agent implementations
├── prisma/           # Database schema and migrations
└── scripts/          # Utility scripts
```

---

## Getting Help

- 📖 **Full Documentation**: See [README.md](README.md)
- 🤖 **Agent Integration**: See [AGENT_INSTRUCTIONS.md](AGENT_INSTRUCTIONS.md)
- 🔧 **API Reference**: See [README.md#api-reference](README.md#api-reference)
- 🐛 **Report Issues**: [GitHub Issues](https://github.com/KeigoShimadaCC/todotask_ui_claudeswarmtest/issues)

---

## What's Next?

You're all set! Here are some ideas:

1. **Integrate with your CI/CD** - Have agents report build status
2. **Connect multiple agent types** - Code, research, testing, etc.
3. **Build custom dashboards** - Create views for specific workflows
4. **Add notifications** - Get alerts when agents complete or error
5. **Scale up** - Deploy to production and monitor dozens of agents

**Happy monitoring! 🚀**

---

*This quick start guide is designed to get you up and running fast. For comprehensive documentation, see the [README.md](README.md).*
