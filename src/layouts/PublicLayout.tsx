import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const PublicLayout = () => (
  <div className="app-shell">
    <a className="skip-link" href="#main-content">
      Saltar al contenido
    </a>
    <Navbar />
    <main id="main-content" className="site-main">
      <Outlet />
    </main>
    <Footer />
  </div>
);
