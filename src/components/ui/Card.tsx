import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  hover?: boolean;
  flat?: boolean;
  children: ReactNode;
}

export const Card = ({
  as: Tag = 'div',
  hover = false,
  flat = false,
  className,
  children,
  ...rest
}: CardProps) => (
  <Tag
    className={cn('card app-card', hover && 'app-card--hover', flat && 'app-card--flat', className)}
    {...rest}
  >
    {children}
  </Tag>
);
