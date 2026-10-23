import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Button, ButtonProps } from './Button';

export type ActionAlign = 'start' | 'center' | 'end' | 'between';

export interface ActionGroupProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  align?: ActionAlign;
  gap?: 1 | 2 | 3 | 4;
  wrap?: boolean;
  children?: ReactNode;
}

const ALIGN_CLASS: Record<ActionAlign, string> = {
  start: 'justify-content-start',
  center: 'justify-content-center',
  end: 'justify-content-end',
  between: 'justify-content-between',
};

/**
 * Composite del patrón: agrupa acciones y puede contener otros grupos.
 * Se comporta igual que una acción individual para quien lo consume.
 */
export const ActionGroup = ({
  orientation = 'horizontal',
  align = 'start',
  gap = 2,
  wrap = true,
  className,
  children,
  ...rest
}: ActionGroupProps) => (
  <div
    className={cn(
      'd-flex',
      orientation === 'vertical' ? 'flex-column' : 'flex-row',
      ALIGN_CLASS[align],
      `gap-${gap}`,
      wrap && 'flex-wrap',
      'action-group',
      className
    )}
    role="group"
    {...rest}
  >
    {children}
  </div>
);

export interface ActionLeaf extends Omit<ButtonProps, 'children'> {
  kind?: 'action';
  keyId?: string;
  label?: ReactNode;
}

export interface ActionGroupNode extends Omit<ActionGroupProps, 'children'> {
  kind: 'group';
  keyId?: string;
  children: ActionNode[];
}

export type ActionNode = ActionLeaf | ActionGroupNode;

interface ActionBarProps extends Omit<ActionGroupProps, 'children'> {
  nodes: ActionNode[];
}

export const ActionBar = ({ nodes, ...groupProps }: ActionBarProps) => (
  <ActionGroup {...groupProps}>
    {nodes.map((node, index) => {
      if (node.kind === 'group') {
        const { kind: _kind, keyId, children, ...groupNodeProps } = node;
        return (
          <ActionBar key={keyId ?? `group-${index}`} nodes={children} {...groupNodeProps} />
        );
      }

      const { kind: _kind, keyId, label, ...buttonProps } = node;
      return (
        <Button key={keyId ?? `action-${index}`} {...buttonProps}>
          {label}
        </Button>
      );
    })}
  </ActionGroup>
);
