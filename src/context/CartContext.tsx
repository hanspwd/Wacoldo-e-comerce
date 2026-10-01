import React, { createContext, useContext, useState, useEffect } from 'react';
import { ItemCarrito, Producto, ResumenCarrito } from '../types';
import { CUPONES, CLAVE_CARRITO } from '../utils/datos';

interface CartContextType {
  items: ItemCarrito[];
  totalCantidad: number;
  cupon: string | null;
  resumen: ResumenCarrito;
  agregarProducto: (producto: Producto, cantidad?: number) => { exito: boolean; mensaje: string };
  cambiarCantidad: (codigo: string, delta: number) => { exito: boolean; mensaje?: string };
  establecerCantidad: (codigo: string, cantidad: number) => { exito: boolean; mensaje?: string };
  eliminarItem: (codigo: string) => void;
  vaciarCarrito: () => void;
  aplicarCupon: (codigo: string) => { exito: boolean; mensaje: string };
  removerCupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ItemCarrito[]>(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_CARRITO);
      if (guardado) {
        const parsed = JSON.parse(guardado);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [cupon, setCupon] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const totalCantidad = items.reduce((acc, item) => acc + item.cantidad, 0);

  const subtotal = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const porcentajeDescuento = cupon && CUPONES[cupon] ? CUPONES[cupon] : 0;
  const descuento = Math.round((subtotal * porcentajeDescuento) / 100);
  const total = Math.max(0, subtotal - descuento);

  const resumen: ResumenCarrito = {
    subtotal,
    descuento,
    porcentajeDescuento,
    total,
    cuponAplicado: cupon,
  };

  const agregarProducto = (producto: Producto, cantidad: number = 1) => {
    if (producto.stock <= 0) {
      return { exito: false, mensaje: 'El producto está agotado.' };
    }

    const index = items.findIndex((i) => i.codigo === producto.codigo);
    if (index !== -1) {
      const nuevaCantidad = items[index].cantidad + cantidad;
      if (nuevaCantidad > producto.stock) {
        return {
          exito: false,
          mensaje: `No puedes agregar más de ${producto.stock} unidades (stock disponible).`,
        };
      }
      setItems((prev) =>
        prev.map((item, idx) => (idx === index ? { ...item, cantidad: nuevaCantidad } : item))
      );
    } else {
      if (cantidad > producto.stock) {
        return {
          exito: false,
          mensaje: `No puedes agregar más de ${producto.stock} unidades.`,
        };
      }
      setItems((prev) => [
        ...prev,
        {
          codigo: producto.codigo,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad,
          stock: producto.stock,
          imagen: producto.imagen,
        },
      ]);
    }

    return { exito: true, mensaje: `"${producto.nombre}" añadido al carrito.` };
  };

  const cambiarCantidad = (codigo: string, delta: number) => {
    const item = items.find((i) => i.codigo === codigo);
    if (!item) return { exito: false };

    const nueva = item.cantidad + delta;
    if (nueva <= 0) {
      eliminarItem(codigo);
      return { exito: true };
    }
    if (nueva > item.stock) {
      return { exito: false, mensaje: `No puedes superar el stock máximo de ${item.stock}.` };
    }

    setItems((prev) =>
      prev.map((i) => (i.codigo === codigo ? { ...i, cantidad: nueva } : i))
    );
    return { exito: true };
  };

  const establecerCantidad = (codigo: string, cantidad: number) => {
    const item = items.find((i) => i.codigo === codigo);
    if (!item) return { exito: false };

    if (cantidad <= 0) {
      eliminarItem(codigo);
      return { exito: true };
    }
    if (cantidad > item.stock) {
      setItems((prev) =>
        prev.map((i) => (i.codigo === codigo ? { ...i, cantidad: item.stock } : i))
      );
      return { exito: false, mensaje: `Stock máximo ajustado a ${item.stock}.` };
    }

    setItems((prev) =>
      prev.map((i) => (i.codigo === codigo ? { ...i, cantidad } : i))
    );
    return { exito: true };
  };

  const eliminarItem = (codigo: string) => {
    setItems((prev) => prev.filter((i) => i.codigo !== codigo));
  };

  const vaciarCarrito = () => {
    setItems([]);
    setCupon(null);
  };

  const aplicarCupon = (codigo: string) => {
    const limpio = codigo.trim().toUpperCase();
    if (CUPONES[limpio]) {
      setCupon(limpio);
      return {
        exito: true,
        mensaje: `Cupón ${limpio} aplicado (${CUPONES[limpio]}% de descuento).`,
      };
    }
    return { exito: false, mensaje: 'Cupón inválido o expirado. Prueba DUOC10 o BIENVENIDA15.' };
  };

  const removerCupon = () => {
    setCupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalCantidad,
        cupon,
        resumen,
        agregarProducto,
        cambiarCantidad,
        establecerCantidad,
        eliminarItem,
        vaciarCarrito,
        aplicarCupon,
        removerCupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};
