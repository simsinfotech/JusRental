'use client';

export function FloatingElements() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Primary blob */}
      <div className="blob w-[500px] h-[500px] bg-primary/20 -top-48 -left-48 animate-float" />
      {/* Accent blob */}
      <div className="blob w-[400px] h-[400px] bg-accent/15 top-1/3 -right-32 animate-float-delayed" />
      {/* Small blob */}
      <div className="blob w-[300px] h-[300px] bg-primary/10 bottom-20 left-1/4 animate-pulse-glow" />
    </div>
  );
}
