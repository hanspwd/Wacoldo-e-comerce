import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validarCorreo, validarContrasena } from '../utils/validaciones';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [alerta, setAlerta] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrores({});
    setAlerta(null);

    const resCorreo = validarCorreo(correo);
    if (!resCorreo.valido) {
      setErrores((prev) => ({ ...prev, correo: resCorreo.mensaje }));
      return;
    }

    const resPass = validarContrasena(password);
    if (!resPass.valido) {
      setErrores((prev) => ({ ...prev, password: resPass.mensaje }));
      return;
    }

    const resultado = login(correo, password);
    if (!resultado.exito) {
      setAlerta(resultado.mensaje);
      return;
    }

    if (resultado.tipo === 'Administrador' || resultado.tipo === 'Vendedor') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <main className="contenedor">
      <form id="form-login" className="tarjeta formulario" onSubmit={handleSubmit} noValidate>
        <h1>Tienda Web</h1>
        <h2>Inicio de sesión</h2>

        {alerta && (
          <div className="alerta alerta-error" style={{ marginBottom: '16px' }}>
            {alerta}
          </div>
        )}

        <div className={`campo ${errores.correo ? 'campo-invalido' : ''}`}>
          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            id="correo"
            maxLength={100}
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          {errores.correo && <p className="mensaje-error" style={{ display: 'block' }}>{errores.correo}</p>}
        </div>

        <div className={`campo ${errores.password ? 'campo-invalido' : ''}`}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            maxLength={10}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errores.password && <p className="mensaje-error" style={{ display: 'block' }}>{errores.password}</p>}
        </div>

        <button className="btn btn-primario" type="submit">
          Iniciar sesión
        </button>
        <p style={{ marginTop: '16px' }}>
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </form>
    </main>
  );
};
