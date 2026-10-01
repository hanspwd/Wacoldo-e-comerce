import React from 'react';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  titulo: string;
  resumen: string;
  imagen: string;
}

const blogsList: Post[] = [
  {
    id: '1',
    titulo: 'CASO CURIOSO #1: El secreto del café de grano',
    resumen:
      '¿Sabías que el café de grano conserva mejor su aroma cuando se muele justo antes de prepararlo? Te contamos cómo elegir el tueste ideal para tu método de preparación favorito.',
    imagen: '/img/cafe.png',
  },
  {
    id: '2',
    titulo: 'CASO CURIOSO #2: ¿Cuándo renovar tus zapatillas?',
    resumen:
      'La amortiguación de tus zapatillas pierde eficacia con el uso diario. Descubre cada cuánto conviene renovarlas y cómo elegir el modelo ideal según tu pisada.',
    imagen: '/img/zapatillas_flex.png',
  },
];

export const Blogs: React.FC = () => {
  return (
    <main className="contenedor">
      <h1>NOTICIAS IMPORTANTES</h1>
      {blogsList.map((blog) => (
        <article key={blog.id} className="tarjeta blog-resumen" style={{ marginBottom: '24px' }}>
          <div>
            <h2>{blog.titulo}</h2>
            <p>{blog.resumen}</p>
            <Link className="btn btn-primario" to={`/blog/${blog.id}`}>
              Ver caso
            </Link>
          </div>
          <img className="blog-img" src={blog.imagen} alt={blog.titulo} />
        </article>
      ))}
    </main>
  );
};
