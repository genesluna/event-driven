import { InputHTMLAttributes, ReactElement, forwardRef } from 'react';
import { cn } from '@/app/lib/utils';
import { LucideProps } from 'lucide-react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: ReactElement<LucideProps>;
  className?: string;
  errorMessage?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, className, type, errorMessage, ...props }, ref) => {
    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={props.id}
            className='mb-2 ms-1 block text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {label}
          </label>
        )}
        <div className='relative flex items-center'>
          <input
            type={type}
            ref={ref}
            className={cn(
              'h-10 w-full rounded-md border border-input bg-background pl-10 text-sm text-muted-foreground transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              className,
              {
                'border-red-500 dark:border-red-400': errorMessage,
                'hover:border-primary focus:border-primary dark:hover:border-primary':
                  !errorMessage,
              }
            )}
            {...props}
          />

          <div className='absolute left-4'>{icon}</div>
        </div>
        {errorMessage && (
          <p className='ms-3 mt-2 text-sm text-red-500 dark:text-red-400'>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
