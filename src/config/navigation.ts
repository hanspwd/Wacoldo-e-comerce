import type { IconName } from '@/components/ui/Icon';
import type { TipoUsuario } from '@/types';

export interface NavItem {
  label: string;
  to: string;
  end?: boolean;
  icon?: IconName;
}

export interface AdminNavItem extends NavItem {
  roles: TipoUsuario[];
}

export const PUBLIC_NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', to: '/', end: true },
  { label: 'Productos', to: '/productos' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Contacto', to: '/contacto' },
];

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: 'Dashboard', to: '/admin', end: true, icon: 'dashboard', roles: ['Administrador', 'Vendedor'] },
  { label: 'Productos', to: '/admin/productos', icon: 'box', roles: ['Administrador', 'Vendedor'] },
  { label: 'Usuarios', to: '/admin/usuarios', icon: 'users', roles: ['Administrador'] },
];
