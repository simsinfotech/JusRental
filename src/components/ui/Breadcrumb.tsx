import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <Link
        href="/"
        className="text-white/60 hover:text-white transition-colors"
      >
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-white/40" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-white/60 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white/90 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
