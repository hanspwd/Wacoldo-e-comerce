import { Link } from 'react-router-dom';
import { CATEGORIAS } from '@/data';
import { PUBLIC_NAV_ITEMS } from '@/config/navigation';
import { Icon } from '@/components/ui/Icon';
import { NewsletterForm } from './NewsletterForm';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4 g-lg-5">
          <div className="col-12 col-lg-4">
            <Link className="site-brand site-brand--footer" to="/">
              <span className="site-brand__mark" aria-hidden="true">
                <Icon name="bag" size={21} />
              </span>
              <span>
                Wacoldo <strong>Store</strong>
              </span>
            </Link>
            <p className="site-footer__description">
              Tu tienda online de confianza. Productos seleccionados, despacho a todo Chile y una
              experiencia de compra simple y segura.
            </p>
            <div className="site-footer__trust">
              <Icon name="shield" size={18} />
              <span>Pago seguro con Webpay Plus</span>
              <img src="/img/integracion-webpay.png" alt="Webpay Plus" />
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h2 className="site-footer__title">Tienda</h2>
            <ul className="site-footer__links">
              {PUBLIC_NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h2 className="site-footer__title">Categorías</h2>
            <ul className="site-footer__links">
              {CATEGORIAS.map((categoria) => (
                <li key={categoria}>
                  <Link to={`/productos?categoria=${encodeURIComponent(categoria)}`}>
                    {categoria}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-lg-4">
            <h2 className="site-footer__title">Newsletter</h2>
            <NewsletterForm />
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="mb-0">© {year} Wacoldo Store. Todos los derechos reservados.</p>
          <p className="mb-0">Hecho con dedicación en Chile.</p>
        </div>
      </div>
    </footer>
  );
};
