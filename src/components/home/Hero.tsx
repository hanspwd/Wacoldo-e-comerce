import type { Producto } from '@/types';
import { ActionBar } from '@/components/ui/ActionGroup';
import type { ActionNode } from '@/components/ui/ActionGroup';
import { Icon } from '@/components/ui/Icon';
import { Price } from '@/components/ui/Price';

interface HeroProps {
  producto?: Producto;
}

const BENEFICIOS = [
  { icon: 'truck' as const, text: 'Despacho a todo Chile' },
  { icon: 'shield' as const, text: 'Pago seguro Webpay' },
  { icon: 'heart' as const, text: 'Atención personalizada' },
];

export const Hero = ({ producto }: HeroProps) => {
  const actions: ActionNode[] = [
    {
      keyId: 'catalogo',
      label: 'Ver productos',
      to: '/productos',
      variant: 'primary',
      size: 'lg',
      icon: 'arrow-right',
      iconPosition: 'end',
    },
    {
      keyId: 'nosotros',
      label: 'Conoce la tienda',
      to: '/nosotros',
      variant: 'outline',
      size: 'lg',
    },
  ];

  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-12 col-lg-6">
            <span className="hero-eyebrow">
              <Icon name="sparkles" size={17} />
              Tu tienda online de confianza
            </span>
            <h1 className="hero-title">
              Todo lo que buscas, <span>en un solo lugar.</span>
            </h1>
            <p className="hero-description">
              Tecnología, ropa, hogar, deportes y alimentos seleccionados para acompañarte todos
              los días. Compra fácil, rápido y seguro.
            </p>

            <ActionBar nodes={actions} className="hero-actions" />

            <ul className="hero-benefits">
              {BENEFICIOS.map((beneficio) => (
                <li key={beneficio.text}>
                  <span className="hero-benefits__icon">
                    <Icon name={beneficio.icon} size={18} />
                  </span>
                  {beneficio.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-lg-6">
            <div className="hero-visual">
              <div className="hero-visual__glow" aria-hidden="true" />
              <img
                src={producto?.imagen ?? '/img/ariculares_inalambricos.png'}
                alt={producto?.nombre ?? 'Producto destacado'}
                className="hero-visual__image"
                fetchPriority="high"
              />
              {producto && (
                <div className="hero-product-card">
                  <span className="hero-product-card__label">Destacado</span>
                  <p className="hero-product-card__name">{producto.nombre}</p>
                  <Price value={producto.precio} size="md" />
                </div>
              )}
              <div className="hero-float hero-float--top">
                <Icon name="star" size={16} />
                <span>Calidad garantizada</span>
              </div>
              <div className="hero-float hero-float--bottom">
                <Icon name="truck" size={16} />
                <span>Envío a todo Chile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
