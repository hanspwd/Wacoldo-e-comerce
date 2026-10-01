export type TipoUsuario = 'Administrador' | 'Vendedor' | 'Cliente';

export interface Usuario {
  run: string;
  rut?: string;
  nombre: string;
  apellidos?: string;
  correo: string;
  password?: string;
  telefono?: string;
  fechaNacimiento?: string;
  tipo: TipoUsuario;
  region: string;
  comuna: string;
  direccion?: string;
}

export interface Producto {
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  stockCritico: number;
  categoria: string;
  imagen: string;
}

export interface ItemCarrito {
  codigo: string;
  nombre: string;
  precio: number;
  cantidad: number;
  stock: number;
  imagen: string;
}

export interface ResumenCarrito {
  subtotal: number;
  descuento: number;
  porcentajeDescuento: number;
  total: number;
  cuponAplicado: string | null;
}

export interface MensajeContacto {
  id?: string;
  nombre: string;
  correo: string;
  comentario: string;
  fecha: string;
}

export interface ResultadoValidacion {
  valido: boolean;
  mensaje: string;
}
