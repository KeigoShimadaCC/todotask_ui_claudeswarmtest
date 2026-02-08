export type AgentStatus = 'idle' | 'working' | 'blocked' | 'completed' | 'error';
export type AgentType = 'code' | 'research' | 'content' | 'data' | 'testing';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed';
export type Priority = 'low' | 'medium' | 'high' | 'critical';

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  status: AgentStatus;
  currentTask: string | null;
  progress: number;
  startedAt: Date;
  lastHeartbeat: Date;
  apiKey: string;
  tasks: Task[];
  logs: ActivityLog[];
}

export interface Task {
  id: string;
  agentId: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  startedAt: Date;
  completedAt: Date | null;
}

export interface ActivityLog {
  id: string;
  agentId: string;
  type: string;
  message: string;
  timestamp: Date;
}

export interface DashboardStats {
  total: number;
  active: number;
  idle: number;
  blocked: number;
  completed: number;
  error: number;
}
