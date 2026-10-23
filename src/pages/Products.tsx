import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { CatalogFilters } from '@/components/product/CatalogFilters';
import { ProductGrid } from '@/components/product/ProductGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { usePageTitle } from '@/hooks/usePageTitle';

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export const Products = () => {
  const { productos, categorias } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoriaSeleccionada = searchParams.get('categoria') ?? '';
  const busqueda = searchParams.get('q') ?? '';

  usePageTitle('Productos');

  const actualizarParametro = useCallback(
    (clave: string, valor: string) => {
      const next = new URLSearchParams(searchParams);
      if (valor) {
        next.set(clave, valor);
      } else {
        next.delete(clave);
      }
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const limpiarFiltros = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const productosFiltrados = useMemo(() => {
    const termino = normalizar(busqueda.trim());

    return productos.filter((producto) => {
      const coincideCategoria =
        !categoriaSeleccionada || producto.categoria === categoriaSeleccionada;
      const coincideBusqueda =
        !termino ||
        normalizar(producto.nombre).includes(termino) ||
        normalizar(producto.descripcion).includes(termino) ||
        normalizar(producto.categoria).includes(termino);

      return coincideCategoria && coincideBusqueda;
    });
  }, [busqueda, categoriaSeleccionada, productos]);

  return (
    <div className="page container page-stack">
      <PageHeader
        eyebrow="Catálogo"
        title="Encuentra tu próximo producto favorito"
        description="Filtra por categoría o busca por nombre. Todos nuestros productos incluyen información de stock actualizada."
      />

      <CatalogFilters
        search={busqueda}
        onSearchChange={(valor) => actualizarParametro('q', valor)}
        category={categoriaSeleccionada}
        onCategoryChange={(valor) => actualizarParametro('categoria', valor)}
        categories={categorias}
        resultCount={productosFiltrados.length}
        onClear={limpiarFiltros}
      />

      <ProductGrid
        productos={productosFiltrados}
        emptyAction={{
          keyId: 'limpiar',
          label: 'Ver todos los productos',
          variant: 'primary',
          onClick: limpiarFiltros,
        }}
      />
    </div>
  );
};
