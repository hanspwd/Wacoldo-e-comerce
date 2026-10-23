import { forwardRef } from 'react';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Icon, IconName } from './Icon';

export type ButtonVariant =
  | 'primary'
  | 'accent'
  | 'outline'
  | 'soft'
  | 'danger'
  | 'ghost'
  | 'link'
  | 'icon'
  | 'cart'
  | 'nav';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'> {
  to?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconPosition?: 'start' | 'end';
  block?: boolean;
  loading?: boolean;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  children?: ReactNode;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'btn-brand',
  accent: 'btn-accent',
  outline: 'btn-outline-brand',
  soft: 'btn-soft',
  danger: 'btn-danger',
  ghost: 'btn-ghost',
  link: 'btn-link',
  icon: 'btn-icon',
  cart: 'btn-cart',
  nav: 'btn-nav',
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    to,
    href,
    type = 'button',
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'start',
    block = false,
    loading = false,
    ariaLabel,
    className,
    children,
    disabled,
    onClick,
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading;
  const classes = cn(
    'btn',
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    block && 'w-100',
    !children && icon && 'btn-icon-only',
    className
  );

  const content = (
    <>
      {loading ? (
        <span className="spinner-border spinner-border-sm" aria-hidden="true" />
      ) : (
        icon && iconPosition === 'start' && <Icon name={icon} size={18} />
      )}
      {children && <span>{children}</span>}
      {!loading && icon && iconPosition === 'end' && <Icon name={icon} size={18} />}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        aria-label={ariaLabel}
        aria-disabled={isDisabled || undefined}
        onClick={isDisabled ? undefined : onClick}
        {...(rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        aria-disabled={isDisabled || undefined}
        onClick={isDisabled ? undefined : onClick}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
});
