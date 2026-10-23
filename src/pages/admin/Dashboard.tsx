import { useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductContext';
import { obtenerMensajes } from '@/services/messages';
import { esStockCritico, formatearPrecio } from '@/utils/validaciones';
import { ActionBar } from '@/components/ui/ActionGroup';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import type { DataColumn } from '@/components/ui/DataTable';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import type { Producto } from '@/types';
import { usePageTitle } from '@/hooks/usePageTitle';

export const Dashboard = () => {
  const { user, usuarios } = useAuth();
  const { productos } = useProducts();

  usePageTitle('Dashboard');

  const mensajes = useMemo(() => obtenerMensajes(), []);
  const criticos = useMemo(
    () => productos.filter((producto) => producto.stock > 0 && esStockCritico(producto.stock, producto.stockCritico)),
    [productos]
  );
  const esAdmin = user?.tipo === 'Administrador';

  const columnas: Array<DataColumn<Producto>> = [
    { key: 'codigo', header: 'Código', render: (producto) => <strong>{producto.codigo}</strong> },
    {
      key: 'nombre',
      header: 'Producto',
      render: (producto) => (
        <div>
          <span className="d-block">{producto.nombre}</span>
          <span className="text-secondary small">{producto.categoria}</span>
        </div>
      ),
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (producto) => (
        <Badge tone="warning">
          {producto.stock} / crítico {producto.stockCritico}
        </Badge>
      ),
    },
    {
      key: 'precio',
      header: 'Precio',
      render: (producto) => formatearPrecio(producto.precio),
    },
    {
      key: 'acciones',
      header: '',
      render: (producto) => (
        <Button
          to={`/admin/producto-form?codigo=${encodeURIComponent(producto.codigo)}`}
          variant="link"
          size="sm"
          icon="edit"
        >
          Editar
        </Button>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title={`Hola, ${user?.nombre ?? 'equipo'}`}
        description="Este es el resumen de tu tienda. Revisa el estado del catálogo y accede rápido a las tareas más frecuentes."
        actions={[
          {
            keyId: 'nuevo',
            label: 'Nuevo producto',
            to: '/admin/producto-form',
            variant: 'primary',
            icon: 'plus',
          },
          {
            keyId: 'tienda',
            label: 'Ver tienda',
            to: '/',
            variant: 'outline',
            icon: 'arrow-right',
            iconPosition: 'end',
          },
        ]}
      />

      <section className="stats-grid" aria-label="Resumen de la tienda">
        <StatCard label="Productos" value={productos.length} icon="box" tone="primary" />
        <StatCard
          label="Stock crítico"
          value={criticos.length}
          icon="alert"
          tone="warning"
          hint={criticos.length > 0 ? 'Requieren reposición' : 'Todo bajo control'}
        />
        <StatCard
          label="Usuarios"
          value={usuarios.length}
          icon="users"
          tone="success"
          hint="Clientes y equipo"
        />
        <StatCard
          label="Mensajes"
          value={mensajes.length}
          icon="mail"
          tone="danger"
          hint="Recibidos por contacto"
        />
      </section>

      <div className="row g-4">
        <div className="col-12 col-xl-7">
          <Card>
            <div className="card-body">
              <SectionHeader
                title="Accesos directos"
                description="Las acciones más usadas del panel."
              />
              <ActionBar
                nodes={[
                  {
                    keyId: 'nuevo-producto',
                    label: 'Nuevo producto',
                    to: '/admin/producto-form',
                    variant: 'primary',
                    icon: 'plus',
                  },
                  {
                    keyId: 'productos',
                    label: 'Gestionar productos',
                    to: '/admin/productos',
                    variant: 'soft',
                    icon: 'box',
                  },
                  ...(esAdmin
                    ? [
                        {
                          keyId: 'nuevo-usuario',
                          label: 'Nuevo usuario',
                          to: '/admin/usuario-form',
                          variant: 'outline' as const,
                          icon: 'user' as const,
                        },
                        {
                          keyId: 'usuarios',
                          label: 'Gestionar usuarios',
                          to: '/admin/usuarios',
                          variant: 'outline' as const,
                          icon: 'users' as const,
                        },
                      ]
                    : []),
                ]}
              />
            </div>
          </Card>

          {mensajes.length > 0 && (
            <Card className="mt-4">
              <div className="card-body">
                <SectionHeader
                  title="Últimos mensajes"
                  description="Consultas recibidas desde el formulario de contacto."
                />
                <ul className="message-list">
                  {mensajes
                    .slice(-3)
                    .reverse()
                    .map((mensaje, index) => (
                      <li key={mensaje.id ?? index}>
                        <div>
                          <strong>{mensaje.nombre}</strong>
                          <span>{mensaje.correo}</span>
                        </div>
                        <p>{mensaje.comentario ?? mensaje.contenido}</p>
                      </li>
                    ))}
                </ul>
              </div>
            </Card>
          )}
        </div>

        <div className="col-12 col-xl-5">
          <Card>
            <div className="card-body">
              <SectionHeader
                title="Stock crítico"
                description={
                  criticos.length > 0
                    ? 'Estos productos necesitan reposición pronto.'
                    : 'No hay productos en nivel crítico.'
                }
              />
              {criticos.length > 0 ? (
                <DataTable
                  columns={columnas}
                  rows={criticos.slice(0, 5)}
                  getRowKey={(producto) => producto.codigo}
                  emptyMessage="No hay productos con stock crítico."
                  caption="Productos con stock crítico"
                />
              ) : (
                <div className="dashboard-empty">
                  <Badge tone="success">Todo en orden</Badge>
                  <p className="mb-0 text-secondary">
                    El inventario está por sobre los niveles mínimos configurados.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
