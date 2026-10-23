import { useId } from 'react';
import { cn } from '@/utils/cn';
import { ActionBar } from './ActionGroup';
import type { ActionNode } from './ActionGroup';

interface QuantityStepperProps {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  label?: string;
  compact?: boolean;
}

export const QuantityStepper = ({
  value,
  min = 1,
  max,
  onChange,
  disabled = false,
  label = 'Cantidad',
  compact = false,
}: QuantityStepperProps) => {
  const id = useId();
  const puedeBajar = !disabled && value > min;
  const puedeSubir = !disabled && value < max;

  const actions: ActionNode[] = [
    {
      keyId: 'menos',
      variant: 'soft',
      size: compact ? 'sm' : 'md',
      icon: 'minus',
      ariaLabel: `Disminuir ${label.toLowerCase()}`,
      disabled: !puedeBajar,
      onClick: () => onChange(Math.max(min, value - 1)),
    },
    {
      keyId: 'mas',
      variant: 'soft',
      size: compact ? 'sm' : 'md',
      icon: 'plus',
      ariaLabel: `Aumentar ${label.toLowerCase()}`,
      disabled: !puedeSubir,
      onClick: () => onChange(Math.min(max, value + 1)),
    },
  ];

  return (
    <div className={cn('quantity-stepper', compact && 'quantity-stepper--compact')}>
      <label id={`${id}-label`} className="visually-hidden">
        {label}
      </label>
      <ActionBar nodes={actions} align="center" wrap={false} aria-labelledby={`${id}-label`} />
      <output className="quantity-stepper__value" aria-live="polite" aria-labelledby={`${id}-label`}>
        {value}
      </output>
      <span className="visually-hidden">de {max}</span>
    </div>
  );
};
