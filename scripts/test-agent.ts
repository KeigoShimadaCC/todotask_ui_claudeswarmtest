import { AgentReporter } from '../sdk/agent-reporter';

async function runTestAgent(name: string, duration: number = 10000) {
  const reporter = new AgentReporter('http://localhost:3000');
  
  console.log(`Starting test agent: ${name}`);
  
  try {
    await reporter.register({
      name,
      type: 'code',
    });
    
    const steps = [
      { task: 'Initializing', progress: 0, delay: 1000 },
      { task: 'Reading files', progress: 20, delay: 2000 },
      { task: 'Processing data', progress: 50, delay: 2000 },
      { task: 'Writing output', progress: 80, delay: 2000 },
      { task: 'Finalizing', progress: 95, delay: 1000 },
    ];
    
    for (const step of steps) {
      await reporter.updateTask(step.task, step.progress);
      console.log(`${name}: ${step.task} (${step.progress}%)`);
      await new Promise(resolve => setTimeout(resolve, step.delay));
    }
    
    await reporter.complete();
    console.log(`${name}: Completed!`);
    
  } catch (error: any) {
    console.error(`${name} error:`, error);
    await reporter.setError(error.message);
  }
}

// Run multiple test agents in parallel
Promise.all([
  runTestAgent('TestAgent-1'),
  runTestAgent('TestAgent-2'),
  runTestAgent('TestAgent-3'),
]);
