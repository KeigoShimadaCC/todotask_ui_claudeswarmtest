# Agent Monitoring Scripts

This directory contains utility scripts for monitoring and maintaining the agent activity dashboard.

## Scripts

### `check-stale-agents.ts`

Detects agents that have stopped sending heartbeats and marks them as stale.

**Purpose:**
- Identifies agents in 'working' or 'blocked' status that haven't sent a heartbeat for 2+ minutes (configurable)
- Automatically updates stale agents to 'error' status
- Creates activity log entries for auditing

**Usage:**
```bash
# Run directly
npm run check-stale-agents

# Or with custom timeout (in milliseconds)
AGENT_STALE_TIMEOUT=180000 npm run check-stale-agents  # 3 minutes

# Run as a cron job (every 5 minutes)
*/5 * * * * cd /path/to/app && npm run check-stale-agents >> /var/log/stale-agents.log 2>&1
```

**Configuration:**
- `AGENT_STALE_TIMEOUT`: Timeout in milliseconds (default: 120000 = 2 minutes)

**Output:**
```
🔍 Checking for stale agents...
   Current time: 2026-02-08T01:42:00.000Z
   Stale threshold: 2026-02-08T01:40:00.000Z
   Timeout: 120s

⚠️  Found 2 stale agent(s):

   • Agent-1 (clxxxxxxxx)
     Status: working
     Current task: Processing data
     Last heartbeat: 2026-02-08T01:38:00.000Z
     Time since: 240s ago

✓ Updated 2 agent(s) to 'error' status
✓ Activity logs created for stale agents

✅ Stale agent check completed
```

---

### `record-metrics.ts`

Records snapshots of current agent statistics for trend analysis.

**Purpose:**
- Captures point-in-time metrics of agent counts by status
- Builds historical data for the Agent Count Over Time chart
- Automatically cleans up old metrics (30+ days)

**Usage:**
```bash
# Run directly
npm run record-metrics

# Run as a cron job (every 15 minutes)
*/15 * * * * cd /path/to/app && npm run record-metrics >> /var/log/metrics.log 2>&1

# Run as a cron job (every 5 minutes for finer granularity)
*/5 * * * * cd /path/to/app && npm run record-metrics >> /var/log/metrics.log 2>&1
```

**What it records:**
- Total agents
- Working agents (status: 'working')
- Idle agents (status: 'idle')
- Blocked agents (status: 'blocked')
- Completed agents (status: 'completed')
- Error agents (status: 'error')

**Output:**
```
📊 Recording agent metrics snapshot...
   Current statistics:
   - Total: 5
   - Active (Working): 2
   - Idle: 1
   - Blocked: 1
   - Completed: 1
   - Error: 0

✅ Metrics recorded successfully at 2026-02-08T01:42:00.000Z
   Cleaned up 15 old metric record(s)
```

---

### `test-agent.ts`

Runs test agents to simulate agent activity for development and testing.

**Purpose:**
- Creates sample agents that report progress
- Useful for testing the dashboard UI
- Helps verify agent reporting functionality

**Usage:**
```bash
npx ts-node scripts/test-agent.ts
```

---

## Recommended Cron Setup

For production environments, set up both scripts to run automatically:

```cron
# Check for stale agents every 5 minutes
*/5 * * * * cd /path/to/app && npm run check-stale-agents >> /var/log/stale-agents.log 2>&1

# Record metrics every 15 minutes (or every 5 for finer granularity)
*/15 * * * * cd /path/to/app && npm run record-metrics >> /var/log/metrics.log 2>&1
```

For development, you can also use a process manager like PM2:

```bash
# Create ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'check-stale-agents',
      script: 'npm',
      args: 'run check-stale-agents',
      cron_restart: '*/5 * * * *',
      autorestart: false
    },
    {
      name: 'record-metrics',
      script: 'npm',
      args: 'run record-metrics',
      cron_restart: '*/15 * * * *',
      autorestart: false
    }
  ]
};
```

---

## Database Schema

These scripts interact with the following models:

### AgentMetrics
```prisma
model AgentMetrics {
  id              String   @id @default(cuid())
  timestamp       DateTime @default(now())
  totalAgents     Int
  workingAgents   Int
  idleAgents      Int
  blockedAgents   Int
  completedAgents Int
  errorAgents     Int
  
  @@index([timestamp])
}
```

### Agent
```prisma
model Agent {
  id            String   @id @default(cuid())
  name          String
  type          String
  status        String   @default("idle")
  currentTask   String?
  progress      Int      @default(0)
  startedAt     DateTime @default(now())
  lastHeartbeat DateTime @default(now())
  apiKey        String   @unique
  tasks         Task[]
  logs          ActivityLog[]
  
  @@index([status])
  @@index([lastHeartbeat])
}
```

---

## Troubleshooting

### Script fails with Prisma errors
- Run `npx prisma generate` to regenerate the Prisma client
- Ensure DATABASE_URL is set in .env
- Check that migrations are up to date with `npx prisma migrate status`

### No data in trend chart
- Ensure `record-metrics.ts` is running periodically
- Check that agents are registering correctly
- Verify API endpoint `/api/metrics/agent-trends` is accessible

### Stale agents not detected
- Check the AGENT_STALE_TIMEOUT value
- Verify agents are sending heartbeats via `/api/agents/:id/heartbeat`
- Ensure the script is running periodically

---

## Contributing

When adding new monitoring scripts:
1. Follow the existing pattern for Prisma client initialization
2. Use proper error handling and logging
3. Add cleanup logic for old data
4. Document usage in this README
5. Update package.json scripts section
