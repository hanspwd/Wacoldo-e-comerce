import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AdminUsers: React.FC = () => {
  const { usuarios, eliminarUsuario } = useAuth();

  const handleEliminar = (correo: string) => {
    if (window.confirm(`¿Eliminar al usuario ${correo}?`)) {
      eliminarUsuario(correo);
    }
  };

  return (
    <>
      <header className="admin-encabezado">
        <h1>Usuarios</h1>
        <Link className="btn btn-primario" to="/admin/usuario-form">
          Nuevo usuario
        </Link>
      </header>

      <div className="tarjeta tabla-responsive">
        <table className="tabla">
          <thead>
            <tr>
              <th>RUN / RUT</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.correo}>
                <td>{u.rut || u.run || '-'}</td>
                <td>{`${u.nombre} ${u.apellidos || ''}`.trim()}</td>
                <td>{u.correo}</td>
                <td>{u.tipo}</td>
                <td>
                  <div className="grupo-botones">
                    <Link
                      className="btn btn-secundario"
                      to={`/admin/usuario-form?correo=${encodeURIComponent(u.correo)}`}
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-peligro"
                      type="button"
                      onClick={() => handleEliminar(u.correo)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
