import { Link } from 'react-router-dom';
import type { Producto } from '@/types';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { ActionBar } from '@/components/ui/ActionGroup';
import type { ActionNode } from '@/components/ui/ActionGroup';
import { Card } from '@/components/ui/Card';
import { Price } from '@/components/ui/Price';
import { ProductBadges } from './ProductBadges';

interface ProductCardProps {
  producto: Producto;
}

export const ProductCard = ({ producto }: ProductCardProps) => {
  const { agregarProducto } = useCart();
  const { showToast } = useToast();

  const sinStock = producto.stock === 0;
  const productUrl = `/producto/${encodeURIComponent(producto.codigo)}`;

  const handleAgregar = () => {
    const resultado = agregarProducto(producto, 1);
    showToast(resultado.mensaje, resultado.exito ? 'success' : 'danger');
  };

  const actions: ActionNode[] = [
    {
      keyId: 'detalle',
      label: 'Ver detalle',
      to: productUrl,
      variant: 'outline',
      size: 'sm',
    },
    {
      keyId: 'agregar',
      label: sinStock ? 'Agotado' : 'Añadir',
      variant: 'primary',
      size: 'sm',
      icon: 'cart',
      disabled: sinStock,
      onClick: handleAgregar,
    },
  ];

  return (
    <Card as="article" hover className="product-card h-100">
      <Link to={productUrl} className="product-card__media" aria-label={`Ver ${producto.nombre}`}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="product-card__image"
          loading="lazy"
          decoding="async"
        />
        <span className="product-card__category">{producto.categoria}</span>
      </Link>

      <div className="card-body d-flex flex-column">
        <h3 className="product-card__title">
          <Link to={productUrl}>{producto.nombre}</Link>
        </h3>
        <ProductBadges producto={producto} />
        <div className="d-flex align-items-center justify-content-between mt-auto pt-2">
          <Price value={producto.precio} />
          <span className="product-card__stock">{producto.stock} disponibles</span>
        </div>
        <ActionBar nodes={actions} className="mt-3" />
      </div>
    </Card>
  );
};
