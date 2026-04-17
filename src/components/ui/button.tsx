import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'ghost' | 'text';
type ButtonSize = 'default' | 'sm' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-container text-on-primary hover:bg-primary',
  ghost:
    'hairline text-primary bg-transparent hover:bg-surface-container-high',
  text:
    'bg-transparent text-on-surface hover:text-secondary underline underline-offset-4 decoration-[0.5px] decoration-outline/50',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-6 py-2.5 text-[13px]',
  default: 'px-8 py-3.5 text-[14px]',
  lg: 'px-8 py-4 text-[14px]',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'default', children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-body font-medium',
          'transition-colors duration-300',
          'disabled:pointer-events-none disabled:opacity-40',
          variantStyles[variant],
          variant !== 'text' && sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, type ButtonProps, type ButtonVariant };
