import { useToast } from '@/context/ToastContext';
import { cn } from '@/utils/cn';
import { Button } from './Button';
import { Icon } from './Icon';

export const ToastViewport = () => {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="toast-viewport" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn('toast app-toast show align-items-center border-0', `app-toast--${toast.type}`)}
          role={toast.type === 'danger' ? 'alert' : 'status'}
        >
          <div className="d-flex align-items-center gap-2">
            <Icon
              name={toast.type === 'success' ? 'check' : toast.type === 'danger' ? 'alert' : 'info'}
              size={20}
              className="flex-shrink-0"
            />
            <div className="toast-body">{toast.message}</div>
            <Button
              variant="ghost"
              size="sm"
              className="ms-auto p-1"
              ariaLabel="Cerrar notificación"
              onClick={() => dismissToast(toast.id)}
            >
              <Icon name="close" size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
