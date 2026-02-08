# 🤖 Agent Instructions Template

> **Copy-paste ready template for integrating your AI agent with the Activity Dashboard**

This document provides everything you need to integrate your agent with the dashboard. Simply copy the code snippets and adapt them to your use case.

---

## Table of Contents

- [Quick Integration](#quick-integration)
- [Language-Specific Examples](#language-specific-examples)
  - [TypeScript/JavaScript](#typescriptjavascript)
  - [Python](#python)
  - [cURL/Shell](#curlshell)
- [Integration Patterns](#integration-patterns)
- [Configuration](#configuration)
- [Best Practices](#best-practices)
- [Error Handling](#error-handling)
- [Complete Examples](#complete-examples)

---

## Quick Integration

### 3-Step Setup

**Step 1: Register Your Agent**
```typescript
await reporter.register({ name: 'MyAgent', type: 'code' });
```

**Step 2: Report Progress**
```typescript
await reporter.updateTask('Working on task', progress);
```

**Step 3: Mark Complete**
```typescript
await reporter.complete();
```

---

## Language-Specific Examples

### TypeScript/JavaScript

#### Installation

```bash
# If using the SDK from this repo
import { AgentReporter } from './sdk/agent-reporter';

# Or copy the SDK class to your project
```

#### Basic Usage

```typescript
import { AgentReporter } from './sdk/agent-reporter';

async function myAgent() {
  // Initialize the reporter
  const reporter = new AgentReporter('http://localhost:3000');
  
  try {
    // 1. Register
    await reporter.register({
      name: 'MyAgentName',
      type: 'code', // or 'research', 'content', 'data', 'testing'
    });
    
    // 2. Do your work and report progress
    await reporter.updateTask('Analyzing requirements', 10);
    // ... your code here ...
    
    await reporter.updateTask('Implementing solution', 50);
    // ... more code ...
    
    await reporter.updateTask('Testing and validation', 90);
    // ... final code ...
    
    // 3. Mark as complete
    await reporter.complete();
    
  } catch (error) {
    // Report errors to the dashboard
    await reporter.setError(error.message);
  } finally {
    // Cleanup
    await reporter.cleanup();
  }
}

myAgent();
```

#### Advanced Usage with Custom Heartbeats

```typescript
import { AgentReporter } from './sdk/agent-reporter';

class CustomAgent {
  private reporter: AgentReporter;
  
  constructor(dashboardUrl: string = 'http://localhost:3000') {
    this.reporter = new AgentReporter(dashboardUrl);
  }
  
  async start() {
    await this.reporter.register({
      name: 'CustomAgent',
      type: 'code',
    });
  }
  
  async processTask(task: string) {
    await this.reporter.updateTask(`Processing: ${task}`, 0);
    
    // Simulate work with progress updates
    for (let i = 0; i <= 100; i += 10) {
      await this.reporter.updateTask(`Processing: ${task}`, i);
      await this.delay(1000); // Your actual work here
    }
  }
  
  async handleBlocked(reason: string) {
    await this.reporter.setBlocked(reason);
    // Wait for unblock...
  }
  
  async handleError(error: Error) {
    await this.reporter.setError(error.message);
  }
  
  async finish() {
    await this.reporter.complete();
    await this.reporter.cleanup();
  }
  
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Usage
const agent = new CustomAgent();
await agent.start();
await agent.processTask('Build feature X');
await agent.finish();
```

---

### Python

#### Python Agent Reporter Class

```python
import requests
import time
from typing import Literal

AgentType = Literal['code', 'research', 'content', 'data', 'testing']
AgentStatus = Literal['idle', 'working', 'blocked', 'error', 'completed']

class AgentReporter:
    def __init__(self, dashboard_url: str = 'http://localhost:3000'):
        self.dashboard_url = dashboard_url
        self.agent_id = None
        self.api_key = None
        self.is_registered = False
    
    def register(self, name: str, agent_type: AgentType):
        """Register the agent with the dashboard"""
        response = requests.post(
            f'{self.dashboard_url}/api/agents/register',
            json={'name': name, 'type': agent_type},
            headers={'Content-Type': 'application/json'}
        )
        
        if response.status_code != 200:
            raise Exception(f'Registration failed: {response.text}')
        
        data = response.json()
        self.agent_id = data['agentId']
        self.api_key = data['apiKey']
        self.is_registered = True
        
        print(f'Agent registered: {name} ({self.agent_id})')
    
    def heartbeat(self, status: AgentStatus = 'working', 
                  current_task: str = None, progress: int = None):
        """Send a heartbeat to the dashboard"""
        if not self.is_registered:
            print('Warning: Agent not registered')
            return
        
        payload = {}
        if status:
            payload['status'] = status
        if current_task:
            payload['currentTask'] = current_task
        if progress is not None:
            payload['progress'] = progress
        
        response = requests.post(
            f'{self.dashboard_url}/api/agents/{self.agent_id}/heartbeat',
            json=payload,
            headers={
                'Content-Type': 'application/json',
                'X-API-Key': self.api_key
            }
        )
        
        if response.status_code != 200:
            print(f'Heartbeat failed: {response.text}')
    
    def update_task(self, task: str, progress: int = 0):
        """Update current task and progress"""
        self.heartbeat('working', task, progress)
    
    def set_blocked(self, reason: str):
        """Mark agent as blocked"""
        self.heartbeat('blocked', reason)
    
    def set_error(self, error: str):
        """Report an error"""
        self.heartbeat('error', error)
    
    def complete(self):
        """Mark agent work as completed"""
        self.heartbeat('completed')


# Example usage
def main():
    reporter = AgentReporter('http://localhost:3000')
    
    try:
        # Register
        reporter.register('PythonAgent', 'code')
        
        # Do work
        reporter.update_task('Analyzing data', 10)
        time.sleep(2)
        
        reporter.update_task('Processing results', 50)
        time.sleep(2)
        
        reporter.update_task('Generating output', 90)
        time.sleep(2)
        
        # Complete
        reporter.complete()
        print('Agent completed successfully!')
        
    except Exception as e:
        reporter.set_error(str(e))
        print(f'Agent error: {e}')

if __name__ == '__main__':
    main()
```

---

### cURL/Shell

#### Shell Script Integration

```bash
#!/bin/bash

DASHBOARD_URL="http://localhost:3000"
AGENT_NAME="ShellAgent"
AGENT_TYPE="code"

# Register the agent
response=$(curl -s -X POST "$DASHBOARD_URL/api/agents/register" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"$AGENT_NAME\", \"type\": \"$AGENT_TYPE\"}")

# Extract agent ID and API key
AGENT_ID=$(echo $response | jq -r '.agentId')
API_KEY=$(echo $response | jq -r '.apiKey')

echo "Agent registered: $AGENT_ID"

# Function to send heartbeat
send_heartbeat() {
  local status=$1
  local task=$2
  local progress=$3
  
  curl -s -X POST "$DASHBOARD_URL/api/agents/$AGENT_ID/heartbeat" \
    -H "Content-Type: application/json" \
    -H "X-API-Key: $API_KEY" \
    -d "{\"status\": \"$status\", \"currentTask\": \"$task\", \"progress\": $progress}"
}

# Do work
send_heartbeat "working" "Starting build" 0
sleep 2

send_heartbeat "working" "Compiling code" 30
sleep 2

send_heartbeat "working" "Running tests" 70
sleep 2

send_heartbeat "completed" "Build finished" 100

echo "Agent completed!"
```

---

## Integration Patterns

### Pattern 1: Long-Running Task

```typescript
async function longRunningTask() {
  const reporter = new AgentReporter();
  await reporter.register({ name: 'LongTask', type: 'data' });
  
  const totalSteps = 100;
  for (let step = 0; step < totalSteps; step++) {
    // Your work here
    const progress = Math.round((step / totalSteps) * 100);
    await reporter.updateTask(`Processing step ${step}/${totalSteps}`, progress);
    
    // Process data...
  }
  
  await reporter.complete();
}
```

### Pattern 2: Multi-Phase Task

```typescript
async function multiPhaseTask() {
  const reporter = new AgentReporter();
  await reporter.register({ name: 'MultiPhase', type: 'code' });
  
  // Phase 1: Planning
  await reporter.updateTask('Phase 1: Planning', 0);
  await planningPhase();
  await reporter.updateTask('Phase 1: Complete', 25);
  
  // Phase 2: Implementation
  await reporter.updateTask('Phase 2: Implementation', 25);
  await implementationPhase();
  await reporter.updateTask('Phase 2: Complete', 75);
  
  // Phase 3: Testing
  await reporter.updateTask('Phase 3: Testing', 75);
  await testingPhase();
  
  await reporter.complete();
}
```

### Pattern 3: Error Recovery

```typescript
async function taskWithRetry() {
  const reporter = new AgentReporter();
  await reporter.register({ name: 'RetryAgent', type: 'code' });
  
  let retries = 3;
  while (retries > 0) {
    try {
      await reporter.updateTask('Attempting task', 50);
      await riskyOperation();
      await reporter.complete();
      break;
    } catch (error) {
      retries--;
      if (retries === 0) {
        await reporter.setError(`Failed after retries: ${error.message}`);
      } else {
        await reporter.setBlocked(`Retrying... (${retries} left)`);
        await sleep(5000);
      }
    }
  }
}
```

### Pattern 4: Parallel Agents

```typescript
async function parallelAgents() {
  const tasks = [
    runAgent('Agent1', 'code'),
    runAgent('Agent2', 'testing'),
    runAgent('Agent3', 'research'),
  ];
  
  await Promise.all(tasks);
}

async function runAgent(name: string, type: string) {
  const reporter = new AgentReporter();
  await reporter.register({ name, type });
  
  // Do work...
  await reporter.updateTask('Working', 50);
  
  await reporter.complete();
}
```

---

## Configuration

### Dashboard URL Configuration

Set the dashboard URL based on your environment:

```typescript
// Development
const reporter = new AgentReporter('http://localhost:3000');

// Production
const reporter = new AgentReporter('https://dashboard.yourcompany.com');

// From environment variable
const reporter = new AgentReporter(process.env.DASHBOARD_URL);
```

### Agent Types

Choose the appropriate agent type:

```typescript
type AgentType = 
  | 'code'      // Code generation/modification
  | 'research'  // Information gathering
  | 'content'   // Writing/documentation
  | 'data'      // Data processing
  | 'testing'   // QA and testing
```

### Status Values

Your agent can be in these states:

- `idle` - Not working on anything
- `working` - Actively working on a task
- `blocked` - Waiting for something (user input, dependency, etc.)
- `error` - Encountered an error
- `completed` - Finished all tasks

---

## Best Practices

### 1. Register Early
```typescript
// ✅ Good: Register before doing work
await reporter.register({ name: 'MyAgent', type: 'code' });
await doWork();

// ❌ Bad: Register after work is done
await doWork();
await reporter.register({ name: 'MyAgent', type: 'code' });
```

### 2. Update Frequently
```typescript
// ✅ Good: Update at each milestone
await reporter.updateTask('Reading files', 20);
await reporter.updateTask('Processing data', 50);
await reporter.updateTask('Writing output', 80);

// ❌ Bad: No updates
await reporter.updateTask('Working', 0);
// ... lots of work ...
await reporter.complete();
```

### 3. Be Descriptive
```typescript
// ✅ Good: Clear task descriptions
await reporter.updateTask('Compiling 247 TypeScript files', 45);

// ❌ Bad: Vague descriptions
await reporter.updateTask('Processing', 45);
```

### 4. Handle Errors Properly
```typescript
// ✅ Good: Report errors to dashboard
try {
  await riskyOperation();
} catch (error) {
  await reporter.setError(error.message);
  throw error; // Re-throw if needed
}

// ❌ Bad: Silent failures
try {
  await riskyOperation();
} catch (error) {
  console.error(error); // Dashboard doesn't know
}
```

### 5. Always Complete
```typescript
// ✅ Good: Mark completion
await doWork();
await reporter.complete();

// ✅ Better: Use try/finally
try {
  await doWork();
  await reporter.complete();
} finally {
  await reporter.cleanup();
}
```

---

## Error Handling

### Comprehensive Error Handling Pattern

```typescript
async function robustAgent() {
  const reporter = new AgentReporter();
  
  try {
    // Register
    await reporter.register({ name: 'RobustAgent', type: 'code' });
    
    // Main work
    await reporter.updateTask('Starting work', 0);
    await doWork();
    await reporter.complete();
    
  } catch (error) {
    // Report the error to dashboard
    await reporter.setError(error.message);
    
    // Log locally
    console.error('Agent error:', error);
    
    // Optionally re-throw
    throw error;
    
  } finally {
    // Always cleanup
    await reporter.cleanup();
  }
}
```

### Retry Logic

```typescript
async function retryableOperation(reporter: AgentReporter) {
  const maxRetries = 3;
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      await reporter.updateTask(`Attempt ${attempt + 1}/${maxRetries}`, 50);
      await riskyOperation();
      return; // Success
      
    } catch (error) {
      attempt++;
      
      if (attempt === maxRetries) {
        await reporter.setError(`Failed after ${maxRetries} attempts`);
        throw error;
      }
      
      await reporter.setBlocked(`Retrying in 5s (attempt ${attempt}/${maxRetries})`);
      await sleep(5000);
    }
  }
}
```

---

## Complete Examples

### Example 1: Simple Code Generator

```typescript
import { AgentReporter } from './sdk/agent-reporter';

async function codeGeneratorAgent() {
  const reporter = new AgentReporter();
  
  try {
    await reporter.register({ name: 'CodeGen', type: 'code' });
    
    await reporter.updateTask('Reading template', 10);
    const template = await readTemplate();
    
    await reporter.updateTask('Parsing requirements', 30);
    const requirements = await parseRequirements();
    
    await reporter.updateTask('Generating code', 60);
    const code = await generateCode(template, requirements);
    
    await reporter.updateTask('Writing files', 90);
    await writeFiles(code);
    
    await reporter.complete();
    console.log('Code generation complete!');
    
  } catch (error) {
    await reporter.setError(error.message);
    console.error('Failed:', error);
  } finally {
    await reporter.cleanup();
  }
}

codeGeneratorAgent();
```

### Example 2: Research Agent

```typescript
import { AgentReporter } from './sdk/agent-reporter';

async function researchAgent(topic: string) {
  const reporter = new AgentReporter();
  
  try {
    await reporter.register({ name: 'Researcher', type: 'research' });
    
    await reporter.updateTask(`Searching for: ${topic}`, 10);
    const sources = await findSources(topic);
    
    await reporter.updateTask('Reading sources', 40);
    const data = await readSources(sources);
    
    await reporter.updateTask('Analyzing information', 70);
    const analysis = await analyzeData(data);
    
    await reporter.updateTask('Compiling report', 90);
    await generateReport(analysis);
    
    await reporter.complete();
    return analysis;
    
  } catch (error) {
    await reporter.setError(error.message);
    throw error;
  } finally {
    await reporter.cleanup();
  }
}

researchAgent('AI trends 2026');
```

### Example 3: Testing Agent

```typescript
import { AgentReporter } from './sdk/agent-reporter';

async function testingAgent(testSuite: string[]) {
  const reporter = new AgentReporter();
  
  try {
    await reporter.register({ name: 'Tester', type: 'testing' });
    
    const total = testSuite.length;
    let passed = 0;
    let failed = 0;
    
    for (let i = 0; i < total; i++) {
      const test = testSuite[i];
      const progress = Math.round((i / total) * 100);
      
      await reporter.updateTask(`Running: ${test}`, progress);
      
      try {
        await runTest(test);
        passed++;
      } catch (error) {
        failed++;
        console.error(`Test failed: ${test}`, error);
      }
    }
    
    if (failed > 0) {
      await reporter.setError(`${failed} tests failed out of ${total}`);
    } else {
      await reporter.complete();
    }
    
    return { total, passed, failed };
    
  } finally {
    await reporter.cleanup();
  }
}

testingAgent(['test1.js', 'test2.js', 'test3.js']);
```

---

## Next Steps

1. **Copy this template** to your project
2. **Customize** the agent name and type
3. **Integrate** with your existing code
4. **Test** by running your agent and checking the dashboard
5. **Iterate** based on what you see in the dashboard

---

## Support

- 📖 **Full Documentation**: [README.md](README.md)
- 🚀 **Quick Start**: [QUICKSTART.md](QUICKSTART.md)
- 🤖 **API Details**: [AGENT.md](AGENT.md)
- 🐛 **Issues**: [GitHub Issues](https://github.com/KeigoShimadaCC/todotask_ui_claudeswarmtest/issues)

---

**Happy coding! 🚀**
