'use client';

import { LayoutDashboard, ListTodo, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

type NavItem = 'dashboard' | 'todos' | 'trends' | 'teams';

export default function Navigation() {
  const [activeTab, setActiveTab] = useState<NavItem>('dashboard');

  const navItems = [
    { id: 'dashboard' as NavItem, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'todos' as NavItem, label: 'All TODOs', icon: ListTodo },
    { id: 'trends' as NavItem, label: 'Trends', icon: TrendingUp },
    { id: 'teams' as NavItem, label: 'Teams', icon: Users },
  ];

  return (
    <nav className="bg-white border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                  isActive
                    ? 'border-info text-info font-semibold'
                    : 'border-transparent text-textSecondary hover:text-textPrimary'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
