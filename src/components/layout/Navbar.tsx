import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { PUBLIC_NAV_ITEMS } from '@/config/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { ActionGroup } from '@/components/ui/ActionGroup';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/utils/cn';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalCantidad } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate('/');
  };

  const esStaff = user?.tipo === 'Administrador' || user?.tipo === 'Vendedor';

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg site-navbar" aria-label="Navegación principal">
        <div className="container">
          <Link className="navbar-brand site-brand" to="/">
            <span className="site-brand__mark" aria-hidden="true">
              <Icon name="bag" size={21} />
            </span>
            <span>
              Wacoldo <strong>Store</strong>
            </span>
          </Link>

          <div className="d-flex align-items-center gap-2 order-lg-3">
            <Button
              to="/carrito"
              variant="cart"
              size="sm"
              icon="cart"
              ariaLabel={`Carrito de compras, ${totalCantidad} productos`}
              onClick={closeMenu}
            >
              <span className="d-none d-sm-inline">Carrito</span>
              <span key={totalCantidad} className="cart-badge">
                {totalCantidad}
              </span>
            </Button>

            <Button
              variant="icon"
              className="navbar-toggler-custom d-lg-none"
              ariaLabel={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
            >
              <Icon name={open ? 'close' : 'menu'} size={22} />
            </Button>
          </div>

          <div className={cn('collapse navbar-collapse order-lg-2', open && 'show')} id="menu-principal">
            <ul className="navbar-nav site-nav mx-lg-auto">
              {PUBLIC_NAV_ITEMS.map((item) => (
                <li className="nav-item" key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => cn('nav-link', isActive && 'active')}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="navbar-session">
              {user ? (
                <>
                  <span className="navbar-session__welcome">
                    Hola, <strong>{user.nombre}</strong>
                  </span>
                  <ActionGroup gap={2} align="start">
                    {esStaff && (
                      <Button
                        to="/admin"
                        variant="outline"
                        size="sm"
                        icon="dashboard"
                        onClick={closeMenu}
                      >
                        Administración
                      </Button>
                    )}
                    <Button variant="nav" size="sm" icon="logout" onClick={handleLogout}>
                      Salir
                    </Button>
                  </ActionGroup>
                </>
              ) : (
                <ActionGroup gap={2} align="start">
                  <Button
                    to="/login"
                    variant="ghost"
                    size="sm"
                    icon="user"
                    onClick={closeMenu}
                  >
                    Iniciar sesión
                  </Button>
                  <Button to="/registro" variant="accent" size="sm" onClick={closeMenu}>
                    Crear cuenta
                  </Button>
                </ActionGroup>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
