import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';

export const Products: React.FC = () => {
  const { productos, categorias } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaSeleccionada = searchParams.get('categoria') || '';

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val) {
      setSearchParams({ categoria: val });
    } else {
      setSearchParams({});
    }
  };

  const productosFiltrados = useMemo(() => {
    if (!categoriaSeleccionada) return productos;
    return productos.filter((p) => p.categoria === categoriaSeleccionada);
  }, [productos, categoriaSeleccionada]);

  return (
    <main className="contenedor">
      <h1>PRODUCTOS</h1>
      <div className="campo campo-filtro">
        <label htmlFor="filtro-categoria">Categoría</label>
        <select id="filtro-categoria" value={categoriaSeleccionada} onChange={handleCategoriaChange}>
          <option value="">Todas las categorías</option>
          {categorias.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {productosFiltrados.length === 0 ? (
        <p>No hay productos en esta categoría.</p>
      ) : (
        <div className="grid-productos">
          {productosFiltrados.map((p) => (
            <ProductCard key={p.codigo} producto={p} />
          ))}
        </div>
      )}
    </main>
  );
};
