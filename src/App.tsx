/* Lazy se utiliza para carga por chunks, solo se carga lo necesario solo cuando el usuario va a un lugar especifico
 // Ayudando a optimizar la carga de componentes, etc.

Suspense se utiliza como complemento de lazy (lazy loading).*/

import { Fragment, lazy, Suspense } from 'react';

/* Estos imports se utilizan para gestionar la navegacion y enrutamiento entre diferentes paginas o pantallas
en una aplicacion react.*/
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { ProductProvider } from '@/context/ProductContext';
import { ToastProvider } from '@/context/ToastContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { PageLoader } from '@/components/ui/PageLoader';
import { ToastViewport } from '@/components/ui/ToastViewport';
import { PublicLayout } from '@/layouts/PublicLayout';

// Importadas de forma inmediata (Eager) para garantizar que la vista principal (Home/Products) renderice al instante sin esperar chunks.
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';


/* Archivo original (ej. ProductDetail.jsx)
export const ProductDetail = () => { ... } // Exportación nombrada, NO default

React.lazy no sabe cómo leerlo directamente porque espera que el archivo tenga un export default.
Para solucionarlo se utilizo un "truco" de conversión sobre la marcha: 

1. import('...'): Carga el archivo de forma asíncrona y devuelve una Promesa con todos los elementos exportados dentro
de un objeto module.

2. .then((module) => ... ): Toma ese objeto module (que contiene { ProductDetail: Componente }).

3. ({ default: module.ProductDetail }): Mapea manualmente tu exportación nombrada al formato que React.lazy necesita -> Se hace pasar por default.

En lugar de descargar toda la aplicación junta al principio, el navegador solo descargará
el archivo de la página web (por ejemplo, el Dashboard de administrador) únicamente cuando el usuario visite esa ruta específica.
*/

const ProductDetail = lazy(() =>
  import('@/pages/ProductDetail').then((module) => ({ default: module.ProductDetail }))
);
const Cart = lazy(() => import('@/pages/Cart').then((module) => ({ default: module.Cart })));
const Login = lazy(() => import('@/pages/Login').then((module) => ({ default: module.Login })));
const Register = lazy(() =>
  import('@/pages/Register').then((module) => ({ default: module.Register }))
);
const About = lazy(() => import('@/pages/About').then((module) => ({ default: module.About })));
const Blogs = lazy(() => import('@/pages/Blogs').then((module) => ({ default: module.Blogs })));
const BlogDetail = lazy(() =>
  import('@/pages/BlogDetail').then((module) => ({ default: module.BlogDetail }))
);
const Contact = lazy(() =>
  import('@/pages/Contact').then((module) => ({ default: module.Contact }))
);

const AdminLayout = lazy(() =>
  import('@/layouts/AdminLayout').then((module) => ({ default: module.AdminLayout }))
);
const Dashboard = lazy(() =>
  import('@/pages/admin/Dashboard').then((module) => ({ default: module.Dashboard }))
);
const AdminProducts = lazy(() =>
  import('@/pages/admin/AdminProducts').then((module) => ({ default: module.AdminProducts }))
);
const AdminProductForm = lazy(() =>
  import('@/pages/admin/AdminProductForm').then((module) => ({
    default: module.AdminProductForm,
  }))
);
const AdminUsers = lazy(() =>
  import('@/pages/admin/AdminUsers').then((module) => ({ default: module.AdminUsers }))
);
const AdminUserForm = lazy(() =>
  import('@/pages/admin/AdminUserForm').then((module) => ({ default: module.AdminUserForm }))
);

export const App = () => (


  // Contenedor principal que habilita la navegacion interna, para
  // evitar que la pagina se recargue por completo cuando cambiamos de seccion, etc.
  <BrowserRouter> 

    {/* El orden de los Providers es estricto: AuthProvider va primero porque el carrito y las rutas protegidas dependen de la sesión del usuario.*/}
    <AuthProvider> {/* Se encarga de manejar la sesion de los usuarios */}

      {/* Administra el catálogo de productos, filtros, categorías y la lectura/obtención de datos*/}
      <ProductProvider>

        {/*  Controla el carrito de compras (agregar productos, calcular el total de la compra, vaciar el carrito) */}
        <CartProvider>

          {/* Sistema encargado de gestionar alertas visuales flotantes (notificaciones de éxito, errores o advertencias). */}
          <ToastProvider>

            {/* Etiqueta invisible que sirve para agrupar la navegacion, etc.
            Evitando agregar etiquetas divs innecesarias al diseño html final.
            
            OSEA ES COM UN DIV PERO NO.*/}
            <Fragment>
              <ScrollToTop />
              <Suspense fallback={<PageLoader />}>


                {/* Agrupador de rutas. */}
                <Routes>

                  <Route element={<PublicLayout />}>
                  {/* Rutas principales */}
                    <Route path="/" element={<Home />} />
                    <Route path="/productos" element={<Products />} />
                    <Route path="/producto/:codigo" element={<ProductDetail />} />
                    <Route path="/carrito" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Register />} />
                    <Route path="/nosotros" element={<About />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                    <Route path="/contacto" element={<Contact />} />
                  </Route>

                  {/*Anidación de layout y roles: /admin exige rol Administrador o Vendedor. 
                    Las rutas internas (/usuarios) elevan el nivel de seguridad exigiendo exclusivamente 'Administrador'.*/}
                  
                  {/* A futuro quiza se necesita llevar esto al backend para que el acceso sea una manera mucho mas estricta. */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute rolesPermitidos={['Administrador', 'Vendedor'] /* Solo a estos dos roles se les carga el layout de admin (dashboard admin) */}>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >

                    {/* Aqui estando ya dentro del dashboard cargamos las rutas 
                    para dar de alta baja o modificar usuarios y lo mismo para productos e inventario.*/}
                    <Route index element={<Dashboard />} />
                    <Route path="productos" element={<AdminProducts />} />
                    <Route path="producto-form" element={<AdminProductForm />} />
                    <Route
                      path="usuarios"
                      element={
                        <ProtectedRoute rolesPermitidos={['Administrador']}>
                          <AdminUsers />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="usuario-form"
                      element={
                        <ProtectedRoute rolesPermitidos={['Administrador']}>
                          <AdminUserForm />
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
              <ToastViewport />
            </Fragment>
          </ToastProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
