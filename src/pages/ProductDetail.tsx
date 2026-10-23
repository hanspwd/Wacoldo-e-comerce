import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';
import { useToast } from '@/context/ToastContext';
import { ActionBar } from '@/components/ui/ActionGroup';
import type { ActionNode } from '@/components/ui/ActionGroup';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Icon } from '@/components/ui/Icon';
import { Price } from '@/components/ui/Price';
import { ProductBadges } from '@/components/product/ProductBadges';
import { ProductGrid } from '@/components/product/ProductGrid';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { usePageTitle } from '@/hooks/usePageTitle';

const BENEFICIOS = [
  { icon: 'truck' as const, title: 'Despacho a todo Chile', text: 'Recibe en la comodidad de tu hogar.' },
  { icon: 'shield' as const, title: 'Compra protegida', text: 'Pago seguro con Webpay Plus.' },
  { icon: 'heart' as const, title: 'Atención cercana', text: 'Te acompañamos antes y después de comprar.' },
];

export const ProductDetail = () => {
  const { codigo } = useParams<{ codigo: string }>();
  const { productos, obtenerProducto } = useProducts();
  const { agregarProducto } = useCart();
  const { showToast } = useToast();

  const codigoProducto = codigo ? decodeURIComponent(codigo) : '';
  const producto = useMemo(
    () => (codigoProducto ? obtenerProducto(codigoProducto) : undefined),
    [codigoProducto, obtenerProducto]
  );

  const [cantidadState, setCantidadState] = useState({
    codigo: codigoProducto,
    cantidad: 1,
  });
  const cantidad =
    cantidadState.codigo === codigoProducto ? cantidadState.cantidad : 1;
  const setCantidad = (nuevaCantidad: number) => {
    setCantidadState({ codigo: codigoProducto, cantidad: nuevaCantidad });
  };

  usePageTitle(producto?.nombre ?? 'Producto');

  const relacionados = useMemo(() => {
    if (!producto) return [];
    return productos
      .filter((item) => item.categoria === producto.categoria && item.codigo !== producto.codigo)
      .slice(0, 4);
  }, [producto, productos]);

  if (!producto) {
    return (
      <div className="page container page-stack">
        <EmptyState
          icon="search"
          title="Producto no encontrado"
          description="El producto que buscas no existe o dejó de estar disponible."
          action={
            <ActionBar
              nodes={[
                {
                  keyId: 'volver',
                  label: 'Volver a productos',
                  to: '/productos',
                  variant: 'primary',
                  icon: 'arrow-left',
                },
              ]}
            />
          }
        />
      </div>
    );
  }

  const sinStock = producto.stock === 0;
  const acciones: ActionNode[] = [
    {
      keyId: 'agregar',
      label: sinStock ? 'Producto agotado' : 'Añadir al carrito',
      variant: 'primary',
      size: 'lg',
      icon: 'cart',
      disabled: sinStock,
      onClick: () => {
        const resultado = agregarProducto(producto, cantidad);
        showToast(resultado.mensaje, resultado.exito ? 'success' : 'danger');
      },
    },
    {
      keyId: 'volver',
      label: 'Seguir comprando',
      to: '/productos',
      variant: 'outline',
      size: 'lg',
    },
  ];

  return (
    <div className="page container page-stack">
      <Breadcrumbs
        items={[
          { label: 'Inicio', to: '/' },
          {
            label: producto.categoria,
            to: `/productos?categoria=${encodeURIComponent(producto.categoria)}`,
          },
          { label: producto.nombre },
        ]}
      />

      <div className="row g-4 g-lg-5">
        <div className="col-12 col-lg-6">
          <Card className="product-detail__media">
            <img src={producto.imagen} alt={producto.nombre} className="product-detail__image" />
            <div className="product-detail__media-footer">
              <Badge tone="primary">{producto.categoria}</Badge>
              <span>SKU: {producto.codigo}</span>
            </div>
          </Card>
        </div>

        <div className="col-12 col-lg-6">
          <Card className="product-detail__info">
            <div className="card-body">
              <ProductBadges producto={producto} />
              <h1 className="product-detail__title">{producto.nombre}</h1>
              <Price value={producto.precio} size="lg" />
              <p className="product-detail__description">{producto.descripcion}</p>

              <div className="product-detail__stock">
                <Icon name={sinStock ? 'alert' : 'check'} size={18} />
                <span>
                  {sinStock
                    ? 'Sin unidades disponibles por ahora.'
                    : `${producto.stock} unidades disponibles en stock.`}
                </span>
              </div>

              <div className="product-detail__purchase">
                <div>
                  <span className="form-label fw-semibold d-block">Cantidad</span>
                  <QuantityStepper
                    value={cantidad}
                    max={Math.max(1, producto.stock)}
                    disabled={sinStock}
                    onChange={setCantidad}
                    label={`Cantidad de ${producto.nombre}`}
                  />
                </div>
                <span className="product-detail__subtotal">
                  Total: <Price value={producto.precio * cantidad} size="md" />
                </span>
              </div>

              <ActionBar nodes={acciones} className="product-detail__actions" />

              <ul className="product-detail__benefits">
                {BENEFICIOS.map((beneficio) => (
                  <li key={beneficio.title}>
                    <span className="product-detail__benefit-icon">
                      <Icon name={beneficio.icon} size={18} />
                    </span>
                    <div>
                      <strong>{beneficio.title}</strong>
                      <span>{beneficio.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="page-section">
          <div className="section-header">
            <div>
              <h2 className="section-header__title">También te puede interesar</h2>
              <p className="section-header__description">
                Más productos de la categoría {producto.categoria}.
              </p>
            </div>
            <Link to={`/productos?categoria=${encodeURIComponent(producto.categoria)}`}>
              Ver categoría
            </Link>
          </div>
          <ProductGrid productos={relacionados} />
        </section>
      )}
    </div>
  );
};
