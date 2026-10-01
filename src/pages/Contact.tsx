import React, { useState } from 'react';
import { validarRequerido, validarLargo, validarCorreo, validarComentario } from '../utils/validaciones';
import { CLAVE_MENSAJES } from '../utils/datos';

export const Contact: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contenido, setContenido] = useState('');
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrores({});
    setMensajeExito(null);

    let valido = true;
    const nuevosErrores: Record<string, string> = {};

    let resNom = validarRequerido(nombre, 'Nombre completo');
    if (!resNom.valido) {
      nuevosErrores.nombre = resNom.mensaje;
      valido = false;
    } else {
      resNom = validarLargo(nombre, null, 100, 'Nombre completo');
      if (!resNom.valido) {
        nuevosErrores.nombre = resNom.mensaje;
        valido = false;
      }
    }

    const resCorreo = validarCorreo(correo);
    if (!resCorreo.valido) {
      nuevosErrores.correo = resCorreo.mensaje;
      valido = false;
    }

    const resCont = validarComentario(contenido);
    if (!resCont.valido) {
      nuevosErrores.contenido = resCont.mensaje;
      valido = false;
    }

    if (!valido) {
      setErrores(nuevosErrores);
      return;
    }

    // Persist message
    try {
      const actual = JSON.parse(localStorage.getItem(CLAVE_MENSAJES) || '[]');
      actual.push({
        nombre,
        correo,
        contenido,
        fecha: new Date().toISOString(),
      });
      localStorage.setItem(CLAVE_MENSAJES, JSON.stringify(actual));
    } catch {
      // ignore
    }

    setMensajeExito('Mensaje enviado. Te contactaremos pronto.');
    setNombre('');
    setCorreo('');
    setContenido('');
  };

  return (
    <main className="contenedor">
      <form id="form-contacto" className="tarjeta formulario" onSubmit={handleSubmit} noValidate>
        <h1>Tienda Web</h1>
        <h2>Formulario de contactos</h2>

        {mensajeExito && (
          <div className="alerta alerta-exito" style={{ marginBottom: '16px' }}>
            {mensajeExito}
          </div>
        )}

        <div className={`campo ${errores.nombre ? 'campo-invalido' : ''}`}>
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            maxLength={100}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            onChange={(e) => setCorreo(e.target.value)}
          />
          {errores.correo && <p className="mensaje-error" style={{ display: 'block' }}>{errores.correo}</p>}
        </div>

        <div className={`campo ${errores.contenido ? 'campo-invalido' : ''}`}>
          <label htmlFor="contenido">Contenido</label>
          <textarea
            id="contenido"
            rows={5}
            maxLength={500}
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
          ></textarea>
          {errores.contenido && <p className="mensaje-error" style={{ display: 'block' }}>{errores.contenido}</p>}
        </div>

        <button className="btn btn-primario" type="submit">
          Enviar mensaje
        </button>
      </form>
    </main>
  );
};
