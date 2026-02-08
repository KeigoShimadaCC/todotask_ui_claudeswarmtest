# Agent Reporting Instructions

This project uses an Agent Activity Dashboard to monitor all AI agents working on tasks.

## Quick Start for Agents

### 1. Register Yourself

When you start working, register with the dashboard:

**Using curl:**
```bash
curl -X POST http://localhost:3000/api/agents/register \
  -H "Content-Type: application/json" \
  -d '{"name": "YourAgentName", "type": "code"}'
```

Save the returned `agentId` and `apiKey` - you'll need these.

**Using the SDK:**

```typescript
import { AgentReporter } from './sdk/agent-reporter';

const reporter = new AgentReporter();
await reporter.register({
  name: 'MyAgent',
  type: 'code'
});
```

### 2. Report Progress

Send heartbeats regularly (every 30s recommended) and when your status changes:

**Using curl:**

```bash
curl -X POST http://localhost:3000/api/agents/{agentId}/heartbeat \
  -H "Content-Type: application/json" \
  -H "X-API-Key: {your-api-key}" \
  -d '{
    "status": "working",
    "currentTask": "Implementing feature X",
    "progress": 50
  }'
```

**Using the SDK:**

```typescript
await reporter.updateTask('Implementing feature X', 50);
```

### 3. Mark Completion

When finished:

```typescript
await reporter.complete();
```

## Status Values

- `idle` - Not working on anything
- `working` - Actively working
- `blocked` - Waiting for something (user input, dependency, etc.)
- `error` - Encountered an error
- `completed` - Finished all tasks

## Agent Types

- `code` - Code generation/modification
- `research` - Information gathering
- `content` - Writing/documentation
- `data` - Data processing
- `testing` - QA and testing

## Progress Guidelines

Report progress as percentage (0-100):

- 0%: Just started
- 25%: Initial analysis/planning done
- 50%: Half complete
- 75%: Nearly done, testing/refinement
- 100%: Ready for review/delivery

## Best Practices

1. **Register early**: Do this before starting substantive work
2. **Update frequently**: Every significant milestone or status change
3. **Be descriptive**: Make currentTask messages clear and specific
4. **Handle errors**: Set status to 'error' if something goes wrong
5. **Complete properly**: Always call complete() when done

## Example Workflow

```typescript
// Start
await reporter.register({ name: 'FeatureBuilder', type: 'code' });

// Work
await reporter.updateTask('Reading requirements', 10);
await reporter.updateTask('Designing solution', 30);
await reporter.updateTask('Implementing core logic', 60);
await reporter.updateTask('Writing tests', 85);

// If blocked
await reporter.setBlocked('Waiting for API credentials');

// If error
await reporter.setError('Build failed: missing dependency');

// When done
await reporter.complete();
```

## Dashboard URL

- **Local**: http://localhost:3000
- **Production**: (set your deployed URL here)

## Troubleshooting

- **401 Unauthorized**: Check your API key
- **403 Forbidden**: Agent ID doesn't match API key
- **500 Server Error**: Check dashboard logs

For questions, see the main README or check the dashboard at /
