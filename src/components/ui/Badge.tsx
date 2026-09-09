import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'info';
  children: React.ReactNode;
  className?: string;
}

const variants = {
  default: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  success: 'bg-green-500/10 text-green-400 border-green-500/20',
  warning: 'bg-blue-500/10 text-cyan-400 border-blue-500/20',
  info: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
