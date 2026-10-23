import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Icon, IconName } from './Icon';

interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({
  icon = 'box',
  title,
  description,
  action,
  className,
}: EmptyStateProps) => (
  <div className={cn('empty-state', className)}>
    <span className="empty-state__icon" aria-hidden="true">
      <Icon name={icon} size={30} />
    </span>
    <h2 className="h4 mb-2">{title}</h2>
    {description && <p className="text-secondary mb-4">{description}</p>}
    {action}
  </div>
);
