import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
  size?: 'default' | 'lg';
}

export function SectionHeading({
  eyebrow,
  heading,
  subtitle,
  className,
  align = 'left',
  size = 'default',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        align === 'center' && '[&>p]:mx-auto',
        className
      )}
    >
      {eyebrow && (
        <span className="label-text mb-4 block text-outline">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-headline font-normal leading-[1.1] tracking-tight text-primary',
          size === 'default' ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl lg:text-6xl'
        )}
      >
        {heading}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-lg font-body text-[15px] leading-[1.7] text-on-surface-variant">
          {subtitle}
        </p>
      )}
    </div>
  );
}
