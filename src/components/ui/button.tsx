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
    'bg-primary text-on-primary hover:bg-primary-container',
  ghost:
    'border border-primary/80 text-primary bg-transparent hover:bg-primary hover:text-on-primary',
  text:
    'bg-transparent text-secondary hover:text-primary underline underline-offset-4 decoration-[0.5px] decoration-secondary/60',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-6 py-2.5 text-[14px]',
  default: 'px-8 py-3.5 text-[15px]',
  lg: 'px-8 py-4 text-[15px]',
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
