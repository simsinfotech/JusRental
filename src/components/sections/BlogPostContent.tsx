'use client';

interface BlogPostContentProps {
  content: string;
}

export function BlogPostContent({ content }: BlogPostContentProps) {
  return (
    <div className="prose prose-lg max-w-none
      prose-headings:font-[family-name:var(--font-heading)] prose-headings:text-[var(--foreground)]
      prose-p:text-[var(--muted)] prose-p:leading-relaxed
      prose-a:text-[#006194] prose-a:no-underline hover:prose-a:underline
      prose-strong:text-[var(--foreground)]
      prose-li:text-[var(--muted)]
      prose-table:text-sm
      prose-th:bg-surface-light prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-medium
      prose-td:px-4 prose-td:py-2 prose-td:border-t prose-td:border-glass-border
      prose-code:text-[#006194] prose-code:bg-[#006194]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
      prose-hr:border-glass-border
    ">
      {content.split('\n').map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return null;
        if (trimmed.startsWith('## '))
          return <h2 key={i} className="text-2xl font-bold mt-10 mb-4">{trimmed.replace('## ', '')}</h2>;
        if (trimmed.startsWith('### '))
          return <h3 key={i} className="text-xl font-semibold mt-6 mb-3">{trimmed.replace('### ', '')}</h3>;
        if (trimmed.startsWith('- **'))
          return <li key={i} className="ml-4 mb-1 list-disc text-[var(--muted)]" dangerouslySetInnerHTML={{ __html: trimmed.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--foreground)]">$1</strong>') }} />;
        if (trimmed.startsWith('- '))
          return <li key={i} className="ml-4 mb-1 list-disc text-[var(--muted)]">{trimmed.replace('- ', '')}</li>;
        if (/^\d+\.\s/.test(trimmed))
          return <li key={i} className="ml-4 mb-1 list-decimal text-[var(--muted)]" dangerouslySetInnerHTML={{ __html: trimmed.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--foreground)]">$1</strong>') }} />;
        if (trimmed.startsWith('|'))
          return null;
        return <p key={i} className="text-[var(--muted)] leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--foreground)]">$1</strong>') }} />;
      })}
    </div>
  );
}
