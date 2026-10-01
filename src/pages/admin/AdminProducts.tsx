import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { formatearPrecio, esStockCritico } from '../../utils/validaciones';

export const AdminProducts: React.FC = () => {
  const { productos, eliminarProducto } = useProducts();

  const handleEliminar = (codigo: string) => {
    if (window.confirm(`¿Eliminar el producto ${codigo}?`)) {
      eliminarProducto(codigo);
    }
  };

  return (
    <>
      <header className="admin-encabezado">
        <h1>Productos</h1>
        <Link className="btn btn-primario" to="/admin/producto-form">
          Nuevo producto
        </Link>
      </header>

      <div className="tarjeta tabla-responsive">
        <table className="tabla">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => {
              const critico = p.stock > 0 && esStockCritico(p.stock, p.stockCritico);
              return (
                <tr key={p.codigo} className={critico ? 'fila-critica' : ''}>
                  <td>{p.codigo}</td>
                  <td>
                    {p.nombre}{' '}
                    {critico && <span className="insignia-critico">¡Stock crítico!</span>}
                  </td>
                  <td>{p.categoria}</td>
                  <td>{p.precio === 0 ? 'Gratis' : formatearPrecio(p.precio)}</td>
                  <td>{p.stock}</td>
                  <td>
                    <div className="grupo-botones">
                      <Link
                        className="btn btn-secundario"
                        to={`/admin/producto-form?codigo=${encodeURIComponent(p.codigo)}`}
                      >
                        Editar
                      </Link>
                      <button
                        className="btn btn-peligro"
                        type="button"
                        onClick={() => handleEliminar(p.codigo)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
