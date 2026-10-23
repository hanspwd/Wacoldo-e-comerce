import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Producto } from '@/types';
import { CATEGORIAS, CLAVE_CATALOGO, productosIniciales } from '@/data';
import { guardarJSON, leerJSON } from '@/services/storage';

interface ProductContextType {
  productos: Producto[];
  categorias: string[];
  obtenerProducto: (codigo: string) => Producto | undefined;
  guardarProducto: (producto: Producto, enEdicion: boolean) => { exito: boolean; mensaje: string };
  eliminarProducto: (codigo: string) => boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productos, setProductos] = useState<Producto[]>(() => {
    const guardados = leerJSON<Producto[]>(CLAVE_CATALOGO, productosIniciales);
    return Array.isArray(guardados) && guardados.length > 0 ? guardados : productosIniciales;
  });

  useEffect(() => {
    guardarJSON(CLAVE_CATALOGO, productos);
  }, [productos]);

  const obtenerProducto = useCallback(
    (codigo: string) => productos.find((producto) => producto.codigo === codigo),
    [productos]
  );

  const guardarProducto = useCallback(
    (producto: Producto, enEdicion: boolean) => {
      if (!enEdicion) {
        if (productos.some((item) => item.codigo === producto.codigo)) {
          return { exito: false, mensaje: 'Ya existe un producto con este código.' };
        }
        setProductos((prev) => [...prev, producto]);
      } else {
        setProductos((prev) =>
          prev.map((item) => (item.codigo === producto.codigo ? producto : item))
        );
      }

      return {
        exito: true,
        mensaje: enEdicion ? 'Producto actualizado con éxito.' : 'Producto creado con éxito.',
      };
    },
    [productos]
  );

  const eliminarProducto = useCallback((codigo: string) => {
    setProductos((prev) => prev.filter((producto) => producto.codigo !== codigo));
    return true;
  }, []);

  const value = useMemo(
    () => ({
      productos,
      categorias: CATEGORIAS,
      obtenerProducto,
      guardarProducto,
      eliminarProducto,
    }),
    [productos, obtenerProducto, guardarProducto, eliminarProducto]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de ProductProvider');
  }
  return context;
};
