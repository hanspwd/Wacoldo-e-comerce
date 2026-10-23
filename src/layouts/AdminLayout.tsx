import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/utils/cn';

export const AdminLayout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSidebarOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sidebarOpen]);

  return (
    <div className={cn('admin-shell', sidebarOpen && 'admin-shell--menu-open')}>
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>

      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className="admin-backdrop"
        aria-hidden="true"
        onClick={() => setSidebarOpen(false)}
      />

      <div className="admin-content">
        <header className="admin-topbar">
          <Button
            variant="icon"
            className="d-lg-none"
            ariaLabel="Abrir menú"
            onClick={() => setSidebarOpen(true)}
          >
            <Icon name="menu" size={22} />
          </Button>
          <div className="admin-topbar__title">
            <span className="admin-topbar__label">Sesión activa</span>
            <strong>{user?.nombre ?? 'Usuario'}</strong>
          </div>
          <span className={cn('admin-topbar__badge', `admin-topbar__badge--${user?.tipo.toLowerCase()}`)}>
            {user?.tipo}
          </span>
        </header>

        <main id="main-content" className="admin-main">
          <div className="admin-main__inner">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
