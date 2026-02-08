# Agent Activity Dashboard

> Real-time monitoring dashboard for AI agents working on tasks

A comprehensive monitoring and analytics platform designed to track, visualize, and manage multiple AI agents working simultaneously on various tasks. Perfect for teams using AI agents for code generation, research, content creation, data processing, and testing.

---

## 🌟 Features

### Core Capabilities
- **📊 Real-time Agent Monitoring** - Live status updates for all active agents
- **📈 Activity Trends & Metrics** - Historical data and performance analytics
- **🔔 Live Activity Feed** - See agent actions as they happen
- **🎯 Progress Tracking** - Detailed progress bars and completion percentages per agent
- **🔐 Secure API Key Authentication** - Each agent gets unique credentials
- **⚡ Auto-heartbeat System** - Automatic status updates every 30 seconds
- **🎨 Modern UI/UX** - Clean, responsive interface built with Tailwind CSS

### Agent Types Supported
- 🤖 **Code** - Code generation and modification
- 🔍 **Research** - Information gathering and analysis
- ✍️ **Content** - Writing and documentation
- 📊 **Data** - Data processing and transformation
- 🧪 **Testing** - QA and automated testing

---

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get up and running in 5 minutes
- **[Agent Instructions](AGENT_INSTRUCTIONS.md)** - Template for integrating agents
- **[Agent Integration Guide](AGENT.md)** - Complete agent integration documentation
- **[Implementation Summary](IMPLEMENTATION_SUMMARY.md)** - Technical implementation details

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or v20 LTS recommended)
- **npm** or **yarn**
- **Git**

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd todotask_ui_claudeswarmtest

# Install dependencies
npm install

# Generate Prisma client (required)
npx prisma generate

# Set up the database
npx prisma migrate dev

# Start the development server
npm run dev
```

The dashboard will be available at **http://localhost:3000**

### For Agent Developers

Integrate your agent in 3 lines of code:

```typescript
import { AgentReporter } from './sdk/agent-reporter';

const reporter = new AgentReporter();
await reporter.register({ name: 'MyAgent', type: 'code' });
await reporter.updateTask('Building feature', 50);
await reporter.complete();
```

👉 See [AGENT_INSTRUCTIONS.md](AGENT_INSTRUCTIONS.md) for a copy-paste ready template.

---

## 🏗️ Architecture

### Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14 (App Router) | React framework with server components |
| **Language** | TypeScript | Type-safe development |
| **Database** | Prisma + SQLite | ORM and lightweight database |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Charts** | Recharts | Data visualization |
| **State** | React Query | Async state management |
| **Icons** | Lucide React | Beautiful icon library |

### System Architecture

```
┌─────────────────┐         ┌──────────────────┐
│   AI Agents     │────────▶│  Dashboard API   │
│  (Your Code)    │  HTTP   │   (Next.js)      │
└─────────────────┘         └──────────────────┘
                                      │
                                      ▼
                            ┌──────────────────┐
                            │  Prisma + SQLite │
                            │    Database      │
                            └──────────────────┘
                                      │
                                      ▼
                            ┌──────────────────┐
                            │  Dashboard UI    │
                            │  (React + TW)    │
                            └──────────────────┘
```

### Project Structure

```
todotask_ui_claudeswarmtest/
├── app/                      # Next.js App Router
│   ├── api/                 # REST API endpoints
│   │   └── agents/         # Agent management routes
│   │       ├── register/   # Agent registration
│   │       ├── [agentId]/
│   │       │   ├── heartbeat/ # Status updates
│   │       │   └── tasks/     # Task management
│   │       └── route.ts       # List agents
│   ├── providers/          # React context providers
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── AgentList.tsx       # Agent status cards
│   ├── ActivityFeedAgent.tsx # Activity timeline
│   ├── Header.tsx          # Navigation header
│   ├── Navigation.tsx      # Tab navigation
│   ├── MetricCard.tsx      # Metric displays
│   ├── TrendChart.tsx      # Performance charts
│   └── HotspotsPanel.tsx   # Hotspot visualization
├── hooks/                   # Custom React hooks
│   └── useAgents.ts        # Agent data fetching
├── lib/                     # Utility libraries
│   ├── prisma.ts           # Prisma client
│   └── mockData.ts         # Mock data for development
├── sdk/                     # Agent SDK
│   └── agent-reporter.ts   # TypeScript SDK for agents
├── types/                   # TypeScript type definitions
│   ├── agent.ts            # Agent types
│   └── index.ts            # Shared types
├── prisma/                  # Database
│   └── schema.prisma       # Database schema
├── scripts/                 # Utility scripts
│   └── test-agent.ts       # Test agent runner
├── examples/                # Example implementations
│   └── agent-example.ts    # Example agent integration
└── docs/                    # Additional documentation
```

---

## 🔌 API Reference

### Agent Registration

**POST** `/api/agents/register`

Register a new agent and receive credentials.

```json
// Request
{
  "name": "MyAgent",
  "type": "code"
}

// Response
{
  "agentId": "agent_abc123",
  "apiKey": "key_xyz789"
}
```

### Heartbeat / Status Update

**POST** `/api/agents/:id/heartbeat`

Update agent status and current task.

```json
// Headers
{
  "X-API-Key": "key_xyz789"
}

// Request
{
  "status": "working",
  "currentTask": "Implementing feature X",
  "progress": 50
}

// Response
{
  "success": true,
  "lastSeen": "2026-02-08T01:00:00.000Z"
}
```

### List All Agents

**GET** `/api/agents`

Retrieve all registered agents and their current status.

```json
// Response
{
  "agents": [
    {
      "id": "agent_abc123",
      "name": "MyAgent",
      "type": "code",
      "status": "working",
      "currentTask": "Building feature",
      "progress": 50,
      "lastSeen": "2026-02-08T01:00:00.000Z"
    }
  ]
}
```

### Create Task

**POST** `/api/agents/:id/tasks`

Create a new task for an agent.

```json
// Headers
{
  "X-API-Key": "key_xyz789"
}

// Request
{
  "description": "Implement user authentication",
  "priority": "high"
}
```

---

## 🧪 Development

### Running Locally

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server with hot reload
npm run dev

# Open Prisma Studio to view database
npx prisma studio
```

### Building for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

### Testing Agents

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
Test the dashboard with simulated agents:

```bash
# Run a single test agent
npx ts-node examples/agent-example.ts

# Run multiple test agents in parallel
npx ts-node scripts/test-agent.ts

# If your dev server is not on 3000
PORT=3001 npx ts-node scripts/test-agent.ts
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# Optional: Custom port
PORT=3000

# Optional: API rate limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000
```

### Database Setup

The project uses SQLite for simplicity, but you can use any Prisma-supported database:

```bash
# For PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# For MySQL
DATABASE_URL="mysql://user:password@localhost:3306/mydb"
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

After changing the database URL, run:

```bash
npx prisma migrate dev
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Deploy to Other Platforms

The app is a standard Next.js application and can be deployed to:
- **Netlify**
- **AWS Amplify**
- **Railway**
- **Render**
- **DigitalOcean App Platform**

Make sure to:
1. Run `npx prisma generate` in the build step
2. Run `npx prisma migrate deploy` before starting
3. Set the `DATABASE_URL` environment variable

---

## 🐛 Troubleshooting

### Common Issues

**Problem**: `Cannot find module '@prisma/client'`
```bash
# Solution: Generate Prisma client
npx prisma generate
```

**Problem**: Database connection errors
```bash
# Solution: Reset and recreate database
rm -rf prisma/dev.db
npx prisma migrate dev
```

**Problem**: Agent registration fails with 401
- Ensure the dashboard is running on the correct URL
- Check that you're using the correct API key in headers

**Problem**: Dashboard not updating in real-time
- Check that agents are sending heartbeats every 30 seconds
- Verify WebSocket connections (if enabled)
- Check browser console for errors

### Debug Mode

Enable debug logging:

```bash
DEBUG=* npm run dev
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📊 Usage Examples

### Python Agent Integration

```python
import requests

class AgentReporter:
    def __init__(self, dashboard_url='http://localhost:3000'):
        self.dashboard_url = dashboard_url
        self.agent_id = None
        self.api_key = None
    
    def register(self, name, agent_type):
        response = requests.post(
            f'{self.dashboard_url}/api/agents/register',
            json={'name': name, 'type': agent_type}
        )
        data = response.json()
        self.agent_id = data['agentId']
        self.api_key = data['apiKey']
    
    def update_task(self, task, progress):
        requests.post(
            f'{self.dashboard_url}/api/agents/{self.agent_id}/heartbeat',
            headers={'X-API-Key': self.api_key},
            json={'status': 'working', 'currentTask': task, 'progress': progress}
        )
```

### JavaScript/Node.js Agent Integration

See [examples/agent-example.ts](examples/agent-example.ts) for a complete working example.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🔗 Links

- **Repository**: [GitHub](https://github.com/KeigoShimadaCC/todotask_ui_claudeswarmtest)
- **Issues**: [Report bugs or request features](https://github.com/KeigoShimadaCC/todotask_ui_claudeswarmtest/issues)
- **Documentation**: See `/docs` folder for additional guides

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)

---

**Made with ❤️ for the AI agent community**
