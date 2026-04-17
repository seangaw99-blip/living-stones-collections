import { cn } from '@/lib/utils';

type TagVariant = 'rare' | 'collector-grade' | '1-left' | 'sold';

interface TagProps {
  variant: TagVariant;
  className?: string;
}

const labels: Record<TagVariant, string> = {
  rare: 'Rare',
  'collector-grade': 'Collector grade',
  '1-left': '1 left',
  sold: 'Sold',
};

const variantStyles: Record<TagVariant, string> = {
  rare: 'border-secondary/70 text-secondary bg-surface-container-highest',
  'collector-grade': 'border-outline/70 text-outline bg-surface-container-highest',
  '1-left': 'border-secondary/70 text-secondary bg-surface-container-highest',
  sold: 'border-outline/50 text-on-surface-variant bg-surface-container-high',
};

export function Tag({ variant, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border-[0.5px] px-3 py-1',
        'font-body text-[10px] uppercase tracking-[0.16em]',
        variantStyles[variant],
        className
      )}
    >
      {labels[variant]}
    </span>
  );
}
