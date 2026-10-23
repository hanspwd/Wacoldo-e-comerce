import type { Producto } from '@/types';
import { ActionBar } from '@/components/ui/ActionGroup';
import type { ActionNode } from '@/components/ui/ActionGroup';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  productos: Producto[];
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ActionNode;
  className?: string;
}

export const ProductGrid = ({
  productos,
  emptyTitle = 'No encontramos productos',
  emptyDescription = 'Prueba con otra categoría o limpia los filtros para ver todo el catálogo.',
  emptyAction,
  className,
}: ProductGridProps) => {
  if (productos.length === 0) {
    return (
      <EmptyState
        icon="search"
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction ? <ActionBar nodes={[emptyAction]} /> : undefined}
        className={className}
      />
    );
  }

  return (
    <div className={`row g-4 ${className ?? ''}`.trim()}>
      {productos.map((producto) => (
        <div key={producto.codigo} className="col-12 col-sm-6 col-lg-4 col-xl-3">
          <ProductCard producto={producto} />
        </div>
      ))}
    </div>
  );
};
