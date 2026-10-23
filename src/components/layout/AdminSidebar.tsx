import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_NAV_ITEMS } from '@/config/navigation';
import { useAuth } from '@/context/AuthContext';
import { ActionBar } from '@/components/ui/ActionGroup';
import type { ActionNode } from '@/components/ui/ActionGroup';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/utils/cn';

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const AdminSidebar = ({ open, onClose }: AdminSidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose();
    logout();
    navigate('/');
  };

  const links = ADMIN_NAV_ITEMS.filter((item) => user && item.roles.includes(user.tipo));

  const footerActions: ActionNode[] = [
    {
      keyId: 'tienda',
      label: 'Ver tienda',
      to: '/',
      variant: 'outline',
      size: 'sm',
      icon: 'arrow-left',
      onClick: onClose,
    },
    {
      keyId: 'salir',
      label: 'Cerrar sesión',
      variant: 'ghost',
      size: 'sm',
      icon: 'logout',
      onClick: handleLogout,
    },
  ];

  return (
    <aside
      id="admin-sidebar"
      className={cn('admin-sidebar', open && 'admin-sidebar--open')}
      aria-label="Menú de administración"
    >
      <div className="admin-sidebar__top">
        <Link className="site-brand site-brand--admin" to="/admin">
          <span className="site-brand__mark" aria-hidden="true">
            <Icon name="bag" size={21} />
          </span>
          <span>
            Wacoldo <strong>Store</strong>
          </span>
        </Link>
        <Button
          variant="icon"
          className="admin-sidebar__close d-lg-none"
          ariaLabel="Cerrar menú"
          onClick={onClose}
        >
          <Icon name="close" size={20} />
        </Button>
      </div>

      <p className="admin-sidebar__eyebrow">Panel de administración</p>

      <nav className="admin-nav" aria-label="Secciones del panel">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => cn('admin-nav__link', isActive && 'active')}
            onClick={onClose}
          >
            <Icon name={item.icon ?? 'chevron-right'} size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar__footer">
        {user && (
          <div className="admin-user">
            <span className="admin-user__avatar" aria-hidden="true">
              {user.nombre.charAt(0).toUpperCase()}
            </span>
            <div>
              <p className="admin-user__name">{user.nombre}</p>
              <p className="admin-user__role">{user.tipo}</p>
            </div>
          </div>
        )}
        <ActionBar nodes={footerActions} orientation="vertical" align="start" gap={1} />
      </div>
    </aside>
  );
};
