import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const { productos } = useProducts();

  return (
    <main className="contenedor">
      <section className="hero tarjeta">
        <div className="hero-texto">
          <h1>Ecommerce-wacoldo</h1>
          <p>
            Descubre nuestro catálogo con lo mejor en tecnología, ropa, hogar, deportes y alimentos.
            Compra fácil, rápido y seguro.
          </p>
          <Link className="btn btn-primario" to="/productos">
            Ver productos
          </Link>
        </div>
        <div className="hero-imagen">
          <img src="/img/ariculares_inalambricos.png" alt="Producto destacado" />
        </div>
      </section>

      <section>
        <h2>Productos destacados</h2>
        <div className="grid-productos">
          {productos.map((producto) => (
            <ProductCard key={producto.codigo} producto={producto} />
          ))}
        </div>
      </section>
    </main>
  );
};
