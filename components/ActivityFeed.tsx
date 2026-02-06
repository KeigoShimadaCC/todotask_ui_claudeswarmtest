import { Activity } from '@/types';
import { CheckCircle2, Plus } from 'lucide-react';

interface ActivityFeedProps {
  activities: Activity[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🕐 Recent Activity (Last 7 days)
      </h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={`${activity.type}-${activity.todo.id}-${index}`}
            className="flex gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0 hover:bg-surface hover:p-2 hover:-m-2 rounded transition-colors"
          >
            <div className="flex-shrink-0 mt-1">
              {activity.type === 'RESOLVED' ? (
                <CheckCircle2 className="w-5 h-5 text-success" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-info flex items-center justify-center">
                  <Plus className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`font-semibold text-xs px-2 py-1 rounded ${
                      activity.type === 'RESOLVED'
                        ? 'bg-success/10 text-success'
                        : 'bg-info/10 text-info'
                    }`}
                  >
                    {activity.type}
                  </span>
                  <code className="text-sm font-mono text-textSecondary">
                    {activity.todo.file_path}:{activity.todo.line_number}
                  </code>
                </div>
                <span className="text-xs text-textSecondary whitespace-nowrap">
                  {getTimeAgo(activity.timestamp)}
                </span>
              </div>
              <div className="text-sm text-textPrimary mb-1">"{activity.todo.text}"</div>
              <div className="text-xs text-textSecondary">by {activity.todo.author}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full text-center text-sm text-info hover:text-info/80 font-medium py-2 hover:bg-surface rounded transition-colors">
        View Full Activity Log →
      </button>
    </div>
  );
}
