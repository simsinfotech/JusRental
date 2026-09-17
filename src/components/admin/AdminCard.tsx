'use client';

import type { IconType } from 'react-icons';

interface AdminCardProps {
  label: string;
  value: string | number;
  icon: IconType;
  color: string;
  change?: string;
}

export function AdminCard({ label, value, icon: Icon, color, change }: AdminCardProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        {change && (
          <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
            change.startsWith('+') ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
          }`}>
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-[var(--muted)] mt-1">{label}</p>
    </div>
  );
}
