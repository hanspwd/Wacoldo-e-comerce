import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { ActionBar, ActionNode } from './ActionGroup';

interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  description?: string;
  actions?: ActionNode[];
  children?: ReactNode;
  className?: string;
}

export const PageHeader = ({
  title,
  eyebrow,
  description,
  actions,
  children,
  className,
}: PageHeaderProps) => (
  <header className={cn('page-header', className)}>
    <div className="page-header__content">
      {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}
      <h1 className="page-header__title">{title}</h1>
      {description && <p className="page-header__description">{description}</p>}
      {children}
    </div>
    {actions && actions.length > 0 && (
      <ActionBar nodes={actions} align="end" className="page-header__actions" />
    )}
  </header>
);
