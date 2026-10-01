import Link from 'next/link';
import { LuHouse, LuSearch, LuBookOpen, LuPhone } from 'react-icons/lu';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-lg">
        <h1 className="text-7xl font-bold text-[#006194] font-[family-name:var(--font-heading)] mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-[var(--muted)] mb-8">
          The page you are looking for doesn&apos;t exist or has been moved. Let us help you find what you need.
        </p>
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          <Link href="/"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#006194] text-white font-medium hover:bg-[#005080] transition-colors">
            <LuHouse className="w-4 h-4" />
            Home
          </Link>
          <Link href="/properties"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-light border border-glass-border font-medium hover:bg-surface-light/80 transition-colors">
            <LuSearch className="w-4 h-4" />
            Properties
          </Link>
          <Link href="/blog"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-light border border-glass-border font-medium hover:bg-surface-light/80 transition-colors">
            <LuBookOpen className="w-4 h-4" />
            Blog
          </Link>
          <Link href="/contact"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-light border border-glass-border font-medium hover:bg-surface-light/80 transition-colors">
            <LuPhone className="w-4 h-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
