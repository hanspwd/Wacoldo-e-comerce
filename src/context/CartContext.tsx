import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ItemCarrito, Producto, ResumenCarrito } from '@/types';
import { CLAVE_CARRITO, CLAVE_CUPON, CUPONES } from '@/data';
import { guardarJSON, leerJSON } from '@/services/storage';

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
    const guardado = leerJSON<ItemCarrito[]>(CLAVE_CARRITO, []);
    return Array.isArray(guardado) ? guardado : [];
  });

  const [cupon, setCupon] = useState<string | null>(() => leerJSON<string | null>(CLAVE_CUPON, null));

  useEffect(() => {
    guardarJSON(CLAVE_CARRITO, items);
  }, [items]);

  useEffect(() => {
    guardarJSON(CLAVE_CUPON, cupon);
  }, [cupon]);

  const totalCantidad = useMemo(
    () => items.reduce((total, item) => total + item.cantidad, 0),
    [items]
  );

  const resumen = useMemo<ResumenCarrito>(() => {
    const subtotal = items.reduce((total, item) => total + item.precio * item.cantidad, 0);
    const porcentajeDescuento = cupon && CUPONES[cupon] ? CUPONES[cupon] : 0;
    const descuento = Math.round((subtotal * porcentajeDescuento) / 100);

    return {
      subtotal,
      descuento,
      porcentajeDescuento,
      total: Math.max(0, subtotal - descuento),
      cuponAplicado: cupon,
    };
  }, [cupon, items]);

  const agregarProducto = useCallback(
    (producto: Producto, cantidad: number = 1) => {
      if (producto.stock <= 0) {
        return { exito: false, mensaje: 'El producto está agotado.' };
      }

      const index = items.findIndex((item) => item.codigo === producto.codigo);
      if (index !== -1) {
        const nuevaCantidad = items[index].cantidad + cantidad;
        if (nuevaCantidad > producto.stock) {
          return {
            exito: false,
            mensaje: `No puedes agregar más de ${producto.stock} unidades (stock disponible).`,
          };
        }

        setItems((prev) =>
          prev.map((item, itemIndex) =>
            itemIndex === index ? { ...item, cantidad: nuevaCantidad } : item
          )
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

      return { exito: true, mensaje: `"${producto.nombre}" se añadió al carrito.` };
    },
    [items]
  );

  const eliminarItem = useCallback((codigo: string) => {
    setItems((prev) => prev.filter((item) => item.codigo !== codigo));
  }, []);

  const cambiarCantidad = useCallback(
    (codigo: string, delta: number) => {
      const item = items.find((current) => current.codigo === codigo);
      if (!item) return { exito: false };

      const nuevaCantidad = item.cantidad + delta;
      if (nuevaCantidad <= 0) {
        eliminarItem(codigo);
        return { exito: true };
      }

      if (nuevaCantidad > item.stock) {
        return { exito: false, mensaje: `No puedes superar el stock máximo de ${item.stock}.` };
      }

      setItems((prev) =>
        prev.map((current) =>
          current.codigo === codigo ? { ...current, cantidad: nuevaCantidad } : current
        )
      );
      return { exito: true };
    },
    [eliminarItem, items]
  );

  const establecerCantidad = useCallback(
    (codigo: string, cantidad: number) => {
      const item = items.find((current) => current.codigo === codigo);
      if (!item) return { exito: false };

      if (cantidad <= 0) {
        eliminarItem(codigo);
        return { exito: true };
      }

      if (cantidad > item.stock) {
        setItems((prev) =>
          prev.map((current) =>
            current.codigo === codigo ? { ...current, cantidad: item.stock } : current
          )
        );
        return { exito: false, mensaje: `Stock máximo ajustado a ${item.stock}.` };
      }

      setItems((prev) =>
        prev.map((current) => (current.codigo === codigo ? { ...current, cantidad } : current))
      );
      return { exito: true };
    },
    [eliminarItem, items]
  );

  const vaciarCarrito = useCallback(() => {
    setItems([]);
    setCupon(null);
  }, []);

  const aplicarCupon = useCallback((codigo: string) => {
    const limpio = codigo.trim().toUpperCase();
    if (CUPONES[limpio]) {
      setCupon(limpio);
      return {
        exito: true,
        mensaje: `Cupón ${limpio} aplicado (${CUPONES[limpio]}% de descuento).`,
      };
    }

    return {
      exito: false,
      mensaje: 'Cupón inválido o expirado. Prueba con DUOC10 o BIENVENIDA15.',
    };
  }, []);

  const removerCupon = useCallback(() => setCupon(null), []);

  const value = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe estar dentro de CartProvider');
  }
  return context;
};
