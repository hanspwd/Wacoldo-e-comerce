import type { Producto } from '@/types';
import { esStockCritico } from '@/utils/validaciones';
import { Badge } from '@/components/ui/Badge';

interface ProductBadgesProps {
  producto: Producto;
}

export const ProductBadges = ({ producto }: ProductBadgesProps) => {
  const sinStock = producto.stock === 0;
  const stockCritico = !sinStock && esStockCritico(producto.stock, producto.stockCritico);
  const esGratis = Number(producto.precio) === 0;

  return (
    <div className="product-badges">
      {sinStock && <Badge tone="danger">Sin stock</Badge>}
      {stockCritico && <Badge tone="warning">¡Stock crítico!</Badge>}
      {esGratis && <Badge tone="success">Gratis</Badge>}
    </div>
  );
};
