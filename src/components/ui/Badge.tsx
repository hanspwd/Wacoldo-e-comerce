import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type BadgeTone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'accent';

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}

export const Badge = ({ tone = 'neutral', children, className }: BadgeProps) => (
  <span className={cn('badge app-badge', `app-badge--${tone}`, className)}>{children}</span>
);
