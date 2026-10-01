import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  validarRut,
  formatearRut,
  validarRequerido,
  validarLargo,
  validarCorreo,
  validarContrasena,
  validarConfirmacionContrasena,
  validarTelefono,
  validarRegionYComuna,
} from '../utils/validaciones';
import { obtenerRegiones, obtenerComunas } from '../utils/regionesComunas';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [telefono, setTelefono] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const regiones = obtenerRegiones();
  const comunas = region ? obtenerComunas(region) : [];

  const validarCampo = (campo: string, valor: string): boolean => {
    let res = { valido: true, mensaje: '' };

    if (campo === 'rut') {
      res = validarRut(valor);
    } else if (campo === 'nombre') {
      res = validarRequerido(valor, 'Nombre completo');
      if (res.valido) {
        res = validarLargo(valor, null, 100, 'Nombre completo');
      }
    } else if (campo === 'correo') {
      res = validarCorreo(valor);
    } else if (campo === 'password') {
      res = validarContrasena(valor);
    } else if (campo === 'confirmar') {
      res = validarConfirmacionContrasena(password, valor);
    } else if (campo === 'telefono') {
      res = validarTelefono(valor);
    } else if (campo === 'region' || campo === 'comuna') {
      res = validarRegionYComuna(campo === 'region' ? valor : region, campo === 'comuna' ? valor : comuna);
      if (!res.valido) {
        setErrores((prev) => ({ ...prev, region: res.mensaje, comuna: res.mensaje }));
        return false;
      }
      setErrores((prev) => {
        const copy = { ...prev };
        delete copy.region;
        delete copy.comuna;
        return copy;
      });
      return true;
    }

    if (!res.valido) {
      setErrores((prev) => ({ ...prev, [campo]: res.mensaje }));
      return false;
    }

    setErrores((prev) => {
      const copy = { ...prev };
      delete copy[campo];
      return copy;
    });
    return true;
  };

  const handleRutBlur = () => {
    if (rut.trim()) {
      const res = validarRut(rut);
      if (res.valido) {
        setRut(formatearRut(rut));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const okRut = validarCampo('rut', rut);
    const okNombre = validarCampo('nombre', nombre);
    const okCorreo = validarCampo('correo', correo);
    const okPass = validarCampo('password', password);
    const okConf = validarCampo('confirmar', confirmar);
    const okTel = validarCampo('telefono', telefono);
    const okZona = validarCampo('region', region);

    if (!okRut || !okNombre || !okCorreo || !okPass || !okConf || !okTel || !okZona) {
      return;
    }

    const resultado = register({
      rut,
      nombre,
      correo,
      password,
      telefono,
      region,
      comuna,
    });

    if (!resultado.exito) {
      setErrores((prev) => ({
        ...prev,
        [resultado.campo || 'correo']: resultado.mensaje,
      }));
      return;
    }

    setMensajeExito(resultado.mensaje);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <main className="contenedor">
      <form id="form-registro" className="tarjeta formulario" onSubmit={handleSubmit} noValidate>
        <h1>Registro de usuario</h1>

        {mensajeExito && (
          <div className="alerta alerta-exito" style={{ marginBottom: '16px' }}>
            {mensajeExito}
          </div>
        )}

        <div className={`campo ${errores.rut ? 'campo-invalido' : ''}`}>
          <label htmlFor="rut">RUT</label>
          <input
            type="text"
            id="rut"
            maxLength={12}
            placeholder="12.345.678-5"
            value={rut}
            onChange={(e) => {
              setRut(e.target.value);
              validarCampo('rut', e.target.value);
            }}
            onBlur={handleRutBlur}
          />
          {errores.rut && <p className="mensaje-error" style={{ display: 'block' }}>{errores.rut}</p>}
        </div>

        <div className={`campo ${errores.nombre ? 'campo-invalido' : ''}`}>
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            maxLength={100}
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              validarCampo('nombre', e.target.value);
            }}
          />
          {errores.nombre && <p className="mensaje-error" style={{ display: 'block' }}>{errores.nombre}</p>}
        </div>

        <div className={`campo ${errores.correo ? 'campo-invalido' : ''}`}>
          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            id="correo"
            maxLength={100}
            value={correo}
            onChange={(e) => {
              setCorreo(e.target.value);
              validarCampo('correo', e.target.value);
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
              validarCampo('password', e.target.value);
            }}
          />
          {errores.password && <p className="mensaje-error" style={{ display: 'block' }}>{errores.password}</p>}
        </div>

        <div className={`campo ${errores.confirmar ? 'campo-invalido' : ''}`}>
          <label htmlFor="confirmar">Confirmar contraseña</label>
          <input
            type="password"
            id="confirmar"
            maxLength={10}
            value={confirmar}
            onChange={(e) => {
              setConfirmar(e.target.value);
              validarCampo('confirmar', e.target.value);
            }}
          />
          {errores.confirmar && <p className="mensaje-error" style={{ display: 'block' }}>{errores.confirmar}</p>}
        </div>

        <div className={`campo ${errores.telefono ? 'campo-invalido' : ''}`}>
          <label htmlFor="telefono">Teléfono (opcional)</label>
          <input
            type="text"
            id="telefono"
            maxLength={15}
            value={telefono}
            onChange={(e) => {
              setTelefono(e.target.value);
              validarCampo('telefono', e.target.value);
            }}
          />
          {errores.telefono && <p className="mensaje-error" style={{ display: 'block' }}>{errores.telefono}</p>}
        </div>

        <div className={`campo ${errores.region ? 'campo-invalido' : ''}`}>
          <label htmlFor="region">Región</label>
          <select
            id="region"
            value={region}
            onChange={(e) => {
              const nuevaRegion = e.target.value;
              setRegion(nuevaRegion);
              setComuna('');
              validarCampo('region', nuevaRegion);
            }}
          >
            <option value="">-- Seleccione la región --</option>
            {regiones.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {errores.region && <p className="mensaje-error" style={{ display: 'block' }}>{errores.region}</p>}
        </div>

        <div className={`campo ${errores.comuna ? 'campo-invalido' : ''}`}>
          <label htmlFor="comuna">Comuna</label>
          <select
            id="comuna"
            value={comuna}
            disabled={!region || comunas.length === 0}
            onChange={(e) => {
              setComuna(e.target.value);
              validarCampo('comuna', e.target.value);
            }}
          >
            <option value="">-- Seleccione la comuna --</option>
            {comunas.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errores.comuna && <p className="mensaje-error" style={{ display: 'block' }}>{errores.comuna}</p>}
        </div>

        <button className="btn btn-primario" type="submit">
          Registrar
        </button>
        <p style={{ marginTop: '16px' }}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </main>
  );
};
