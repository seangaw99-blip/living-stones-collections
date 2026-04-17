import { cn } from '@/lib/utils';

interface LogoProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const COPPER = '#B87333';

export function Logo({ size = 24, className, strokeWidth = 3 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden="true"
      focusable="false"
    >
      {/* Outer faceted pentagon */}
      <polygon
        points="50,5 92.8,36.1 76.4,86.4 23.6,86.4 7.2,36.1"
        stroke={COPPER}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* Inner pentagon — same shape, scaled ~0.56x, 50% opacity */}
      <polygon
        points="50,25 73.8,42.3 64.7,70.2 35.3,70.2 26.2,42.3"
        stroke={COPPER}
        strokeOpacity="0.5"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}
