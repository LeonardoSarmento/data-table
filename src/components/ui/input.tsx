import * as React from 'react';

import { cn } from '@/lib/utils';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { hint?: string };

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, hint, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type={type}
        className={cn(
          'border-primary focus-visible:ring-primary flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
      {hint ? (
        <div
          className={`pointer-events-none absolute inset-y-0 end-0 flex items-center ${type === 'number' ? 'pe-10' : 'pe-3'}`}
        >
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>
      ) : null}
    </div>
  );
});

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const inputClasses = cn(
    'flex h-9 w-full rounded-md border border-primary bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
    type === 'password',
    className,
  );

  return (
    <div className={cn('relative', className)}>
      <input type={type === 'password' && showPassword ? 'text' : type} className={inputClasses} ref={ref} {...props} />
      {type === 'password' && (
        <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-x-1 pr-3">
          {showPassword ? (
            <EyeOpenIcon className="cursor-pointer" onClick={togglePasswordVisibility} />
          ) : (
            <EyeClosedIcon className="cursor-pointer" onClick={togglePasswordVisibility} />
          )}
        </div>
      )}
    </div>
  );
});
Input.displayName = 'Input';
InputPassword.displayName = 'InputPassword';

export { Input, InputPassword };
