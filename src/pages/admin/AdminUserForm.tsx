import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { TipoUsuario, Usuario } from '../../types';
import { TIPOS_USUARIO } from '../../utils/datos';
import {
  validarRut,
  formatearRut,
  validarNombreUsuario,
  validarApellidos,
  validarCorreo,
  validarContrasena,
  validarConfirmacionContrasena,
  validarDireccion,
  validarRegionYComuna,
} from '../../utils/validaciones';
import { obtenerRegiones, obtenerComunas } from '../../utils/regionesComunas';

export const AdminUserForm: React.FC = () => {
  const { usuarios, guardarUsuarioAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const correoParam = searchParams.get('correo');
  const enEdicion = Boolean(correoParam);

  const originalUser = enEdicion && correoParam
    ? usuarios.find((item) => item.correo.toLowerCase() === correoParam.toLowerCase()) || null
    : null;

  const [run, setRun] = useState(originalUser ? originalUser.rut || originalUser.run || '' : '');
  const [nombre, setNombre] = useState(originalUser ? originalUser.nombre : '');
  const [apellidos, setApellidos] = useState(originalUser ? originalUser.apellidos || '' : '');
  const [correo, setCorreo] = useState(originalUser ? originalUser.correo : '');
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(originalUser ? originalUser.fechaNacimiento || '' : '');
  const [tipo, setTipo] = useState<TipoUsuario>(originalUser ? originalUser.tipo : 'Cliente');
  const [direccion, setDireccion] = useState(originalUser ? originalUser.direccion || '' : '');
  const [region, setRegion] = useState(originalUser ? originalUser.region || '' : '');
  const [comuna, setComuna] = useState(originalUser ? originalUser.comuna || '' : '');

  const [errores, setErrores] = useState<Record<string, string>>({});

  const regiones = obtenerRegiones();
  const comunas = region ? obtenerComunas(region) : [];

  const handleRutBlur = () => {
    if (run.trim()) {
      const res = validarRut(run);
      if (res.valido) {
        setRun(formatearRut(run));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrores({});

    let valido = true;
    const nuevosErrores: Record<string, string> = {};

    const rRun = validarRut(run);
    if (!rRun.valido) {
      nuevosErrores.run = rRun.mensaje;
      valido = false;
    }

    const rNom = validarNombreUsuario(nombre);
    if (!rNom.valido) {
      nuevosErrores.nombre = rNom.mensaje;
      valido = false;
    }

    const rApe = validarApellidos(apellidos);
    if (!rApe.valido) {
      nuevosErrores.apellidos = rApe.mensaje;
      valido = false;
    }

    const rCor = validarCorreo(correo);
    if (!rCor.valido) {
      nuevosErrores.correo = rCor.mensaje;
      valido = false;
    } else if (!enEdicion && usuarios.some((u) => u.correo.toLowerCase() === correo.toLowerCase())) {
      nuevosErrores.correo = 'El correo ya está registrado.';
      valido = false;
    }

    if (!enEdicion || password !== '' || confirmar !== '') {
      const rPass = validarContrasena(password);
      if (!rPass.valido) {
        nuevosErrores.password = rPass.mensaje;
        valido = false;
      }
      const rConf = validarConfirmacionContrasena(password, confirmar);
      if (!rConf.valido) {
        nuevosErrores.confirmar = rConf.mensaje;
        valido = false;
      }
    }

    if (fechaNacimiento !== '') {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (new Date(fechaNacimiento + 'T00:00:00') > hoy) {
        nuevosErrores.fechaNacimiento = 'La fecha de nacimiento no puede ser futura.';
        valido = false;
      }
    }

    const rDir = validarDireccion(direccion);
    if (!rDir.valido) {
      nuevosErrores.direccion = rDir.mensaje;
      valido = false;
    }

    const rZona = validarRegionYComuna(region, comuna);
    if (!rZona.valido) {
      nuevosErrores.region = rZona.mensaje;
      nuevosErrores.comuna = rZona.mensaje;
      valido = false;
    }

    if (!valido) {
      setErrores(nuevosErrores);
      return;
    }

    const payload: Usuario = {
      run,
      rut: run,
      nombre,
      apellidos,
      correo: enEdicion && originalUser ? originalUser.correo : correo,
      password: password !== '' ? password : originalUser?.password || '',
      telefono: originalUser?.telefono || '',
      fechaNacimiento,
      tipo,
      region,
      comuna,
      direccion,
    };

    guardarUsuarioAdmin(payload, enEdicion, correoParam || undefined);
    navigate('/admin/usuarios');
  };

  return (
    <>
      <header className="admin-encabezado">
        <h1>{enEdicion ? 'Editar usuario' : 'Nuevo usuario'}</h1>
      </header>

      <form id="form-usuario" className="tarjeta formulario" onSubmit={handleSubmit} noValidate>
        <div className={`campo ${errores.run ? 'campo-invalido' : ''}`}>
          <label htmlFor="run">RUN / RUT</label>
          <input
            type="text"
            id="run"
            maxLength={12}
            placeholder="12.345.678-5"
            value={run}
            onChange={(e) => setRun(e.target.value)}
            onBlur={handleRutBlur}
          />
          {errores.run && <p className="mensaje-error" style={{ display: 'block' }}>{errores.run}</p>}
        </div>

        <div className={`campo ${errores.nombre ? 'campo-invalido' : ''}`}>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            maxLength={50}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {errores.nombre && <p className="mensaje-error" style={{ display: 'block' }}>{errores.nombre}</p>}
        </div>

        <div className={`campo ${errores.apellidos ? 'campo-invalido' : ''}`}>
          <label htmlFor="apellidos">Apellidos</label>
          <input
            type="text"
            id="apellidos"
            maxLength={100}
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
          {errores.apellidos && <p className="mensaje-error" style={{ display: 'block' }}>{errores.apellidos}</p>}
        </div>

        <div className={`campo ${errores.correo ? 'campo-invalido' : ''}`}>
          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            id="correo"
            maxLength={100}
            disabled={enEdicion}
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          {errores.correo && <p className="mensaje-error" style={{ display: 'block' }}>{errores.correo}</p>}
        </div>

        <div className={`campo ${errores.password ? 'campo-invalido' : ''}`}>
          <label htmlFor="password">Contraseña {enEdicion && '(dejar en blanco para no modificar)'}</label>
          <input
            type="password"
            id="password"
            maxLength={10}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            onChange={(e) => setConfirmar(e.target.value)}
          />
          {errores.confirmar && <p className="mensaje-error" style={{ display: 'block' }}>{errores.confirmar}</p>}
        </div>

        <div className={`campo ${errores.fechaNacimiento ? 'campo-invalido' : ''}`}>
          <label htmlFor="fecha-nacimiento">Fecha nacimiento (opcional)</label>
          <input
            type="date"
            id="fecha-nacimiento"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
          {errores.fechaNacimiento && (
            <p className="mensaje-error" style={{ display: 'block' }}>{errores.fechaNacimiento}</p>
          )}
        </div>

        <div className="campo">
          <label htmlFor="tipo">Tipo de usuario</label>
          <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value as TipoUsuario)}>
            {TIPOS_USUARIO.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className={`campo ${errores.region ? 'campo-invalido' : ''}`}>
          <label htmlFor="region">Región</label>
          <select
            id="region"
            value={region}
            onChange={(e) => {
              const reg = e.target.value;
              setRegion(reg);
              setComuna('');
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
            onChange={(e) => setComuna(e.target.value)}
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

        <div className={`campo ${errores.direccion ? 'campo-invalido' : ''}`}>
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            maxLength={300}
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          {errores.direccion && <p className="mensaje-error" style={{ display: 'block' }}>{errores.direccion}</p>}
        </div>

        <div className="grupo-botones">
          <button className="btn btn-primario" type="submit">
            Guardar
          </button>
          <Link className="btn btn-secundario" to="/admin/usuarios">
            Volver
          </Link>
        </div>
      </form>
    </>
  );
};
