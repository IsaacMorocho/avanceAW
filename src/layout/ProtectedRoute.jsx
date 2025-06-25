import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user?.rol?.toLowerCase() !== requiredRole.toLowerCase()) {
    // Redirige a dashboard según rol
    if (user?.rol?.toLowerCase() === 'superadmin') {
      return <Navigate to="/dashboard" replace />;
    }
    if (user?.rol?.toLowerCase() === 'estudiante') {
      return <Navigate to="/dashboard-estudiante" replace />;
    }
    // Puedes agregar más roles si tienes
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
