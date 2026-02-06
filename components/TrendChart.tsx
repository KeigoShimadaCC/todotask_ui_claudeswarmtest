'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendDataPoint } from '@/types';

interface TrendChartProps {
  data: TrendDataPoint[];
}

export default function TrendChart({ data }: TrendChartProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold mb-4">TODO Count Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis
            dataKey="date"
            stroke="#757575"
            tick={{ fill: '#757575', fontSize: 12 }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
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
              const date = new Date(value as string);
              return date.toLocaleDateString();
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#1976D2"
            strokeWidth={2}
            name="Total TODOs"
            dot={{ fill: '#1976D2', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="critical"
            stroke="#D32F2F"
            strokeWidth={2}
            name="Critical"
            dot={{ fill: '#D32F2F', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="high"
            stroke="#F57C00"
            strokeWidth={2}
            name="High Priority"
            dot={{ fill: '#F57C00', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 p-4 bg-surface rounded-md">
        <div className="flex items-start gap-2">
          <span className="text-lg">📊</span>
          <div className="text-sm text-textSecondary">
            <span className="font-semibold text-textPrimary">Insight:</span> TODO count
            increased 15% this month. Top contributors: src/api/ (+8), src/auth/ (+5)
          </div>
        </div>
      </div>
    </div>
  );
}
