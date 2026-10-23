import { useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import type { Usuario } from '@/types';
import { ActionBar } from '@/components/ui/ActionGroup';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { DataTable } from '@/components/ui/DataTable';
import type { DataColumn } from '@/components/ui/DataTable';
import { PageHeader } from '@/components/ui/PageHeader';
import { TextInput } from '@/components/ui/Field';
import { usePageTitle } from '@/hooks/usePageTitle';

export const AdminUsers = () => {
  const { usuarios, eliminarUsuario } = useAuth();
  const { showToast } = useToast();
  const [busqueda, setBusqueda] = useState('');
  const [pendiente, setPendiente] = useState<Usuario | null>(null);

  usePageTitle('Usuarios · Admin');

  const filtrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) return usuarios;

    return usuarios.filter(
      (usuario) =>
        usuario.nombre.toLowerCase().includes(termino) ||
        usuario.correo.toLowerCase().includes(termino) ||
        usuario.tipo.toLowerCase().includes(termino)
    );
  }, [busqueda, usuarios]);

  const columnas: Array<DataColumn<Usuario>> = [
    {
      key: 'rut',
      header: 'RUN / RUT',
      render: (usuario) => <strong>{usuario.rut || usuario.run}</strong>,
    },
    {
      key: 'nombre',
      header: 'Usuario',
      render: (usuario) => (
        <div>
          <span className="d-block">{`${usuario.nombre} ${usuario.apellidos || ''}`.trim()}</span>
          <span className="text-secondary small">{usuario.correo}</span>
        </div>
      ),
    },
    {
      key: 'tipo',
      header: 'Tipo',
      render: (usuario) => (
        <Badge
          tone={
            usuario.tipo === 'Administrador'
              ? 'primary'
              : usuario.tipo === 'Vendedor'
                ? 'accent'
                : 'neutral'
          }
        >
          {usuario.tipo}
        </Badge>
      ),
    },
    {
      key: 'ubicacion',
      header: 'Ubicación',
      render: (usuario) => `${usuario.comuna}, ${usuario.region}`,
    },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (usuario) => (
        <ActionBar
          wrap={false}
          nodes={[
            {
              keyId: 'editar',
              label: 'Editar',
              to: `/admin/usuario-form?correo=${encodeURIComponent(usuario.correo)}`,
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
              onClick: () => setPendiente(usuario),
            },
          ]}
        />
      ),
    },
  ];

  const handleEliminar = () => {
    if (!pendiente) return;
    eliminarUsuario(pendiente.correo);
    showToast(`Usuario "${pendiente.nombre}" eliminado.`, 'info');
    setPendiente(null);
  };

  return (
    <>
      <PageHeader
        eyebrow="Usuarios"
        title="Gestión de usuarios"
        description="Administra las cuentas de clientes, vendedores y administradores de la tienda."
        actions={[
          {
            keyId: 'nuevo',
            label: 'Nuevo usuario',
            to: '/admin/usuario-form',
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
                id="buscar-usuarios"
                name="buscar-usuarios"
                type="search"
                placeholder="Buscar por nombre, correo o tipo"
                value={busqueda}
                icon="search"
                onChange={(event) => setBusqueda(event.target.value)}
              />
            </div>
            <span className="text-secondary">{filtrados.length} usuarios</span>
          </div>

          <DataTable
            columns={columnas}
            rows={filtrados}
            getRowKey={(usuario) => usuario.correo}
            emptyMessage="No se encontraron usuarios con ese criterio."
            caption="Listado de usuarios"
          />
        </div>
      </Card>

      <ConfirmDialog
        open={Boolean(pendiente)}
        title="Eliminar usuario"
        description={
          pendiente
            ? `¿Seguro que deseas eliminar la cuenta de ${pendiente.nombre} (${pendiente.correo})? Esta acción no se puede deshacer.`
            : ''
        }
        confirmLabel="Eliminar usuario"
        onConfirm={handleEliminar}
        onCancel={() => setPendiente(null)}
      />
    </>
  );
};
