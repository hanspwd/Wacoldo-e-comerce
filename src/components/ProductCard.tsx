import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Producto } from '../types';
import { useCart } from '../context/CartContext';
import { formatearPrecio, esStockCritico } from '../utils/validaciones';

interface ProductCardProps {
  producto: Producto;
}

export const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
  const { agregarProducto } = useCart();
  const [toast, setToast] = useState<string | null>(null);

  const handleAgregar = () => {
    const res = agregarProducto(producto, 1);
    setToast(res.mensaje);
    setTimeout(() => setToast(null), 2500);
  };

  const sinStock = producto.stock === 0;
  const stockCritico = !sinStock && esStockCritico(producto.stock, producto.stockCritico);
  const esGratis = Number(producto.precio) === 0;

  return (
    <article className="tarjeta tarjeta-producto">
      <Link to={`/producto/${encodeURIComponent(producto.codigo)}`}>
        <img className="producto-img" src={producto.imagen} alt={producto.nombre} />
      </Link>
      <h3>{producto.nombre}</h3>
      <p className="producto-categoria">{producto.categoria}</p>
      <p className="producto-precio">{esGratis ? 'Gratis' : formatearPrecio(producto.precio)}</p>
      <p>
        {sinStock && <span className="insignia-sin-stock">Sin stock</span>}
        {stockCritico && <span className="insignia-critico">¡Stock crítico!</span>}
        {esGratis && <span className="insignia-gratis">FREE</span>}
      </p>
      {toast && <p style={{ fontSize: '0.85rem', color: 'var(--color-primario)', fontWeight: 600 }}>{toast}</p>}
      <div className="grupo-botones">
        <Link className="btn btn-secundario" to={`/producto/${encodeURIComponent(producto.codigo)}`}>
          Ver detalle
        </Link>
        <button
          className="btn btn-primario"
          type="button"
          onClick={handleAgregar}
          disabled={sinStock}
        >
          {sinStock ? 'Agotado' : 'Añadir'}
        </button>
      </div>
    </article>
  );
};
