import { Producto, Usuario, TipoUsuario } from '../types';

export const CATEGORIAS: string[] = ['Tecnología', 'Ropa', 'Hogar', 'Deportes', 'Alimentos'];

export const TIPOS_USUARIO: TipoUsuario[] = ['Administrador', 'Vendedor', 'Cliente'];

export const CUPONES: Record<string, number> = {
  DUOC10: 10,
  BIENVENIDA15: 15,
};

export const CLAVE_CATALOGO = 'tienda_catalogo';
export const CLAVE_USUARIOS = 'tienda_usuarios';
export const CLAVE_SESION = 'tienda_sesion';
export const CLAVE_CARRITO = 'tienda_carrito';
export const CLAVE_MENSAJES = 'tienda_mensajes';

export const productosIniciales: Producto[] = [
  {
    codigo: 'PRD-001',
    nombre: 'Auriculares Inalámbricos Pro',
    descripcion: 'Auriculares con cancelación activa de ruido, 30 horas de batería y micrófono integrado para llamadas.',
    precio: 49990,
    stock: 25,
    stockCritico: 5,
    categoria: 'Tecnología',
    imagen: '/img/ariculares_inalambricos.png',
  },
  {
    codigo: 'PRD-002',
    nombre: 'Teclado Mecánico RGB',
    descripcion: 'Teclado mecánico con switches táctiles, retroiluminación RGB personalizable y reposamuñecas magnético.',
    precio: 35990,
    stock: 40,
    stockCritico: 8,
    categoria: 'Tecnología',
    imagen: '/img/teclado_mecanico.png',
  },
  {
    codigo: 'PRD-003',
    nombre: 'Polera Algodón Premium',
    descripcion: 'Polera de algodón 100% peinado, corte regular y variedad de colores disponibles.',
    precio: 12990,
    stock: 60,
    stockCritico: 10,
    categoria: 'Ropa',
    imagen: '/img/polera_algodon.png',
  },
  {
    codigo: 'PRD-004',
    nombre: 'Zapatillas Urbanas Flex',
    descripcion: 'Zapatillas ligeras con suela amortiguada, ideales para el uso diario y actividades deportivas livianas.',
    precio: 42990,
    stock: 32,
    stockCritico: 6,
    categoria: 'Deportes',
    imagen: '/img/zapatillas_flex.png',
  },
  {
    codigo: 'PRD-005',
    nombre: 'Lámpara de Escritorio LED',
    descripcion: 'Lámpara con 3 niveles de brillo, tinte de luz ajustable y puerto USB para cargar dispositivos.',
    precio: 19990,
    stock: 3,
    stockCritico: 5,
    categoria: 'Hogar',
    imagen: '/img/lampara_led.png',
  },
  {
    codigo: 'PRD-006',
    nombre: 'Termo Acero Inoxidable 1L',
    descripcion: 'Termo de acero inoxidable que mantiene la temperatura por 12 horas, con tapa hermética.',
    precio: 15990,
    stock: 0,
    stockCritico: 4,
    categoria: 'Hogar',
    imagen: '/img/termo.png',
  },
  {
    codigo: 'PRD-007',
    nombre: 'Café de Grano Premium 500g',
    descripcion: 'Mezcla de granos arábica y robusta con notas a chocolate y caramelo, tueste medio.',
    precio: 8990,
    stock: 80,
    stockCritico: 15,
    categoria: 'Alimentos',
    imagen: '/img/cafe.png',
  },
  {
    codigo: 'PRD-008',
    nombre: 'Botella Deportiva 750ml',
    descripcion: 'Botella de acero inoxidable libre de BPA con tapa antiderrame, apta para bebidas frías y calientes.',
    precio: 0,
    stock: 50,
    stockCritico: 10,
    categoria: 'Deportes',
    imagen: '/img/botella_deportive.png',
  },
];

export const usuariosIniciales: Usuario[] = [
  {
    run: '111111111',
    rut: '11.111.111-1',
    nombre: 'Admin',
    apellidos: 'Tienda',
    correo: 'admin@duoc.cl',
    password: 'admin123',
    telefono: '',
    fechaNacimiento: '',
    tipo: 'Administrador',
    region: 'Metropolitana de Santiago',
    comuna: 'Santiago',
    direccion: 'Casa matriz',
  },
  {
    run: '222222222',
    rut: '22.222.222-2',
    nombre: 'Vendedor',
    apellidos: 'Tienda',
    correo: 'vendedor@duoc.cl',
    password: 'vende123',
    telefono: '',
    fechaNacimiento: '',
    tipo: 'Vendedor',
    region: 'Metropolitana de Santiago',
    comuna: 'Santiago',
    direccion: 'Casa matriz',
  },
];
