import { BarChart3, Search, Settings, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-info" />
            <h1 className="text-xl font-bold text-textPrimary">TODO Tracker</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-textSecondary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-info/20 focus:border-info"
              />
            </div>
            <button className="p-2 hover:bg-surface rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-textSecondary" />
            </button>
            <button className="p-2 hover:bg-surface rounded-lg transition-colors">
              <User className="w-5 h-5 text-textSecondary" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
