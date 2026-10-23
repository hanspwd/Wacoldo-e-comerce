import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const SectionHeader = ({ title, description, action, className }: SectionHeaderProps) => (
  <div className={cn('section-header', className)}>
    <div>
      <h2 className="section-header__title">{title}</h2>
      {description && <p className="section-header__description">{description}</p>}
    </div>
    {action}
  </div>
);
