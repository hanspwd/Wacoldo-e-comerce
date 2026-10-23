import { forwardRef } from 'react';
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { cn } from '@/utils/cn';
import { Icon, IconName } from './Icon';

export interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

export const Field = ({
  id,
  label,
  error,
  hint,
  required,
  className,
  children,
}: FieldProps) => (
  <div className={cn('app-field', className)}>
    <label htmlFor={id} className="form-label fw-semibold">
      {label}
      {required && (
        <span className="text-danger ms-1" aria-hidden="true">
          *
        </span>
      )}
    </label>
    {children}
    {error ? (
      <p id={`${id}-error`} className="invalid-feedback d-block mb-0" role="alert">
        {error}
      </p>
    ) : (
      hint && (
        <p id={`${id}-hint`} className="form-text mb-0">
          {hint}
        </p>
      )
    )}
  </div>
);

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  icon?: IconName;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { invalid, icon, className, id, ...rest },
  ref
) {
  const input = (
    <input
      ref={ref}
      id={id}
      className={cn('form-control', invalid && 'is-invalid', icon && 'has-icon', className)}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid && id ? `${id}-error` : undefined}
      {...rest}
    />
  );

  if (!icon) return input;

  return (
    <div className="input-icon-wrap">
      <Icon name={icon} size={18} className="input-icon" />
      {input}
    </div>
  );
});

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { invalid, options, placeholder, className, id, ...rest },
  ref
) {
  return (
    <select
      ref={ref}
      id={id}
      className={cn('form-select', invalid && 'is-invalid', className)}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid && id ? `${id}-error` : undefined}
      {...rest}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className, id, ...rest },
  ref
) {
  return (
    <textarea
      ref={ref}
      id={id}
      className={cn('form-control', invalid && 'is-invalid', className)}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid && id ? `${id}-error` : undefined}
      {...rest}
    />
  );
});
