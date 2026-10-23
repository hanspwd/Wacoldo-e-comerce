import type { MensajeContacto } from '@/types';
import { CLAVE_MENSAJES } from '@/data';
import { guardarJSON, leerJSON } from './storage';

export function obtenerMensajes(): MensajeContacto[] {
  const mensajes = leerJSON<MensajeContacto[]>(CLAVE_MENSAJES, []);
  return Array.isArray(mensajes) ? mensajes : [];
}

export function guardarMensaje(datos: Omit<MensajeContacto, 'id' | 'fecha'>): MensajeContacto {
  const mensaje: MensajeContacto = {
    ...datos,
    id: `MSG-${Date.now()}`,
    fecha: new Date().toISOString(),
  };

  guardarJSON(CLAVE_MENSAJES, [...obtenerMensajes(), mensaje]);
  return mensaje;
}
