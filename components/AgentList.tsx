import { Agent } from '@/types/agent';
import { Activity, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface Props {
  agents: Agent[];
}

export function AgentList({ agents }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working': return 'bg-blue-500';
      case 'idle': return 'bg-gray-400';
      case 'blocked': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'working': return <Activity className="w-4 h-4" />;
      case 'blocked': return <AlertCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Active Agents</h2>
      </div>
      <div className="divide-y">
        {agents.map((agent) => (
          <div key={agent.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`}></div>
                  <h3 className="font-semibold text-lg">{agent.name}</h3>
                  <span className="px-2 py-1 text-xs rounded bg-gray-100">
                    {agent.type}
                  </span>
                </div>
                
                {agent.currentTask && (
                  <p className="text-gray-600 mb-2">{agent.currentTask}</p>
                )}
                
                {agent.progress > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all" 
                      style={{ width: `${agent.progress}%` }}
                    ></div>
                  </div>
                )}
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    {getStatusIcon(agent.status)}
                    {agent.status}
                  </span>
                  <span>
                    Last heartbeat: {new Date(agent.lastHeartbeat).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {agents.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No agents registered yet
          </div>
        )}
      </div>
    </div>
  );
}
