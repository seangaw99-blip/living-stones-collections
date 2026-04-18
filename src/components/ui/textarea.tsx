import { cn } from '@/lib/utils';
import { type TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="label-text block text-outline">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          rows={5}
          className={cn(
            'w-full resize-none rounded-lg bg-surface-container-lowest px-4 py-3',
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

Textarea.displayName = 'Textarea';

export { Textarea };
