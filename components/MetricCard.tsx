import { ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number | string;
  change: number;
  changePercent: number;
  changeLabel: string;
  colorClass?: string;
  valueColor?: string;
}

export default function MetricCard({
  title,
  value,
  change,
  changePercent,
  changeLabel,
  colorClass = 'text-textPrimary',
  valueColor,
}: MetricCardProps) {
  const isPositive = change > 0;
  const isNeutral = change === 0;

  const getTrendIcon = () => {
    if (isNeutral) return <ArrowRight className="w-4 h-4" />;
    if (isPositive) return <ArrowUp className="w-4 h-4" />;
    return <ArrowDown className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (isNeutral) return 'text-textSecondary';

    // For critical and average age, increasing is bad (red)
    // For others, increasing is good (green)
    if (title === 'Critical' || title === 'Average Age') {
      return isPositive ? 'text-warning' : 'text-success';
    }
    return isPositive ? 'text-success' : 'text-warning';
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
      <h3 className="text-sm font-semibold text-textSecondary mb-2">{title}</h3>
      <div className={`text-3xl font-bold mb-2 ${valueColor || colorClass}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
        {getTrendIcon()}
        <span>
          {change !== 0 && (change > 0 ? '+' : '')}
          {change !== 0 && typeof value === 'number' ? change : '0'}
          {changePercent !== 0 && ` (${changePercent > 0 ? '+' : ''}${changePercent}%)`}
        </span>
      </div>
      <div className="text-xs text-textSecondary mt-1">{changeLabel}</div>
    </div>
  );
}
