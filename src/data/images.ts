export interface ImagenDisponible {
  label: string;
  valor: string;
}

export const IMAGEN_POR_DEFECTO = '/img/ariculares_inalambricos.png';

export const IMAGENES_DISPONIBLES: ImagenDisponible[] = [
  { label: 'Sin imagen', valor: '' },
  { label: 'Auriculares inalámbricos', valor: '/img/ariculares_inalambricos.png' },
  { label: 'Teclado mecánico', valor: '/img/teclado_mecanico.png' },
  { label: 'Polera de algodón', valor: '/img/polera_algodon.png' },
  { label: 'Zapatillas Flex', valor: '/img/zapatillas_flex.png' },
  { label: 'Lámpara LED', valor: '/img/lampara_led.png' },
  { label: 'Termo', valor: '/img/termo.png' },
  { label: 'Café de grano', valor: '/img/cafe.png' },
  { label: 'Botella deportiva', valor: '/img/botella_deportive.png' },
];
