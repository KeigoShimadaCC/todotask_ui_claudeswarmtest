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

Environment variables (create `.env`):

```
DATABASE_URL="file:./prisma/dev.db"
```

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
│   └── ActivityFeed.tsx  # Activity feed
├── hooks/                # Custom React hooks
│   └── useAgents.ts      # Agent data fetching
├── sdk/                  # Agent SDK
│   └── agent-reporter.ts # Reporter class
├── types/                # TypeScript types
│   └── agent.ts          # Agent types
├── prisma/               # Database
│   └── schema.prisma     # Database schema
└── scripts/              # Utility scripts
    └── test-agent.ts     # Test agent script
```

## Testing

Run test agents:

```bash
npx ts-node scripts/test-agent.ts
```

## License

MIT
