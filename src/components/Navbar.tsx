import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { totalCantidad } = useCart();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="contenedor navbar-contenedor">
        <Link className="navbar-logo" to="/">
          Tienda Web
        </Link>
        <ul className="navbar-menu">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'activo' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/productos" className={({ isActive }) => (isActive ? 'activo' : '')}>
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink to="/nosotros" className={({ isActive }) => (isActive ? 'activo' : '')}>
              Nosotros
            </NavLink>
          </li>
          <li>
            <NavLink to="/blogs" className={({ isActive }) => (isActive ? 'activo' : '')}>
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacto" className={({ isActive }) => (isActive ? 'activo' : '')}>
              Contacto
            </NavLink>
          </li>
        </ul>
        <div className="navbar-carrito">
          <Link to="/carrito">
            Carrito (<span id="insignia-carrito">{totalCantidad}</span>)
          </Link>
        </div>
        <div className="navbar-sesion">
          {user ? (
            <>
              <span>Hola, {user.nombre}</span> |{' '}
              {(user.tipo === 'Administrador' || user.tipo === 'Vendedor') && (
                <>
                  <Link to="/admin">Administración</Link> |{' '}
                </>
              )}
              <a href="#salir" onClick={handleLogout}>
                Salir
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Iniciar sesión</Link> | <Link to="/registro">Registrar usuario</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
