export type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | null;

export interface Todo {
  id: string;
  file_path: string;
  line_number: number;
  todo_type: string; // FIXME, TODO, XXX, etc.
  text: string;
  priority: Priority;
  tags: string[];
  author: string;
  author_email: string;
  commit_hash: string;
  commit_date: string;
  first_seen: string;
  last_seen: string;
  age_days: number;
}

export interface DashboardMetrics {
  total_todos: number;
  total_todos_change: number;
  total_todos_change_percent: number;
  critical_count: number;
  critical_change: number;
  critical_change_percent: number;
  average_age_days: number;
  average_age_change: number;
  resolved_this_week: number;
  resolved_change: number;
  resolved_change_percent: number;
}

export interface TrendDataPoint {
  date: string;
  total: number;
  critical: number;
  high: number;
}

export interface Hotspot {
  path: string;
  count: number;
  percentage: number;
  priority_breakdown: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export interface Activity {
  type: 'NEW' | 'RESOLVED';
  todo: Todo;
  timestamp: string;
}

export interface DateRange {
  label: string;
  value: string;
}
