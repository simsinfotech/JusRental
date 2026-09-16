export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#006194]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#006194]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
