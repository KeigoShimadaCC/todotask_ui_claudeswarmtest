import { useQuery } from '@tanstack/react-query';

interface AgentMetric {
  id: string;
  timestamp: string;
  totalAgents: number;
  workingAgents: number;
  idleAgents: number;
  blockedAgents: number;
  completedAgents: number;
  errorAgents: number;
}

interface AgentTrendsResponse {
  metrics: AgentMetric[];
  timeRange: {
    start: string;
    end: string;
    hours: number;
  };
}

export function useAgentTrends(hours = 24) {
  return useQuery<AgentTrendsResponse>({
    queryKey: ['agent-trends', hours],
    queryFn: async () => {
      const res = await fetch(`/api/metrics/agent-trends?hours=${hours}`);
      if (!res.ok) throw new Error('Failed to fetch agent trends');
      return res.json();
    },
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000,
  });
}
