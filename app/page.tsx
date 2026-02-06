import MetricCard from '@/components/MetricCard';
import TrendChart from '@/components/TrendChart';
import CriticalTodosList from '@/components/CriticalTodosList';
import HotspotsPanel from '@/components/HotspotsPanel';
import ActivityFeed from '@/components/ActivityFeed';
import {
  mockMetrics,
  mockTrendData,
  mockTodos,
  mockHotspots,
  mockActivities,
} from '@/lib/mockData';

export default function DashboardPage() {
  return (
    <main className="container mx-auto px-6 py-8">
      {/* Date Range Selector (positioned top right in grid) */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Metric Cards */}
          <MetricCard
            title="Total TODOs"
            value={mockMetrics.total_todos}
            change={mockMetrics.total_todos_change}
            changePercent={mockMetrics.total_todos_change_percent}
            changeLabel="vs last week"
          />
          <MetricCard
            title="Critical"
            value={mockMetrics.critical_count}
            change={mockMetrics.critical_change}
            changePercent={mockMetrics.critical_change_percent}
            changeLabel="vs last week"
            valueColor={mockMetrics.critical_count > 0 ? 'text-critical' : 'text-success'}
          />
          <MetricCard
            title="Average Age"
            value={`${mockMetrics.average_age_days} days`}
            change={mockMetrics.average_age_change}
            changePercent={0}
            changeLabel="vs last week"
          />
          <MetricCard
            title="Resolved"
            value={mockMetrics.resolved_this_week}
            change={mockMetrics.resolved_change}
            changePercent={mockMetrics.resolved_change_percent}
            changeLabel="this week"
            valueColor="text-success"
          />

          {/* Date Range Selector */}
          <div className="flex items-center justify-end">
            <select className="px-4 py-3 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-info/20 focus:border-info">
              <option>Last 7 days</option>
              <option selected>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This sprint</option>
              <option>Custom range</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="mb-6">
        <TrendChart data={mockTrendData} />
      </div>

      {/* Critical TODOs and Hotspots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CriticalTodosList todos={mockTodos} />
        <HotspotsPanel hotspots={mockHotspots} />
      </div>

      {/* Recent Activity */}
      <ActivityFeed activities={mockActivities} />
    </main>
  );
}
