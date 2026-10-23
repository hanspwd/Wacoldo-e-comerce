import { useMemo } from 'react';
import { useProducts } from '@/context/ProductContext';
import { Hero } from '@/components/home/Hero';
import { CategoryStrip } from '@/components/home/CategoryStrip';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ActionBar } from '@/components/ui/ActionGroup';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { usePageTitle } from '@/hooks/usePageTitle';

export const Home = () => {
  const { productos, categorias } = useProducts();
  const destacados = useMemo(() => productos.slice(0, 4), [productos]);

  usePageTitle('Inicio');

  return (
    <div className="page">
      <Hero producto={productos[0]} />

      <section className="container page-section">
        <SectionHeader
          title="Explora por categoría"
          description="Encuentra rápido lo que necesitas en nuestro catálogo."
        />
        <CategoryStrip categories={categorias} />
      </section>

      <section className="container page-section">
        <SectionHeader
          title="Productos destacados"
          description="Una selección de lo más buscado por nuestros clientes."
          action={
            <ActionBar
              nodes={[
                {
                  keyId: 'ver-catalogo',
                  label: 'Ver catálogo completo',
                  to: '/productos',
                  variant: 'outline',
                  icon: 'arrow-right',
                  iconPosition: 'end',
                },
              ]}
              wrap={false}
            />
          }
        />
        <ProductGrid productos={destacados} />
      </section>

      <section className="container page-section">
        <div className="home-cta">
          <div>
            <p className="home-cta__eyebrow">Compra con confianza</p>
            <h2 className="home-cta__title">Una experiencia simple, segura y pensada para ti.</h2>
            <p className="home-cta__text">
              Validación de datos, stock en tiempo real, cupones de descuento y pago protegido con
              Webpay Plus.
            </p>
          </div>
          <ActionBar
            nodes={[
              {
                keyId: 'empezar',
                label: 'Empezar a comprar',
                to: '/productos',
                variant: 'accent',
                size: 'lg',
                icon: 'cart',
              },
              {
                keyId: 'contacto',
                label: 'Hablar con nosotros',
                to: '/contacto',
                variant: 'ghost',
                size: 'lg',
                icon: 'mail',
              },
            ]}
            align="end"
          />
        </div>
      </section>
    </div>
  );
};
