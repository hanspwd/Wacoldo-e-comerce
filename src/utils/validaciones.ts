import { ResultadoValidacion } from '../types';

export const DOMINIOS_PERMITIDOS = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
export const EMAIL_MAX = 100;
export const CONTRASENA_MIN = 4;
export const CONTRASENA_MAX = 10;
export const RUN_MIN = 7;
export const RUN_MAX = 9;

export function limpiar(valor: unknown): string {
  return String(valor === null || valor === undefined ? '' : valor).trim();
}

export function valido(mensaje: string = ''): ResultadoValidacion {
  return { valido: mensaje === '', mensaje };
}

export function calcularDigitoVerificador(cuerpo: string): string {
  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  const resto = suma % 11;
  const dvCalculado = 11 - resto;
  if (dvCalculado === 11) {
    return '0';
  }
  if (dvCalculado === 10) {
    return 'K';
  }
  return String(dvCalculado);
}

export function limpiarRut(valor: unknown): string {
  return limpiar(valor).replace(/[^0-9kK]/g, '').toUpperCase();
}

export function formatearRut(valor: unknown): string {
  const limpio = limpiarRut(valor);
  if (limpio.length < 2) {
    return limpio;
  }
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  let cuerpoFormateado = '';
  let count = 0;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    cuerpoFormateado = cuerpo.charAt(i) + cuerpoFormateado;
    count++;
    if (count % 3 === 0 && i !== 0) {
      cuerpoFormateado = '.' + cuerpoFormateado;
    }
  }
  return cuerpoFormateado + '-' + dv;
}

export function validarRut(valor: unknown): ResultadoValidacion {
  const texto = limpiar(valor);
  if (texto.length === 0) {
    return valido('El RUT es obligatorio.');
  }
  const formatoValido =
    /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$/i.test(texto) ||
    /^[0-9]{7,8}-[0-9kK]$/i.test(texto) ||
    /^[0-9]{7,8}[0-9kK]$/i.test(texto);

  if (!formatoValido) {
    return valido('El formato del RUT no es válido. Ej: 12.345.678-5 o 12345678-5');
  }
  const limpio = limpiarRut(texto);
  const cuerpo = limpio.slice(0, -1);
  const digitoVerificador = limpio.slice(-1);
  const dvEsperado = calcularDigitoVerificador(cuerpo);
  if (digitoVerificador !== dvEsperado) {
    return valido('El RUT ingresado no es válido (dígito verificador incorrecto).');
  }
  return valido('');
}

export function validarRun(valor: unknown): ResultadoValidacion {
  const run = limpiar(valor);
  if (run.length === 0) {
    return valido('El RUN es obligatorio.');
  }
  if (run.length < RUN_MIN || run.length > RUN_MAX) {
    return valido(`El RUN debe tener entre ${RUN_MIN} y ${RUN_MAX} caracteres.`);
  }
  if (!/^[0-9]+[0-9kK]$/.test(run)) {
    return valido('El RUN no debe contener puntos ni guiones. Ej: 19011022K');
  }
  const cuerpo = run.slice(0, -1);
  const digitoVerificador = run.slice(-1).toUpperCase();
  const dvEsperado = calcularDigitoVerificador(cuerpo);
  if (digitoVerificador !== dvEsperado) {
    return valido('El RUN ingresado no es válido.');
  }
  return valido('');
}

export function validarRequerido(valor: unknown, nombreCampo: string): ResultadoValidacion {
  const texto = limpiar(valor);
  if (texto.length === 0) {
    return valido(`El campo '${nombreCampo}' es obligatorio.`);
  }
  return valido('');
}

export function validarLargo(
  valor: unknown,
  min: number | null | undefined,
  max: number | null | undefined,
  nombreCampo: string
): ResultadoValidacion {
  const largo = limpiar(valor).length;
  if (min !== null && min !== undefined && largo < min) {
    return valido(`El campo '${nombreCampo}' debe tener al menos ${min} caracteres.`);
  }
  if (max !== null && max !== undefined && largo > max) {
    return valido(`El campo '${nombreCampo}' no puede superar los ${max} caracteres.`);
  }
  return valido('');
}

export function validarEntero(valor: unknown, nombreCampo: string): ResultadoValidacion {
  const texto = limpiar(valor);
  if (texto.length === 0) {
    return valido(`El campo '${nombreCampo}' es obligatorio.`);
  }
  if (!/^[0-9]+$/.test(texto)) {
    return valido(`El campo '${nombreCampo}' debe ser un número entero.`);
  }
  return valido('');
}

export function validarCorreo(valor: unknown): ResultadoValidacion {
  const correo = limpiar(valor).toLowerCase();
  if (correo.length === 0) {
    return valido('El correo es obligatorio.');
  }
  if (correo.length > EMAIL_MAX) {
    return valido(`El correo no puede superar los ${EMAIL_MAX} caracteres.`);
  }
  if (correo.indexOf('@') === -1) {
    return valido("El correo debe contener el símbolo '@'.");
  }
  const dominio = correo.slice(correo.indexOf('@'));
  if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
    return valido('Solo se aceptan correos de los dominios @duoc.cl, @profesor.duoc.cl y @gmail.com.');
  }
  return valido('');
}

export function validarContrasena(valor: unknown): ResultadoValidacion {
  const contrasena = limpiar(valor);
  if (contrasena.length === 0) {
    return valido('La contraseña es obligatoria.');
  }
  if (contrasena.length < CONTRASENA_MIN || contrasena.length > CONTRASENA_MAX) {
    return valido(`La contraseña debe tener entre ${CONTRASENA_MIN} y ${CONTRASENA_MAX} caracteres.`);
  }
  return valido('');
}

export function validarConfirmacionContrasena(contrasena: unknown, confirmacion: unknown): ResultadoValidacion {
  const clave = limpiar(contrasena);
  const repeticion = limpiar(confirmacion);
  if (repeticion.length === 0) {
    return valido('Debes confirmar la contraseña.');
  }
  if (clave !== repeticion) {
    return valido('Las contraseñas no coinciden.');
  }
  return valido('');
}

export function validarCodigoProducto(valor: unknown): ResultadoValidacion {
  const codigo = limpiar(valor);
  if (codigo.length === 0) {
    return valido('El código del producto es obligatorio.');
  }
  if (codigo.length < 3) {
    return valido('El código del producto debe tener al menos 3 caracteres.');
  }
  return valido('');
}

export function validarNombreProducto(valor: unknown): ResultadoValidacion {
  const req = validarRequerido(valor, 'Nombre');
  if (!req.valido) return req;
  return validarLargo(valor, null, 100, 'Nombre');
}

export function validarDescripcion(valor: unknown): ResultadoValidacion {
  const desc = limpiar(valor);
  if (desc.length === 0) return valido('');
  return validarLargo(valor, null, 500, 'Descripción');
}

export function validarPrecio(valor: unknown): ResultadoValidacion {
  const texto = limpiar(valor);
  if (texto.length === 0) {
    return valido('El precio es obligatorio.');
  }
  if (!/^[0-9]+(\.[0-9]+)?$/.test(texto)) {
    return valido('El precio debe ser un número positivo, permite decimales. Ej: 4999.9');
  }
  return valido('');
}

export function validarStock(valor: unknown): ResultadoValidacion {
  return validarEntero(valor, 'Stock');
}

export function validarStockCritico(valor: unknown): ResultadoValidacion {
  const texto = limpiar(valor);
  if (texto.length === 0) return valido('');
  if (!/^[0-9]+$/.test(texto)) {
    return valido('El stock crítico debe ser un número entero.');
  }
  return valido('');
}

export function validarCategoria(valor: unknown): ResultadoValidacion {
  const texto = limpiar(valor);
  if (texto.length === 0) {
    return valido('Debes seleccionar una categoría.');
  }
  return valido('');
}

export function validarNombreUsuario(valor: unknown): ResultadoValidacion {
  const req = validarRequerido(valor, 'Nombre');
  if (!req.valido) return req;
  return validarLargo(valor, null, 50, 'Nombre');
}

export function validarApellidos(valor: unknown): ResultadoValidacion {
  const req = validarRequerido(valor, 'Apellidos');
  if (!req.valido) return req;
  return validarLargo(valor, null, 100, 'Apellidos');
}

export function validarTelefono(valor: unknown): ResultadoValidacion {
  const texto = limpiar(valor);
  if (texto.length === 0) return valido('');
  if (!/^[0-9]{8,15}$/.test(texto)) {
    return valido('El teléfono debe contener solo números (entre 8 y 15 dígitos).');
  }
  return valido('');
}

export function validarDireccion(valor: unknown): ResultadoValidacion {
  const req = validarRequerido(valor, 'Dirección');
  if (!req.valido) return req;
  return validarLargo(valor, null, 300, 'Dirección');
}

export function validarComentario(valor: unknown): ResultadoValidacion {
  const req = validarRequerido(valor, 'Comentario');
  if (!req.valido) return req;
  return validarLargo(valor, null, 500, 'Comentario');
}

export function validarRegionYComuna(region: unknown, comuna: unknown): ResultadoValidacion {
  if (!limpiar(region)) {
    return valido('Debes seleccionar una región.');
  }
  if (!limpiar(comuna)) {
    return valido('Debes seleccionar una comuna.');
  }
  return valido('');
}

export function esStockCritico(stock: number | string, stockCritico: number | string): boolean {
  const limite = Number.isFinite(Number(stockCritico)) ? Number(stockCritico) : 0;
  return Number(stock) <= limite;
}

export function formatearPrecio(precio: number): string {
  return '$' + Number(precio).toLocaleString('es-CL');
}
