import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const FormSection = ({ title, description, children, className }: FormSectionProps) => (
  <section className={cn('form-section', className)}>
    <header className="form-section__header">
      <h2 className="form-section__title">{title}</h2>
      {description && <p className="form-section__description">{description}</p>}
    </header>
    {children}
  </section>
);
