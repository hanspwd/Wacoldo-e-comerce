import React from 'react';
import { useParams, Link } from 'react-router-dom';

const articulosDetallados: Record<
  string,
  {
    titulo: string;
    subtitulo: string;
    imagen: string;
    parrafos: string[];
  }
> = {
  '1': {
    titulo: 'Caso curioso #1',
    subtitulo: 'CASO CURIOSO #1: El secreto del café de grano',
    imagen: '/img/cafe.png',
    parrafos: [
      'El café de grano recién molido libera cientos de compuestos aromáticos que se pierden en pocos minutos. Por eso, moler justo antes de preparar es el paso más simple para mejorar tu taza.',
      'Para métodos filtrados como la prensa francesa conviene una molienda gruesa, mientras que para el espresso se necesita una molienda fina y uniforme. El tueste medio, como el de nuestro Café de Grano Premium 500g, equilibra dulzor y acidez para el consumo diario.',
      'Guarda tus granos en un envase hermético, lejos de la luz y el calor, y evita el refrigerador: la humedad es su peor enemiga.',
    ],
  },
  '2': {
    titulo: 'Caso curioso #2',
    subtitulo: 'CASO CURIOSO #2: ¿Cuándo renovar tus zapatillas?',
    imagen: '/img/zapatillas_flex.png',
    parrafos: [
      'La espuma de amortiguación de unas zapatillas de uso diario se compacta con el tiempo y deja de absorber impactos. En promedio, conviene renovarlas cada 600 a 800 kilómetros de uso, o una vez al año si las usas todos los días.',
      'Señales de desgaste: suela lisa en la zona del talón, arrugas profundas en la entresuela e incomodidad en rodillas o tobillos después de caminar.',
      'Un modelo liviano con buena ventilación, como nuestras Zapatillas Urbanas Flex, es ideal para el uso diario y la actividad física ligera.',
    ],
  },
};

export const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const articulo = id ? articulosDetallados[id] : null;

  if (!articulo) {
    return (
      <main className="contenedor">
        <article className="tarjeta">
          <p>Artículo no encontrado.</p>
          <Link className="btn btn-primario" to="/blogs">
            Volver a blogs
          </Link>
        </article>
      </main>
    );
  }

  return (
    <main className="contenedor">
      <article className="tarjeta">
        <p className="migas">
          <Link to="/blogs">Blogs</Link> &gt; {articulo.titulo}
        </p>
        <h1>{articulo.subtitulo}</h1>
        <img className="blog-img-detalle" src={articulo.imagen} alt={articulo.subtitulo} />
        {articulo.parrafos.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
        <Link className="btn btn-secundario" to="/blogs" style={{ marginTop: '16px', display: 'inline-block' }}>
          Volver a blogs
        </Link>
      </article>
    </main>
  );
};
