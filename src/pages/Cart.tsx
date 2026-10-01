import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { formatearPrecio } from '../utils/validaciones';

export const Cart: React.FC = () => {
  const {
    items,
    resumen,
    cambiarCantidad,
    eliminarItem,
    vaciarCarrito,
    aplicarCupon,
    removerCupon,
  } = useCart();
  const { productos } = useProducts();

  const [codigoCupon, setCodigoCupon] = useState('');
  const [toast, setToast] = useState<{ texto: string; tipo: 'exito' | 'error' } | null>(null);

  const handleAplicarCupon = () => {
    if (!codigoCupon.trim()) return;
    const res = aplicarCupon(codigoCupon);
    setToast({ texto: res.mensaje, tipo: res.exito ? 'exito' : 'error' });
    setTimeout(() => setToast(null), 3500);
  };

  const handlePagar = () => {
    vaciarCarrito();
    setToast({ texto: '¡Gracias por tu compra! Pedido generado con éxito.', tipo: 'exito' });
  };

  if (items.length === 0) {
    return (
      <main className="contenedor">
        <h1>Mi carrito de compras</h1>
        <div className="tarjeta">
          <p>Tu carrito está vacío.</p>
          <Link className="btn btn-primario" to="/productos">
            Ver productos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="contenedor">
      <h1>Mi carrito de compras</h1>
      <div className="tarjeta">
        <table className="tabla">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const producto = productos.find((p) => p.codigo === item.codigo);
              const categoria = producto ? producto.categoria : '';
              return (
                <tr key={item.codigo}>
                  <td>
                    <img className="carrito-img" src={item.imagen} alt={item.nombre} />
                  </td>
                  <td>
                    <strong>{item.nombre}</strong>
                    <br />
                    <span>{categoria}</span>
                  </td>
                  <td>{item.precio === 0 ? 'Gratis' : formatearPrecio(item.precio)}</td>
                  <td>
                    <div className="grupo-botones">
                      <button
                        className="btn btn-secundario"
                        type="button"
                        onClick={() => cambiarCantidad(item.codigo, -1)}
                      >
                        -
                      </button>
                      <span style={{ padding: '0 8px', fontWeight: 600 }}>{item.cantidad}</span>
                      <button
                        className="btn btn-secundario"
                        type="button"
                        onClick={() => {
                          const res = cambiarCantidad(item.codigo, 1);
                          if (!res.exito && res.mensaje) {
                            setToast({ texto: res.mensaje, tipo: 'error' });
                            setTimeout(() => setToast(null), 3000);
                          }
                        }}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-peligro"
                        type="button"
                        onClick={() => eliminarItem(item.codigo)}
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

        <p className="total-carrito">
          TOTAL: <strong>{formatearPrecio(resumen.total)}</strong>
        </p>

        {resumen.descuento > 0 && (
          <p style={{ color: 'var(--color-exito)', fontWeight: 600 }}>
            Descuento aplicado ({resumen.cuponAplicado}): -{formatearPrecio(resumen.descuento)} (
            {resumen.porcentajeDescuento}%)
            <button
              onClick={removerCupon}
              style={{
                marginLeft: '12px',
                background: 'none',
                border: 'none',
                color: 'var(--color-error)',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Quitar
            </button>
          </p>
        )}

        <div className="campo campo-cupon">
          <label htmlFor="cupon">Ingrese el cupón de descuento</label>
          <div className="grupo-botones">
            <input
              type="text"
              id="cupon"
              placeholder="Ej: DUOC10 o BIENVENIDA15"
              value={codigoCupon}
              onChange={(e) => setCodigoCupon(e.target.value)}
            />
            <button className="btn btn-secundario" type="button" onClick={handleAplicarCupon}>
              Aplicar
            </button>
          </div>
        </div>

        {toast && (
          <p
            style={{
              color: toast.tipo === 'exito' ? 'var(--color-exito)' : 'var(--color-error)',
              fontWeight: 600,
              margin: '12px 0',
            }}
          >
            {toast.texto}
          </p>
        )}

        <div className="grupo-botones" style={{ marginTop: '16px' }}>
          <button className="btn btn-primario" type="button" onClick={handlePagar}>
            Pagar
          </button>
          <button className="btn btn-peligro" type="button" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
        </div>

        <p className="pago-seguro" style={{ marginTop: '24px' }}>
          Pago 100% seguro con{' '}
          <img className="pago-logo" src="/img/integracion-webpay.png" alt="Webpay Plus" />
        </p>
      </div>
    </main>
  );
};
