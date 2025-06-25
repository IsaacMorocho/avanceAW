import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './AuthContext'  // Cambiado de ../context a ./

const DashboardEstudiante = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login-estudiante')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-blue-800 text-white w-64 p-4 flex flex-col">
        <div className="mb-8 mt-4 text-center">
          <h1 className="text-2xl font-bold">
            Poli<span className="text-red-500">RED</span>
          </h1>
          <p className="text-blue-200 text-sm">Panel de Estudiante</p>
        </div>

        <div className="mb-6 text-center">
          <div className="w-20 h-20 rounded-full bg-blue-700 mx-auto mb-2 overflow-hidden">
            <div className="flex items-center justify-center h-full text-3xl">
              {user?.nombre?.charAt(0)}
            </div>
          </div>
          <h3 className="font-medium">{user?.nombre}</h3>
          <p className="text-blue-200 text-sm">{user?.email}</p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/dashboard-estudiante" 
                className="block px-4 py-2 rounded hover:bg-blue-700 transition"
                end
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link 
                to="" 
                className="block px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Redes Comunitarias
              </Link>
            </li>
            <li>
              <Link 
                to="" 
                className="block px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Mensajes
              </Link>
            </li>
          </ul>
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Bienvenido, {user?.nombre}
          </h2>
        </header>
        
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardEstudiante