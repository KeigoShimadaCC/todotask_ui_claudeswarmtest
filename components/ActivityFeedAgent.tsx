import { Agent } from '@/types/agent';
import { Clock } from 'lucide-react';

interface Props {
  agents: Agent[];
}

export function ActivityFeed({ agents }: Props) {
  // Flatten all logs from all agents and sort by timestamp
  const allLogs = agents
    .flatMap(agent => 
      agent.logs.map(log => ({
        ...log,
        agentName: agent.name,
      }))
    )
    .sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 20);
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
      </div>
      <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
        {allLogs.map((log) => (
          <div key={log.id} className="flex gap-3">
            <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-900">{log.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{log.agentName}</span>
                <span className="text-xs text-gray-400">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {allLogs.length === 0 && (
          <p className="text-center text-gray-500 py-8">No activity yet</p>
        )}
      </div>
    </div>
  );
}
