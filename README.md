# Agent Activity Dashboard

Real-time monitoring dashboard for AI agents working on tasks.

## Features

- 📊 Real-time agent status monitoring
- 📈 Activity trends and metrics
- 🔔 Live activity feed
- 🎯 Progress tracking per agent
- 🔐 Secure API key authentication

## Quick Start

### Installation

```bash
npm install
npx prisma migrate dev
npm run dev
```

Dashboard will be available at http://localhost:3000

### For Agents

See [AGENT.md](AGENT.md) for complete instructions on how to report your activities.

Quick example:

```typescript
import { AgentReporter } from './sdk/agent-reporter';

const reporter = new AgentReporter();
await reporter.register({ name: 'MyAgent', type: 'code' });
await reporter.updateTask('Building feature', 50);
await reporter.complete();
```

## API Endpoints

- `POST /api/agents/register` - Register new agent
- `POST /api/agents/:id/heartbeat` - Update status
- `GET /api/agents` - List all agents
- `POST /api/agents/:id/tasks` - Create task

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Prisma + SQLite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State**: React Query
- **Icons**: Lucide React

## Development

```bash
# Install dependencies
npm install

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev

# View database
npx prisma studio
```

## Configuration

Environment variables (create `.env` from `.env.example`):

```bash
# Copy example to create your .env
cp .env.example .env
```

```env
# Database Configuration
DATABASE_URL="file:./dev.db"
```

For Vercel deployment, update `DATABASE_URL` to your production database connection string.

## Monitoring & Maintenance

### Stale Agent Detection

Automatically detect and mark agents that have stopped sending heartbeats:

```bash
# Run once
npm run check-stale-agents

# Or set up a cron job (recommended: every 5 minutes)
*/5 * * * * cd /path/to/app && npm run check-stale-agents
```

Configuration via environment variable:
- `AGENT_STALE_TIMEOUT`: Timeout in milliseconds (default: 120000 = 2 minutes)

### Metrics Collection

Record agent statistics for trend analysis:

```bash
# Run once
npm run record-metrics

# Or set up a cron job (recommended: every 15 minutes)
*/15 * * * * cd /path/to/app && npm run record-metrics
```

The dashboard includes an "Agent Count Over Time" chart that displays:
- Total agents
- Active (working) agents
- Blocked agents
- Error agents

Data is automatically cleaned up after 30 days.

See [scripts/README.md](scripts/README.md) for detailed documentation.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── agents/       # Agent endpoints
│   ├── providers/        # React context providers
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Dashboard page
├── components/            # React components
│   ├── AgentList.tsx     # Agent status list
│   ├── AgentTrendChart.tsx # Agent metrics trend chart
│   └── ActivityFeed.tsx  # Activity feed
├── hooks/                # Custom React hooks
│   ├── useAgents.ts      # Agent data fetching
│   └── useAgentTrends.ts # Agent trends fetching
├── sdk/                  # Agent SDK
│   └── agent-reporter.ts # Reporter class
├── types/                # TypeScript types
│   └── agent.ts          # Agent types
├── prisma/               # Database
│   └── schema.prisma     # Database schema
└── scripts/              # Utility scripts
    ├── test-agent.ts     # Test agent script
    ├── check-stale-agents.ts # Stale agent detection
    ├── record-metrics.ts # Metrics recording
    └── README.md         # Scripts documentation
```

## Testing

Run test agents:

```bash
npx ts-node scripts/test-agent.ts
```

## License

MIT
