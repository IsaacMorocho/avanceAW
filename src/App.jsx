import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import Login from './pages/Login'
import { Register } from './pages/Register'
import { Forgot } from './pages/Forgot'
import { NotFound } from './pages/NotFound'
import Dashboard from './layout/Dashboard'
import Profile from './pages/Profile'
import Usuarios from './pages/Usuarios'
import Details from './pages/Details'
import Redes from './pages/Redes'
import Update from './pages/Update'
import Chat from './pages/Chat'
import Reset from './pages/recuperarpassword'
import ProtectedRoute from './layout/ProtectedRoute'
import ProtectedRouteEstudiante from './layout/ProtectedRouterEstudiante'
import PublicRoute from './layout/PublicRoute'
import LoginEstudiante from './pages/Login_Estudiante'
import RegisterEstudiante from './pages/Register_estudiante'
import ConfirmEstudiante from './pages/ConfirmEstudiante'
import DashboardEstudiante from './layout/DashboardEstudiante'
import {ForgotE} from './pages/ForgotE'
import RecuperarPasswordE from './pages/RecuperarPasswordE'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='login' element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="confirmar-cuenta/:token" element={<ConfirmEstudiante />}></Route>
        <Route path="login-estudiante" element={
          <PublicRoute>
            <LoginEstudiante />
          </PublicRoute>
        } />
        <Route path="register-estudiante" element={
          <PublicRoute>
            <RegisterEstudiante />
          </PublicRoute>
        } />
        <Route
          path="/dashboard-estudiante"
          element={
            <ProtectedRoute requiredRole="Estudiante">
              <DashboardEstudiante />
            </ProtectedRoute>
          }
        />
        <Route path='register' element={
          <PublicRoute>
            <Register />
          </PublicRoute>} />
        <Route path='forgot/:id' element={<Forgot />} />
        <Route path='estudiante/recuperar/:id' element={<ForgotE/>}></Route>
        <Route path='recuperarpassword-e/:token' element={<RecuperarPasswordE/>}></Route>
        <Route path='recuperarpassword/:token' element={<Reset />} /> {/*Super admin */}
        <Route path='*' element={<NotFound />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute requiredRole="SuperAdmin">
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route path='usuarios' element={<Usuarios />} />
          <Route path='visualizar/:id' element={<Details />} />
          <Route path='redes' element={<Redes />} />
          <Route path='actualizar/:id' element={<Update />} />
          <Route path='chat' element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
