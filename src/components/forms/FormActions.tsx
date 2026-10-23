import { ActionBar } from '@/components/ui/ActionGroup';
import type { ActionNode } from '@/components/ui/ActionGroup';

interface FormActionsProps {
  submitLabel: string;
  cancelTo?: string;
  cancelLabel?: string;
  extra?: ActionNode[];
  align?: 'start' | 'end' | 'between';
}

export const FormActions = ({
  submitLabel,
  cancelTo,
  cancelLabel = 'Cancelar',
  extra = [],
  align = 'end',
}: FormActionsProps) => {
  const nodes: ActionNode[] = [
    ...extra,
    ...(cancelTo
      ? [
          {
            keyId: 'cancelar',
            label: cancelLabel,
            variant: 'outline' as const,
            to: cancelTo,
          },
        ]
      : []),
    {
      keyId: 'guardar',
      label: submitLabel,
      variant: 'primary',
      type: 'submit',
      icon: 'check',
    },
  ];

  return <ActionBar nodes={nodes} align={align} className="form-actions" />;
};
