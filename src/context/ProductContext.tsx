import React, { createContext, useContext, useState, useEffect } from 'react';
import { Producto } from '../types';
import { productosIniciales, CATEGORIAS, CLAVE_CATALOGO } from '../utils/datos';

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
    try {
      const guardados = localStorage.getItem(CLAVE_CATALOGO);
      if (guardados) {
        const parsed = JSON.parse(guardados);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return productosIniciales;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_CATALOGO, JSON.stringify(productos));
    } catch {
      // ignore
    }
  }, [productos]);

  const obtenerProducto = (codigo: string) => {
    return productos.find((p) => p.codigo === codigo);
  };

  const guardarProducto = (producto: Producto, enEdicion: boolean) => {
    if (!enEdicion) {
      if (productos.some((p) => p.codigo === producto.codigo)) {
        return { exito: false, mensaje: 'Ya existe un producto con este código.' };
      }
      setProductos((prev) => [...prev, producto]);
    } else {
      setProductos((prev) => prev.map((p) => (p.codigo === producto.codigo ? producto : p)));
    }
    return { exito: true, mensaje: enEdicion ? 'Producto actualizado.' : 'Producto creado con éxito.' };
  };

  const eliminarProducto = (codigo: string) => {
    setProductos((prev) => prev.filter((p) => p.codigo !== codigo));
    return true;
  };

  return (
    <ProductContext.Provider
      value={{
        productos,
        categorias: CATEGORIAS,
        obtenerProducto,
        guardarProducto,
        eliminarProducto,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de ProductProvider');
  }
  return context;
};
