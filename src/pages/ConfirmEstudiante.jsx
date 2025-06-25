import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ConfirmEstudiante = () => {
  const { token } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const response = await fetch(`https://backendv2-as6n.onrender.com/api/confirmar/${token}`, {
          method: 'GET'
        })

        const result = await response.json()

        if (response.ok && result?.msg) {
          toast.success(result.msg)
          setTimeout(() => {
            navigate('/login-estudiante')
          }, 2000) // espera 2 segundos para redirigir
        } else {
          toast.error(result?.msg || 'Token inválido o expirado')
          setTimeout(() => {
            navigate('/')
          }, 3000)
        }
      } catch (error) {
        toast.error('Error al conectar con el servidor')
        navigate('/')
      }
    }

    confirmAccount()
  }, [token, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Verificando tu cuenta...</h2>
        <p>Por favor espera mientras confirmamos tu dirección de correo electrónico.</p>
      </div>
    </div>
  )
}

export default ConfirmEstudiante
