import { useMemo, useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { useToast } from '@/context/ToastContext';
import { esStockCritico } from '@/utils/validaciones';
import type { Producto } from '@/types';
import { ActionBar } from '@/components/ui/ActionGroup';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { DataTable } from '@/components/ui/DataTable';
import type { DataColumn } from '@/components/ui/DataTable';
import { PageHeader } from '@/components/ui/PageHeader';
import { Price } from '@/components/ui/Price';
import { TextInput } from '@/components/ui/Field';
import { usePageTitle } from '@/hooks/usePageTitle';

export const AdminProducts = () => {
  const { productos, eliminarProducto } = useProducts();
  const { showToast } = useToast();
  const [busqueda, setBusqueda] = useState('');
  const [pendiente, setPendiente] = useState<Producto | null>(null);

  usePageTitle('Productos · Admin');

  const filtrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) return productos;

    return productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(termino) ||
        producto.codigo.toLowerCase().includes(termino) ||
        producto.categoria.toLowerCase().includes(termino)
    );
  }, [busqueda, productos]);

  const columnas: Array<DataColumn<Producto>> = [
    {
      key: 'codigo',
      header: 'Código',
      render: (producto) => <strong>{producto.codigo}</strong>,
    },
    {
      key: 'nombre',
      header: 'Producto',
      render: (producto) => {
        const critico = producto.stock > 0 && esStockCritico(producto.stock, producto.stockCritico);
        return (
          <div className="d-flex align-items-center gap-2">
            <span>{producto.nombre}</span>
            {critico && <Badge tone="warning">Stock crítico</Badge>}
          </div>
        );
      },
    },
    { key: 'categoria', header: 'Categoría' },
    {
      key: 'precio',
      header: 'Precio',
      render: (producto) => <Price value={producto.precio} size="sm" />,
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (producto) => (
        <Badge tone={producto.stock === 0 ? 'danger' : producto.stock <= producto.stockCritico ? 'warning' : 'success'}>
          {producto.stock}
        </Badge>
      ),
    },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (producto) => (
        <ActionBar
          wrap={false}
          nodes={[
            {
              keyId: 'editar',
              label: 'Editar',
              to: `/admin/producto-form?codigo=${encodeURIComponent(producto.codigo)}`,
              variant: 'soft',
              size: 'sm',
              icon: 'edit',
            },
            {
              keyId: 'eliminar',
              label: 'Eliminar',
              variant: 'danger',
              size: 'sm',
              icon: 'trash',
              onClick: () => setPendiente(producto),
            },
          ]}
        />
      ),
    },
  ];

  const handleEliminar = () => {
    if (!pendiente) return;
    eliminarProducto(pendiente.codigo);
    showToast(`Producto "${pendiente.nombre}" eliminado.`, 'info');
    setPendiente(null);
  };

  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title="Gestión de productos"
        description="Crea, edita y elimina productos. Los cambios se reflejan de inmediato en la tienda."
        actions={[
          {
            keyId: 'nuevo',
            label: 'Nuevo producto',
            to: '/admin/producto-form',
            variant: 'primary',
            icon: 'plus',
          },
        ]}
      />

      <Card>
        <div className="card-body">
          <div className="table-toolbar">
            <div className="table-toolbar__search">
              <TextInput
                id="buscar-productos"
                name="buscar-productos"
                type="search"
                placeholder="Buscar por nombre, código o categoría"
                value={busqueda}
                icon="search"
                onChange={(event) => setBusqueda(event.target.value)}
              />
            </div>
            <span className="text-secondary">{filtrados.length} productos</span>
          </div>

          <DataTable
            columns={columnas}
            rows={filtrados}
            getRowKey={(producto) => producto.codigo}
            getRowClassName={(producto) =>
              producto.stock > 0 && esStockCritico(producto.stock, producto.stockCritico)
                ? 'table-row-warning'
                : ''
            }
            emptyMessage="No se encontraron productos con ese criterio."
            caption="Listado de productos"
          />
        </div>
      </Card>

      <ConfirmDialog
        open={Boolean(pendiente)}
        title="Eliminar producto"
        description={
          pendiente
            ? `¿Seguro que deseas eliminar "${pendiente.nombre}" (${pendiente.codigo})? Esta acción no se puede deshacer.`
            : ''
        }
        confirmLabel="Eliminar producto"
        onConfirm={handleEliminar}
        onCancel={() => setPendiente(null)}
      />
    </>
  );
};
