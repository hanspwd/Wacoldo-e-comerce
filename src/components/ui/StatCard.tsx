import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Icon, IconName } from './Icon';

export type StatTone = 'primary' | 'success' | 'warning' | 'danger';

interface StatCardProps {
  label: string;
  value: ReactNode;
  icon: IconName;
  tone?: StatTone;
  hint?: string;
}

export const StatCard = ({ label, value, icon, tone = 'primary', hint }: StatCardProps) => (
  <article className="card app-card stat-card h-100">
    <div className="card-body d-flex align-items-center gap-3">
      <span className={cn('stat-card__icon', `stat-card__icon--${tone}`)} aria-hidden="true">
        <Icon name={icon} size={22} />
      </span>
      <div>
        <p className="stat-card__label">{label}</p>
        <p className="stat-card__value">{value}</p>
        {hint && <p className="stat-card__hint">{hint}</p>}
      </div>
    </div>
  </article>
);
