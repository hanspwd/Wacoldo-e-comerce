import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { ActionBar } from './ActionGroup';
import type { ActionNode } from './ActionGroup';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
}

export const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  destructive = true,
}: ConfirmDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onCancel();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onCancel]);

  const actions: ActionNode[] = [
    {
      keyId: 'cancelar',
      label: cancelLabel,
      variant: 'outline',
      onClick: onCancel,
    },
    {
      keyId: 'confirmar',
      label: confirmLabel,
      variant: destructive ? 'danger' : 'primary',
      onClick: onConfirm,
    },
  ];

  return (
    <dialog
      ref={dialogRef}
      className="app-dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div className="app-dialog__body">
        <h2 id={titleId} className="h4 mb-2">
          {title}
        </h2>
        <div id={descriptionId} className="text-secondary mb-4">
          {description}
        </div>
        <ActionBar nodes={actions} align="end" />
      </div>
    </dialog>
  );
};
