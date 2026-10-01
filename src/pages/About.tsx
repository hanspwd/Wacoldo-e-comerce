import React from 'react';

export const About: React.FC = () => {
  return (
    <main className="contenedor">
      <section className="tarjeta">
        <h1>Nosotros</h1>
        <p>
          Somos una tienda online chilena dedicada a ofrecer productos de calidad en tecnología,
          ropa, hogar, deportes y alimentos, con despacho a todo el país y atención personalizada.
        </p>
        <p>
          Nuestro compromiso es entregar una experiencia de compra simple, segura y transparente,
          respaldada por un equipo de desarrollo enfocado en la mejora continua.
        </p>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2>Equipo de desarrollo</h2>
        <div className="grid-equipo">
          <article className="tarjeta">
            <h3>Hans Morales</h3>
            <p>Desarrollo frontend, backend y validaciones.</p>
          </article>
          <article className="tarjeta">
            <h3>Horacio Navarrete</h3>
            <p>Diseño, estilos, maquetación y backend.</p>
          </article>
        </div>
      </section>
    </main>
  );
};
