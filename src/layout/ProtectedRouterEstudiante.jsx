const ProtectedRouteEstudiante = ({ children }) => {
  const { isAuthenticated, user } = useContext(AuthContext)

  if (!isAuthenticated) {
    return <Navigate to="/login-estudiante" replace />
  }

  if (user?.rol?.toLowerCase() !== 'estudiante') {
    return <Navigate to="/no-autorizado" replace />
  }

  return children
}

export default ProtectedRouteEstudiante