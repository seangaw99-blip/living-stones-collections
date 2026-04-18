import { cn } from '@/lib/utils';
import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="label-text block text-outline">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-lg bg-surface-container-lowest px-4 py-3',
            'hairline font-body text-[15px] text-on-surface outline-none',
            'placeholder:text-on-surface-variant/50',
            'transition-colors duration-200',
            'focus:border-secondary',
            error && 'border-error',
            className
          )}
          {...props}
        />
        {error && <p className="text-[12px] text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
