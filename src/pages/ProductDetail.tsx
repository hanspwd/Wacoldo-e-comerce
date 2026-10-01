import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { formatearPrecio, esStockCritico } from '../utils/validaciones';

export const ProductDetail: React.FC = () => {
  const { codigo } = useParams<{ codigo: string }>();
  const { productos, obtenerProducto } = useProducts();
  const { agregarProducto } = useCart();

  const producto = codigo ? obtenerProducto(decodeURIComponent(codigo)) : undefined;
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState<{ texto: string; tipo: 'exito' | 'error' } | null>(null);

  if (!producto) {
    return (
      <main className="contenedor">
        <div className="tarjeta">
          <p>Producto no encontrado.</p>
          <Link className="btn btn-primario" to="/productos">
            Volver a productos
          </Link>
        </div>
      </main>
    );
  }

  const sinStock = producto.stock === 0;
  const stockCritico = !sinStock && esStockCritico(producto.stock, producto.stockCritico);
  const esGratis = Number(producto.precio) === 0;

  const handleAnadir = () => {
    const res = agregarProducto(producto, cantidad);
    setMensaje({ texto: res.mensaje, tipo: res.exito ? 'exito' : 'error' });
    setTimeout(() => setMensaje(null), 3500);
  };

  const relacionados = productos
    .filter((p) => p.categoria === producto.categoria && p.codigo !== producto.codigo)
    .slice(0, 4);

  return (
    <main className="contenedor">
      <p className="migas">
        <Link to="/">Home</Link> &gt;{' '}
        <Link to={`/productos?categoria=${encodeURIComponent(producto.categoria)}`}>{producto.categoria}</Link> &gt;{' '}
        <span>{producto.nombre}</span>
      </p>

      <div className="tarjeta">
        <div className="detalle-grid">
          <div>
            <img className="detalle-img" src={producto.imagen} alt={producto.nombre} />
          </div>
          <div>
            <h1>{producto.nombre}</h1>
            <p className="producto-precio">{esGratis ? 'Gratis' : formatearPrecio(producto.precio)}</p>
            <p>{producto.descripcion}</p>
            <p>
              {sinStock && <span className="insignia-sin-stock">Sin stock</span>}
              {stockCritico && <span className="insignia-critico">¡Stock crítico!</span>}
              {esGratis && <span className="insignia-gratis">FREE</span>}
            </p>

            <div className="campo campo-cantidad">
              <label htmlFor="cantidad">Cantidad</label>
              <input
                type="number"
                id="cantidad"
                value={cantidad}
                min={1}
                max={producto.stock}
                disabled={sinStock}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setCantidad(isNaN(val) ? 1 : Math.max(1, Math.min(producto.stock, val)));
                }}
              />
            </div>

            {mensaje && (
              <p
                style={{
                  color: mensaje.tipo === 'exito' ? 'var(--color-exito)' : 'var(--color-error)',
                  fontWeight: 600,
                  marginBottom: '12px',
                }}
              >
                {mensaje.texto}
              </p>
            )}

            <div className="grupo-botones">
              <button
                className="btn btn-primario"
                type="button"
                onClick={handleAnadir}
                disabled={sinStock}
              >
                {sinStock ? 'Sin stock' : 'Añadir al carrito'}
              </button>
              <Link className="btn btn-secundario" to="/productos">
                Volver
              </Link>
            </div>
          </div>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section style={{ marginTop: '32px' }}>
          <h2>Productos relacionados</h2>
          <div className="grid-productos">
            {relacionados.map((p) => (
              <ProductCard key={p.codigo} producto={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
