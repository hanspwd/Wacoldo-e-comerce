import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Button } from './Button';
import { Icon, IconName } from './Icon';

export type AlertVariant = 'success' | 'danger' | 'warning' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  icon?: IconName;
  className?: string;
  onDismiss?: () => void;
}

const DEFAULT_ICON: Record<AlertVariant, IconName> = {
  success: 'check',
  danger: 'alert',
  warning: 'alert',
  info: 'info',
};

export const Alert = ({
  variant = 'info',
  title,
  children,
  icon,
  className,
  onDismiss,
}: AlertProps) => (
  <div
    className={cn('alert app-alert d-flex gap-2 align-items-start', `alert-${variant}`, className)}
    role={variant === 'danger' ? 'alert' : 'status'}
  >
    <Icon name={icon ?? DEFAULT_ICON[variant]} size={19} className="flex-shrink-0 mt-1" />
    <div className="flex-grow-1">
      {title && <p className="fw-semibold mb-1">{title}</p>}
      <div className="app-alert__content">{children}</div>
    </div>
    {onDismiss && (
      <Button
        variant="icon"
        size="sm"
        className="app-alert__close ms-2"
        ariaLabel="Cerrar mensaje"
        onClick={onDismiss}
      >
        <Icon name="close" size={16} />
      </Button>
    )}
  </div>
);
