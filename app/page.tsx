'use client';

import { useAgents } from '@/hooks/useAgents';
import MetricCard from '@/components/MetricCard';
import { AgentList } from '@/components/AgentList';
import { ActivityFeed } from '@/components/ActivityFeedAgent';

export default function DashboardPage() {
  const { data, isLoading, error } = useAgents(5000); // Poll every 5s
  
  if (isLoading) {
    return (
      <main className="container mx-auto px-6 py-8">
        <div className="text-center py-12">Loading agents...</div>
      </main>
    );
  }
  
  if (error) {
    return (
      <main className="container mx-auto px-6 py-8">
        <div className="p-8 text-red-500">Error loading agents: {error.message}</div>
      </main>
    );
  }
  
  const { agents = [], stats } = data || {};
  
  return (
    <main className="container mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-8">Agent Activity Dashboard</h1>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Agents"
          value={stats?.total || 0}
          change={0}
          changePercent={0}
          changeLabel="registered"
        />
        <MetricCard
          title="Active Now"
          value={stats?.active || 0}
          change={0}
          changePercent={0}
          changeLabel="working"
          valueColor="text-blue-600"
        />
        <MetricCard
          title="Blocked"
          value={stats?.blocked || 0}
          change={0}
          changePercent={0}
          changeLabel="waiting"
          valueColor={stats?.blocked && stats.blocked > 0 ? 'text-yellow-600' : 'text-gray-600'}
        />
        <MetricCard
          title="Completed"
          value={stats?.completed || 0}
          change={0}
          changePercent={0}
          changeLabel="finished"
          valueColor="text-green-600"
        />
      </div>
      
      {/* Agent List and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AgentList agents={agents} />
        </div>
        <div>
          <ActivityFeed agents={agents} />
        </div>
      </div>
    </main>
  );
}
