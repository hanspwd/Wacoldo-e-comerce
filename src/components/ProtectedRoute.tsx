import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TipoUsuario } from '../types';

interface ProtectedRouteProps {
  children: React.ReactElement;
  rolesPermitidos?: TipoUsuario[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  rolesPermitidos = ['Administrador', 'Vendedor'],
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(user.tipo)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
