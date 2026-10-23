import type { ItemCarrito } from '@/types';
import { Button } from '@/components/ui/Button';
import { Price } from '@/components/ui/Price';
import { QuantityStepper } from '@/components/ui/QuantityStepper';

interface CartItemRowProps {
  item: ItemCarrito;
  categoria?: string;
  onQuantityChange: (codigo: string, cantidad: number) => void;
  onRemove: (codigo: string) => void;
}

export const CartItemRow = ({
  item,
  categoria,
  onQuantityChange,
  onRemove,
}: CartItemRowProps) => (
  <article className="cart-item">
    <div className="cart-item__media">
      <img src={item.imagen} alt={item.nombre} loading="lazy" decoding="async" />
    </div>

    <div className="cart-item__info">
      <h3 className="cart-item__title">{item.nombre}</h3>
      {categoria && <span className="cart-item__category">{categoria}</span>}
      <span className="cart-item__unit">Unitario: <Price value={item.precio} size="sm" /></span>
    </div>

    <div className="cart-item__quantity">
      <span className="cart-item__label">Cantidad</span>
      <QuantityStepper
        value={item.cantidad}
        max={item.stock}
        compact
        label={`Cantidad de ${item.nombre}`}
        onChange={(cantidad) => onQuantityChange(item.codigo, cantidad)}
      />
    </div>

    <div className="cart-item__subtotal">
      <span className="cart-item__label">Subtotal</span>
      <Price value={item.precio * item.cantidad} size="md" />
    </div>

    <div className="cart-item__actions">
      <Button
        variant="ghost"
        size="sm"
        icon="trash"
        ariaLabel={`Quitar ${item.nombre} del carrito`}
        onClick={() => onRemove(item.codigo)}
      >
        Quitar
      </Button>
    </div>
  </article>
);
