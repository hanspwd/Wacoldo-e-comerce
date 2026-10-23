import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface FormGridProps {
  children: ReactNode;
  className?: string;
}

export const FormGrid = ({ children, className }: FormGridProps) => (
  <div className={cn('row g-3', className)}>{children}</div>
);

type Span = 12 | 6 | 4 | 8;

interface FormColProps {
  span?: Span;
  children: ReactNode;
  className?: string;
}

export const FormCol = ({ span = 12, children, className }: FormColProps) => (
  <div className={cn('col-12', span !== 12 && `col-md-${span}`, className)}>{children}</div>
);
