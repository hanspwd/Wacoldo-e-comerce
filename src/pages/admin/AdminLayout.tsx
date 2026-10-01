import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <div className="admin-contenedor">
      <aside className="admin-menu">
        <Link className="admin-logo" to="/">
          Tienda Web
        </Link>
        <nav id="admin-menu">
          <NavLink to="/admin" end className={({ isActive }) => (isActive ? 'activo' : '')}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/productos" className={({ isActive }) => (isActive ? 'activo' : '')}>
            Productos
          </NavLink>
          {user?.tipo === 'Administrador' && (
            <NavLink to="/admin/usuarios" className={({ isActive }) => (isActive ? 'activo' : '')}>
              Usuarios
            </NavLink>
          )}
          <a href="#salir" onClick={handleLogout}>
            Salir
          </a>
        </nav>
      </aside>
      <main className="admin-principal">
        <Outlet />
      </main>
    </div>
  );
};
