export interface AgentConfig {
  name: string;
  type: 'code' | 'research' | 'content' | 'data' | 'testing';
  dashboardUrl?: string;
}

export class AgentReporter {
  private agentId?: string;
  private apiKey?: string;
  private dashboardUrl: string;
  private interval?: NodeJS.Timeout;
  private isRegistered = false;

  constructor(dashboardUrl: string = 'http://localhost:3000') {
    this.dashboardUrl = dashboardUrl;
  }

  async register(config: AgentConfig): Promise<void> {
    try {
      const res = await fetch(`${this.dashboardUrl}/api/agents/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: config.name,
          type: config.type,
        }),
      });

      if (!res.ok) {
        throw new Error(`Registration failed: ${res.statusText}`);
      }

      const data = await res.json();
      this.agentId = data.agentId;
      this.apiKey = data.apiKey;
      this.isRegistered = true;

      // Auto-heartbeat every 30 seconds
      this.interval = setInterval(() => this.heartbeat(), 30000);
      
      console.log(`Agent registered: ${config.name} (${this.agentId})`);
    } catch (error) {
      console.error('Failed to register agent:', error);
      throw error;
    }
  }

  async heartbeat(
    status?: string,
    currentTask?: string,
    progress?: number
  ): Promise<void> {
    if (!this.isRegistered || !this.agentId || !this.apiKey) {
      console.warn('Agent not registered, skipping heartbeat');
      return;
    }

    try {
      const res = await fetch(
        `${this.dashboardUrl}/api/agents/${this.agentId}/heartbeat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': this.apiKey,
          },
          body: JSON.stringify({ status, currentTask, progress }),
        }
      );

      if (!res.ok) {
        console.error('Heartbeat failed:', res.statusText);
      }
    } catch (error) {
      console.error('Heartbeat error:', error);
    }
  }

  async updateTask(task: string, progress: number = 0): Promise<void> {
    await this.heartbeat('working', task, progress);
  }

  async setBlocked(reason: string): Promise<void> {
    await this.heartbeat('blocked', reason);
  }

  async setError(error: string): Promise<void> {
    await this.heartbeat('error', error);
  }

  async complete(): Promise<void> {
    await this.heartbeat('completed');
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  async cleanup(): Promise<void> {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
