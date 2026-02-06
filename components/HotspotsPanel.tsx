import { Hotspot } from '@/types';

interface HotspotsPanelProps {
  hotspots: Hotspot[];
}

export default function HotspotsPanel({ hotspots }: HotspotsPanelProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🔥 Top Hotspots
      </h2>
      <div className="space-y-4">
        {hotspots.map((hotspot) => (
          <div
            key={hotspot.path}
            className="cursor-pointer hover:bg-surface hover:p-2 hover:-m-2 rounded transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <code className="text-sm font-mono text-textPrimary">{hotspot.path}</code>
              <span className="text-sm font-semibold text-textPrimary">{hotspot.count}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning rounded-full"
                  style={{ width: `${Math.min(hotspot.percentage * 5, 100)}%` }}
                />
              </div>
              <span className="text-xs text-textSecondary min-w-[40px] text-right">
                ({hotspot.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full text-center text-sm text-info hover:text-info/80 font-medium py-2 hover:bg-surface rounded transition-colors">
        View All Files →
      </button>
    </div>
  );
}
