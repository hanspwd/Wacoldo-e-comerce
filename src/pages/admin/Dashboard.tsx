import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { esStockCritico } from '../../utils/validaciones';
import { CLAVE_MENSAJES } from '../../utils/datos';

export const Dashboard: React.FC = () => {
  const { user, usuarios } = useAuth();
  const { productos } = useProducts();

  const stockCriticos = productos.filter(
    (p) => p.stock > 0 && esStockCritico(p.stock, p.stockCritico)
  ).length;

  const totalMensajes = (() => {
    try {
      const msgs = JSON.parse(localStorage.getItem(CLAVE_MENSAJES) || '[]');
      return Array.isArray(msgs) ? msgs.length : 0;
    } catch {
      return 0;
    }
  })();

  const esAdmin = user?.tipo === 'Administrador';

  return (
    <>
      <header className="admin-encabezado">
        <h1>¡HOLA {user?.nombre?.toUpperCase()}!</h1>
      </header>

      <section className="stats">
        <article className="tarjeta stat">
          <h3>Productos</h3>
          <p id="stat-productos">{productos.length}</p>
        </article>
        <article className="tarjeta stat">
          <h3>Stock crítico</h3>
          <p id="stat-criticos">{stockCriticos}</p>
        </article>
        <article className="tarjeta stat">
          <h3>Usuarios</h3>
          <p id="stat-usuarios">{usuarios.length}</p>
        </article>
        <article className="tarjeta stat">
          <h3>Mensajes</h3>
          <p id="stat-mensajes">{totalMensajes}</p>
        </article>
      </section>

      <section className="tarjeta">
        <h2>Accesos directos</h2>
        <div className="grupo-botones">
          <Link className="btn btn-primario" to="/admin/producto-form">
            Nuevo producto
          </Link>
          <Link className="btn btn-primario" to="/admin/productos">
            Ver productos
          </Link>
          {esAdmin && (
            <>
              <Link className="btn btn-secundario" to="/admin/usuario-form">
                Nuevo usuario
              </Link>
              <Link className="btn btn-secundario" to="/admin/usuarios">
                Ver usuarios
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  );
};
