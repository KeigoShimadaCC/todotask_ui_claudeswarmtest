import { AgentReporter } from '../sdk/agent-reporter';

async function exampleAgent() {
  const reporter = new AgentReporter('http://localhost:3000');
  
  console.log(`Starting test agent: ExampleCodeAgent`);
  
  try {
    // Register
    await reporter.register({
      name: 'ExampleCodeAgent',
      type: 'code',
    });
    
    // Simulate work
    await reporter.updateTask('Analyzing codebase', 0);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await reporter.updateTask('Analyzing codebase', 25);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await reporter.updateTask('Generating code', 50);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await reporter.updateTask('Testing implementation', 75);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Complete
    await reporter.complete();
    console.log('Agent work completed!');
    
  } catch (error: any) {
    console.error('Agent error:', error);
    await reporter.setError(error.message);
  } finally {
    await reporter.cleanup();
  }
}

exampleAgent();
