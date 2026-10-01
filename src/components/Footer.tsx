import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIAS } from '../utils/datos';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Por favor ingresa un correo válido.');
      return;
    }
    setMensaje('¡Gracias por suscribirte al newsletter!');
    setEmail('');
    setTimeout(() => setMensaje(null), 3500);
  };

  return (
    <footer className="footer">
      <div className="contenedor footer-grid">
        <div>
          <h4>Tienda Web</h4>
          <p>Tu tienda online de confianza.</p>
          <p className="pago-footer">
            <img className="pago-logo" src="/img/integracion-webpay.png" alt="Pago seguro con Webpay Plus" />
          </p>
        </div>

        <div>
          <h4>Categorías</h4>
          <p>
            {CATEGORIAS.map((c) => (
              <Link key={c} className="cat-pill" to={`/productos?categoria=${encodeURIComponent(c)}`}>
                {c}
              </Link>
            ))}
          </p>
        </div>

        <div>
          <h4>Newsletter</h4>
          <form id="form-newsletter" onSubmit={handleNewsletter}>
            <div className="grupo-botones">
              <input
                type="email"
                id="newsletter-correo"
                placeholder="Enter Email"
                aria-label="Correo newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn-secundario" type="submit">
                Subscribe
              </button>
            </div>
            {mensaje && <p style={{ color: 'var(--color-exito)', marginTop: '8px', fontSize: '0.9rem' }}>{mensaje}</p>}
          </form>
        </div>
      </div>
    </footer>
  );
};
