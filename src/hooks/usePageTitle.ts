import { useEffect } from 'react';

const SUFIJO = 'Wacoldo Store';

export function usePageTitle(titulo: string): void {
  useEffect(() => {
    document.title = titulo ? `${titulo} | ${SUFIJO}` : SUFIJO;
  }, [titulo]);
}
