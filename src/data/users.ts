import type { TipoUsuario, Usuario } from '@/types';

export const TIPOS_USUARIO: TipoUsuario[] = ['Administrador', 'Vendedor', 'Cliente'];

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
