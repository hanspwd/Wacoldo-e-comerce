import React, { createContext, useContext, useState, useEffect } from 'react';
import { Usuario, TipoUsuario } from '../types';
import { usuariosIniciales, CLAVE_USUARIOS, CLAVE_SESION } from '../utils/datos';
import { limpiarRut } from '../utils/validaciones';

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(() => {
    try {
      const guardados = localStorage.getItem(CLAVE_USUARIOS);
      if (guardados) {
        return JSON.parse(guardados);
      }
    } catch {
      // fallback
    }
    return usuariosIniciales;
  });

  const [user, setUser] = useState<Usuario | null>(() => {
    try {
      const sesion = sessionStorage.getItem(CLAVE_SESION) || localStorage.getItem(CLAVE_SESION);
      if (sesion) {
        return JSON.parse(sesion);
      }
    } catch {
      // fallback
    }
    return null;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
    } catch {
      // ignore
    }
  }, [usuarios]);

  const login = (correo: string, password: string) => {
    const emailNorm = correo.trim().toLowerCase();
    const encontrado = usuarios.find((u) => u.correo.toLowerCase() === emailNorm);
    if (!encontrado || encontrado.password !== password) {
      return { exito: false, mensaje: 'Credenciales inválidas.' };
    }
    setUser(encontrado);
    try {
      localStorage.setItem(CLAVE_SESION, JSON.stringify(encontrado));
    } catch {
      // ignore
    }
    return { exito: true, mensaje: 'Sesión iniciada.', tipo: encontrado.tipo };
  };

  const register = (datos: {
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
    if (usuarios.some((u) => u.correo.toLowerCase() === emailNorm)) {
      return { exito: false, campo: 'correo', mensaje: 'El correo ya está registrado.' };
    }

    const rutLimpio = limpiarRut(datos.rut);
    if (rutLimpio) {
      const existeRut = usuarios.some((u) => {
        const uRut = limpiarRut(u.rut || u.run);
        return uRut !== '' && uRut === rutLimpio;
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
    try {
      localStorage.setItem(CLAVE_SESION, JSON.stringify(nuevoUsuario));
    } catch {
      // ignore
    }

    return { exito: true, mensaje: 'Registro exitoso. ¡Bienvenido!' };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(CLAVE_SESION);
      sessionStorage.removeItem(CLAVE_SESION);
    } catch {
      // ignore
    }
  };

  const guardarUsuarioAdmin = (usuario: Usuario, enEdicion: boolean, correoOriginal?: string) => {
    const emailNorm = usuario.correo.trim().toLowerCase();
    if (!enEdicion && usuarios.some((u) => u.correo.toLowerCase() === emailNorm)) {
      return { exito: false, mensaje: 'El correo ya está registrado.' };
    }

    if (enEdicion && correoOriginal) {
      setUsuarios((prev) =>
        prev.map((u) => (u.correo.toLowerCase() === correoOriginal.toLowerCase() ? usuario : u))
      );
      if (user && user.correo.toLowerCase() === correoOriginal.toLowerCase()) {
        setUser(usuario);
        localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
      }
    } else {
      setUsuarios((prev) => [...prev, usuario]);
    }

    return { exito: true, mensaje: enEdicion ? 'Usuario actualizado con éxito.' : 'Usuario creado con éxito.' };
  };

  const eliminarUsuario = (correo: string) => {
    const emailNorm = correo.toLowerCase();
    setUsuarios((prev) => prev.filter((u) => u.correo.toLowerCase() !== emailNorm));
    if (user && user.correo.toLowerCase() === emailNorm) {
      logout();
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        usuarios,
        login,
        register,
        logout,
        guardarUsuarioAdmin,
        eliminarUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
