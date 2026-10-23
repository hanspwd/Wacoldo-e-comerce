import type { BlogPost, MiembroEquipo } from '@/types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    titulo: 'El secreto del café de grano',
    subtitulo: 'CASO CURIOSO #1: El secreto del café de grano',
    resumen:
      '¿Sabías que el café de grano conserva mejor su aroma cuando se muele justo antes de prepararlo? Te contamos cómo elegir el tueste ideal para tu método de preparación favorito.',
    imagen: '/img/cafe.png',
    categoria: 'Alimentos',
    fecha: '12 de marzo de 2026',
    tiempoLectura: '4 min de lectura',
    parrafos: [
      'El café de grano recién molido libera cientos de compuestos aromáticos que se pierden en pocos minutos. Por eso, moler justo antes de preparar es el paso más simple para mejorar tu taza.',
      'Para métodos filtrados como la prensa francesa conviene una molienda gruesa, mientras que para el espresso se necesita una molienda fina y uniforme. El tueste medio, como el de nuestro Café de Grano Premium 500g, equilibra dulzor y acidez para el consumo diario.',
      'Guarda tus granos en un envase hermético, lejos de la luz y el calor, y evita el refrigerador: la humedad es su peor enemiga.',
    ],
  },
  {
    id: '2',
    titulo: '¿Cuándo renovar tus zapatillas?',
    subtitulo: 'CASO CURIOSO #2: ¿Cuándo renovar tus zapatillas?',
    resumen:
      'La amortiguación de tus zapatillas pierde eficacia con el uso diario. Descubre cada cuánto conviene renovarlas y cómo elegir el modelo ideal según tu pisada.',
    imagen: '/img/zapatillas_flex.png',
    categoria: 'Deportes',
    fecha: '28 de marzo de 2026',
    tiempoLectura: '3 min de lectura',
    parrafos: [
      'La espuma de amortiguación de unas zapatillas de uso diario se compacta con el tiempo y deja de absorber impactos. En promedio, conviene renovarlas cada 600 a 800 kilómetros de uso, o una vez al año si las usas todos los días.',
      'Señales de desgaste: suela lisa en la zona del talón, arrugas profundas en la entresuela e incomodidad en rodillas o tobillos después de caminar.',
      'Un modelo liviano con buena ventilación, como nuestras Zapatillas Urbanas Flex, es ideal para el uso diario y la actividad física ligera.',
    ],
  },
];

export const obtenerBlogPost = (id: string): BlogPost | undefined =>
  BLOG_POSTS.find((post) => post.id === id);

export const EQUIPO: MiembroEquipo[] = [
  {
    nombre: 'Hans Morales',
    rol: 'Frontend & validaciones',
    descripcion: 'Desarrollo de interfaces, lógica de formularios y experiencia de compra.',
    iniciales: 'HM',
  },
  {
    nombre: 'Horacio Navarrete',
    rol: 'Diseño & backend',
    descripcion: 'Sistema visual, maquetación responsiva e integración de servicios.',
    iniciales: 'HN',
  },
];
