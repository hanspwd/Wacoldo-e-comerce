type StorageArea = 'local' | 'session';

function getStorage(area: StorageArea): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return area === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

export function leerJSON<T>(clave: string, respaldo: T, area: StorageArea = 'local'): T {
  const storage = getStorage(area);
  if (!storage) return respaldo;

  try {
    const valor = storage.getItem(clave);
    return valor ? (JSON.parse(valor) as T) : respaldo;
  } catch {
    return respaldo;
  }
}

export function guardarJSON(clave: string, valor: unknown, area: StorageArea = 'local'): boolean {
  const storage = getStorage(area);
  if (!storage) return false;

  try {
    storage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}

export function eliminarClave(clave: string, area: StorageArea = 'local'): boolean {
  const storage = getStorage(area);
  if (!storage) return false;

  try {
    storage.removeItem(clave);
    return true;
  } catch {
    return false;
  }
}
