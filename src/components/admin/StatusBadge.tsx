import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  active: 'bg-green-500/10 text-green-600 border-green-500/20',
  pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  inactive: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
  published: 'bg-green-500/10 text-green-600 border-green-500/20',
  draft: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
  new: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  read: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
  responded: 'bg-green-500/10 text-green-600 border-green-500/20',
  closed: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
  confirmed: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  completed: 'bg-green-500/10 text-green-600 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-600 border-red-500/20',
  verified: 'bg-green-500/10 text-green-600 border-green-500/20',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize',
        statusStyles[status] || 'bg-gray-500/10 text-gray-500 border-gray-500/20',
        className
      )}
    >
      {status}
    </span>
  );
}
