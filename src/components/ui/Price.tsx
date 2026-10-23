import { cn } from '@/utils/cn';
import { formatearPrecio } from '@/utils/validaciones';

interface PriceProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Price = ({ value, size = 'md', className }: PriceProps) => {
  const gratis = Number(value) === 0;

  return (
    <span className={cn('price', `price--${size}`, gratis && 'price--free', className)}>
      {gratis ? 'Gratis' : formatearPrecio(value)}
    </span>
  );
};
