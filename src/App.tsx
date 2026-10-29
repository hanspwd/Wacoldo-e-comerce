import { Fragment, lazy, Suspense } from 'react';
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
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';

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
  <BrowserRouter>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <ToastProvider>
            <Fragment>
              <ScrollToTop />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route element={<PublicLayout />}>
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

                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute rolesPermitidos={['Administrador', 'Vendedor']}>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >
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
