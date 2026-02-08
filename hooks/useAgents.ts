import { useQuery } from '@tanstack/react-query';
import { Agent, DashboardStats } from '@/types/agent';

interface AgentsResponse {
  agents: Agent[];
  stats: DashboardStats;
  timestamp: string;
}

export function useAgents(refetchInterval = 5000) {
  return useQuery<AgentsResponse>({
    queryKey: ['agents'],
    queryFn: async () => {
      const res = await fetch('/api/agents');
      if (!res.ok) throw new Error('Failed to fetch agents');
      return res.json();
    },
    refetchInterval,
    staleTime: 3000,
  });
}
