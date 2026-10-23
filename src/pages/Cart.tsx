import { useMemo, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';
import { useToast } from '@/context/ToastContext';
import { ActionBar } from '@/components/ui/ActionGroup';
import { CartItemRow } from '@/components/cart/CartItemRow';
import { CartSummary } from '@/components/cart/CartSummary';
import { Card } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { Icon } from '@/components/ui/Icon';
import { PageHeader } from '@/components/ui/PageHeader';
import { usePageTitle } from '@/hooks/usePageTitle';

export const Cart = () => {
  const {
    items,
    totalCantidad,
    resumen,
    establecerCantidad,
    eliminarItem,
    vaciarCarrito,
    aplicarCupon,
    removerCupon,
  } = useCart();
  const { productos } = useProducts();
  const { showToast } = useToast();

  const [confirmarVaciar, setConfirmarVaciar] = useState(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState<string | null>(null);

  usePageTitle('Mi carrito');

  const categoriasPorCodigo = useMemo(
    () => new Map(productos.map((producto) => [producto.codigo, producto.categoria])),
    [productos]
  );

  const handleCantidad = (codigo: string, cantidad: number) => {
    const resultado = establecerCantidad(codigo, cantidad);
    if (!resultado.exito && resultado.mensaje) {
      showToast(resultado.mensaje, 'danger');
    }
  };

  const handleEliminar = (codigo: string) => {
    eliminarItem(codigo);
    showToast('Producto eliminado del carrito.', 'info');
  };

  const handleCheckout = () => {
    const id = `WS-${Date.now().toString().slice(-6)}`;
    setPedidoConfirmado(id);
    vaciarCarrito();
    showToast('¡Gracias por tu compra! Tu pedido fue generado con éxito.');
  };

  const handleVaciar = () => {
    vaciarCarrito();
    setConfirmarVaciar(false);
    showToast('Carrito vaciado.', 'info');
  };

  if (pedidoConfirmado) {
    return (
      <div className="page container page-stack">
        <Card className="order-success">
          <div className="card-body">
            <span className="order-success__icon" aria-hidden="true">
              <Icon name="check" size={34} />
            </span>
            <p className="page-header__eyebrow">Pedido confirmado</p>
            <h1 className="order-success__title">¡Gracias por tu compra!</h1>
            <p className="order-success__text">
              Tu pedido <strong>{pedidoConfirmado}</strong> fue generado correctamente. En una
              tienda con backend recibirías el detalle por correo.
            </p>
            <ActionBar
              nodes={[
                {
                  keyId: 'seguir',
                  label: 'Seguir comprando',
                  to: '/productos',
                  variant: 'primary',
                  icon: 'cart',
                },
                {
                  keyId: 'inicio',
                  label: 'Volver al inicio',
                  to: '/',
                  variant: 'outline',
                },
              ]}
              align="center"
            />
          </div>
        </Card>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="page container page-stack">
        <PageHeader eyebrow="Carrito" title="Mi carrito de compras" />
        <EmptyState
          icon="cart"
          title="Tu carrito está vacío"
          description="Explora el catálogo y añade tus productos favoritos. Estamos seguros de que encontrarás algo especial."
          action={
            <ActionBar
              nodes={[
                {
                  keyId: 'productos',
                  label: 'Ver productos',
                  to: '/productos',
                  variant: 'primary',
                  icon: 'arrow-right',
                  iconPosition: 'end',
                },
              ]}
            />
          }
        />
      </div>
    );
  }

  return (
    <div className="page container page-stack">
      <PageHeader
        eyebrow="Carrito"
        title="Mi carrito de compras"
        description={`Tienes ${totalCantidad} ${totalCantidad === 1 ? 'producto' : 'productos'} listos para comprar.`}
        actions={[
          {
            keyId: 'seguir',
            label: 'Seguir comprando',
            to: '/productos',
            variant: 'outline',
            icon: 'arrow-left',
          },
        ]}
      />

      <div className="row g-4 align-items-start">
        <div className="col-12 col-xl-8">
          <Card className="cart-items">
            <div className="card-body">
              <div className="cart-items__header">
                <h2 className="h5 mb-0">Productos</h2>
                <span className="text-secondary">{items.length} ítems</span>
              </div>
              {items.map((item) => (
                <CartItemRow
                  key={item.codigo}
                  item={item}
                  categoria={categoriasPorCodigo.get(item.codigo)}
                  onQuantityChange={handleCantidad}
                  onRemove={handleEliminar}
                />
              ))}
            </div>
          </Card>
        </div>

        <div className="col-12 col-xl-4">
          <div className="cart-summary-wrap">
            <CartSummary
              resumen={resumen}
              itemCount={totalCantidad}
              onApplyCoupon={aplicarCupon}
              onRemoveCoupon={removerCupon}
              onCheckout={handleCheckout}
              onRequestClear={() => setConfirmarVaciar(true)}
            />
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmarVaciar}
        title="¿Vaciar el carrito?"
        description="Se quitarán todos los productos y el cupón aplicado. Esta acción no se puede deshacer."
        confirmLabel="Sí, vaciar carrito"
        cancelLabel="Mantener productos"
        onConfirm={handleVaciar}
        onCancel={() => setConfirmarVaciar(false)}
      />
    </div>
  );
};
