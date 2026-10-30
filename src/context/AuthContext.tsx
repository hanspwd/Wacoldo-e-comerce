import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Usuario, TipoUsuario } from '@/types';
import { CLAVE_SESION, CLAVE_USUARIOS, usuariosIniciales } from '@/data';
import { limpiarRut } from '@/utils/validaciones';
import { eliminarClave, guardarJSON, leerJSON } from '@/services/storage';

interface AuthContextType {
  user: Usuario | null;
  usuarios: Usuario[];
  login: (correo: string, password: string) => { exito: boolean; mensaje: string; tipo?: TipoUsuario };
  register: (datos: {
    rut: string;
    nombre: string;
    apellidos?: string;
    correo: string;
    password: string;
    telefono?: string;
    fechaNacimiento?: string;
    region: string;
    comuna: string;
    direccion?: string;
  }) => { exito: boolean; mensaje: string; campo?: string };
  logout: () => void;
  guardarUsuarioAdmin: (
    usuario: Usuario,
    enEdicion: boolean,
    correoOriginal?: string
  ) => { exito: boolean; mensaje: string };
  eliminarUsuario: (correo: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Cambiar por use state al crear usuarios o registros, lo mismo para productos.

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(() => {
    const guardados = leerJSON<Usuario[]>(CLAVE_USUARIOS, usuariosIniciales);
    return Array.isArray(guardados) && guardados.length > 0 ? guardados : usuariosIniciales;
  });

  const [user, setUser] = useState<Usuario | null>(() => {
    const sesion = leerJSON<Usuario | null>(CLAVE_SESION, null, 'session')
      ?? leerJSON<Usuario | null>(CLAVE_SESION, null);
    return sesion ?? null;
  });

  useEffect(() => {
    guardarJSON(CLAVE_USUARIOS, usuarios);
  }, [usuarios]);

  const login = useCallback(
    (correo: string, password: string) => {
      const emailNorm = correo.trim().toLowerCase();
      const encontrado = usuarios.find((usuario) => usuario.correo.toLowerCase() === emailNorm);

      if (!encontrado || encontrado.password !== password) {
        return { exito: false, mensaje: 'Credenciales inválidas. Revisa tu correo y contraseña.' };
      }

      setUser(encontrado);
      guardarJSON(CLAVE_SESION, encontrado);
      return { exito: true, mensaje: 'Sesión iniciada.', tipo: encontrado.tipo };
    },
    [usuarios]
  );

  const register = useCallback(
    (datos: {
      rut: string;
      nombre: string;
      apellidos?: string;
      correo: string;
      password: string;
      telefono?: string;
      fechaNacimiento?: string;
      region: string;
      comuna: string;
      direccion?: string;
    }) => {
      const emailNorm = datos.correo.trim().toLowerCase();
      if (usuarios.some((usuario) => usuario.correo.toLowerCase() === emailNorm)) {
        return { exito: false, campo: 'correo', mensaje: 'El correo ya está registrado.' };
      }

      const rutLimpio = limpiarRut(datos.rut);
      if (rutLimpio) {
        const existeRut = usuarios.some((usuario) => {
          const usuarioRut = limpiarRut(usuario.rut || usuario.run);
          return usuarioRut !== '' && usuarioRut === rutLimpio;
        });

        if (existeRut) {
          return { exito: false, campo: 'rut', mensaje: 'El RUT ya se encuentra registrado.' };
        }
      }

      const nuevoUsuario: Usuario = {
        run: rutLimpio,
        rut: datos.rut,
        nombre: datos.nombre,
        apellidos: datos.apellidos || '',
        correo: datos.correo,
        password: datos.password,
        telefono: datos.telefono || '',
        fechaNacimiento: datos.fechaNacimiento || '',
        tipo: 'Cliente',
        region: datos.region,
        comuna: datos.comuna,
        direccion: datos.direccion || '',
      };

      setUsuarios((prev) => [...prev, nuevoUsuario]);
      setUser(nuevoUsuario);
      guardarJSON(CLAVE_SESION, nuevoUsuario);

      return { exito: true, mensaje: 'Registro exitoso. ¡Bienvenido a Wacoldo Store!' };
    },
    [usuarios]
  );

  const logout = useCallback(() => {
    setUser(null);
    eliminarClave(CLAVE_SESION);
    eliminarClave(CLAVE_SESION, 'session');
  }, []);

  const guardarUsuarioAdmin = useCallback(
    (usuario: Usuario, enEdicion: boolean, correoOriginal?: string) => {
      const emailNorm = usuario.correo.trim().toLowerCase();
      if (!enEdicion && usuarios.some((item) => item.correo.toLowerCase() === emailNorm)) {
        return { exito: false, mensaje: 'El correo ya está registrado.' };
      }

      if (enEdicion && correoOriginal) {
        setUsuarios((prev) =>
          prev.map((item) =>
            item.correo.toLowerCase() === correoOriginal.toLowerCase() ? usuario : item
          )
        );

        if (user && user.correo.toLowerCase() === correoOriginal.toLowerCase()) {
          setUser(usuario);
          guardarJSON(CLAVE_SESION, usuario);
        }
      } else {
        setUsuarios((prev) => [...prev, usuario]);
      }

      return {
        exito: true,
        mensaje: enEdicion ? 'Usuario actualizado con éxito.' : 'Usuario creado con éxito.',
      };
    },
    [user, usuarios]
  );

  const eliminarUsuario = useCallback(
    (correo: string) => {
      const emailNorm = correo.toLowerCase();
      setUsuarios((prev) => prev.filter((item) => item.correo.toLowerCase() !== emailNorm));

      if (user && user.correo.toLowerCase() === emailNorm) {
        logout();
      }

      return true;
    },
    [logout, user]
  );

  const value = useMemo(
    () => ({
      user,
      usuarios,
      login,
      register,
      logout,
      guardarUsuarioAdmin,
      eliminarUsuario,
    }),
    [user, usuarios, login, register, logout, guardarUsuarioAdmin, eliminarUsuario]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
