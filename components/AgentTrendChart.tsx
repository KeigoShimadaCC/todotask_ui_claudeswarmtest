'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AgentMetric {
  id: string;
  timestamp: string;
  totalAgents: number;
  activeAgents: number;
  idleAgents: number;
  blockedAgents: number;
  completedAgents: number;
  errorAgents: number;
}

interface AgentTrendChartProps {
  metrics: AgentMetric[];
}

export default function AgentTrendChart({ metrics }: AgentTrendChartProps) {
  if (!metrics || metrics.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold mb-4">Agent Count Over Time</h2>
        <div className="text-center py-8 text-gray-500">
          No metrics data available yet. Metrics will appear as agents work on tasks.
        </div>
      </div>
    );
  }

  // Transform data for chart
  const chartData = metrics.map((metric) => ({
    timestamp: new Date(metric.timestamp).getTime(),
    date: metric.timestamp,
    Total: metric.totalAgents,
    Active: metric.activeAgents,
    Idle: metric.idleAgents,
    Blocked: metric.blockedAgents,
    Completed: metric.completedAgents,
    Error: metric.errorAgents,
  }));

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold mb-4">Agent Count Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis
            dataKey="timestamp"
            stroke="#757575"
            tick={{ fill: '#757575', fontSize: 12 }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
            }}
          />
          <YAxis stroke="#757575" tick={{ fill: '#757575', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '4px',
            }}
            labelFormatter={(value) => {
              const date = new Date(value as number);
              return date.toLocaleString();
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Total"
            stroke="#1976D2"
            strokeWidth={2}
            dot={{ fill: '#1976D2', r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Active"
            stroke="#388E3C"
            strokeWidth={2}
            dot={{ fill: '#388E3C', r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Blocked"
            stroke="#F57C00"
            strokeWidth={2}
            dot={{ fill: '#F57C00', r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Error"
            stroke="#D32F2F"
            strokeWidth={2}
            dot={{ fill: '#D32F2F', r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 p-4 bg-surface rounded-md">
        <div className="flex items-start gap-2">
          <span className="text-lg">📊</span>
          <div className="text-sm text-textSecondary">
            <span className="font-semibold text-textPrimary">Trend Analysis:</span> Track agent activity patterns over time.
            Monitor active, blocked, and error states to identify performance issues.
          </div>
        </div>
      </div>
    </div>
  );
}
