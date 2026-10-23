import { useState } from 'react';
import type { ResumenCarrito } from '@/types';
import { ActionBar } from '@/components/ui/ActionGroup';
import type { ActionNode } from '@/components/ui/ActionGroup';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TextInput } from '@/components/ui/Field';
import { Icon } from '@/components/ui/Icon';
import { Price } from '@/components/ui/Price';
import { useToast } from '@/context/ToastContext';

interface CartSummaryProps {
  resumen: ResumenCarrito;
  itemCount: number;
  onApplyCoupon: (codigo: string) => { exito: boolean; mensaje: string };
  onRemoveCoupon: () => void;
  onCheckout: () => void;
  onRequestClear: () => void;
}

export const CartSummary = ({
  resumen,
  itemCount,
  onApplyCoupon,
  onRemoveCoupon,
  onCheckout,
  onRequestClear,
}: CartSummaryProps) => {
  const [codigoCupon, setCodigoCupon] = useState('');
  const { showToast } = useToast();

  const handleAplicarCupon = () => {
    if (!codigoCupon.trim()) {
      showToast('Ingresa un código de cupón.', 'danger');
      return;
    }

    const resultado = onApplyCoupon(codigoCupon);
    showToast(resultado.mensaje, resultado.exito ? 'success' : 'danger');
    if (resultado.exito) setCodigoCupon('');
  };

  const checkoutActions: ActionNode[] = [
    {
      keyId: 'vaciar',
      label: 'Vaciar carrito',
      variant: 'danger',
      icon: 'trash',
      onClick: onRequestClear,
    },
    {
      keyId: 'pagar',
      label: 'Ir a pagar',
      variant: 'primary',
      icon: 'shield',
      onClick: onCheckout,
    },
  ];

  return (
    <Card className="cart-summary">
      <div className="card-body">
        <h2 className="h4 mb-3">Resumen del pedido</h2>

        <dl className="cart-summary__lines">
          <div>
            <dt>Productos ({itemCount})</dt>
            <dd><Price value={resumen.subtotal} size="sm" /></dd>
          </div>
          {resumen.descuento > 0 && (
            <div className="cart-summary__discount">
              <dt>
                Descuento ({resumen.cuponAplicado}, {resumen.porcentajeDescuento}%)
              </dt>
              <dd>-<Price value={resumen.descuento} size="sm" /></dd>
            </div>
          )}
          <div className="cart-summary__total">
            <dt>Total</dt>
            <dd><Price value={resumen.total} size="lg" /></dd>
          </div>
        </dl>

        <div className="cart-coupon">
          <label htmlFor="cupon" className="form-label fw-semibold">
            Cupón de descuento
          </label>
          <div className="d-flex gap-2">
            <TextInput
              id="cupon"
              name="cupon"
              placeholder="Ej: DUOC10"
              value={codigoCupon}
              onChange={(event) => setCodigoCupon(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleAplicarCupon();
                }
              }}
            />
            <Button variant="accent" onClick={handleAplicarCupon}>
              Aplicar
            </Button>
          </div>
          {resumen.cuponAplicado && (
            <div className="cart-coupon__applied">
              <span>
                <Icon name="check" size={16} /> Cupón {resumen.cuponAplicado} activo
              </span>
              <Button variant="link" size="sm" onClick={onRemoveCoupon}>
                Quitar
              </Button>
            </div>
          )}
          <p className="form-text mt-2 mb-0">
            Prueba con <strong>DUOC10</strong> o <strong>BIENVENIDA15</strong>.
          </p>
        </div>

        <ActionBar nodes={checkoutActions} orientation="vertical" align="start" className="cart-summary__actions" />

        <div className="payment-trust">
          <Icon name="shield" size={20} />
          <div>
            <strong>Pago 100% seguro</strong>
            <span>Protegido por Webpay Plus</span>
          </div>
          <img src="/img/integracion-webpay.png" alt="Webpay Plus" className="payment-trust__logo" />
        </div>
      </div>
    </Card>
  );
};
