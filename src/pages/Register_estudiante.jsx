import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const RegisterEstudiante = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('https://backendv2-as6n.onrender.com/api/registro-estudiantes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          password: data.password
        })
      })

      const result = await response.json()

      if (response.ok && result?.estudiante) {
        toast.success('Registro exitoso. Verifica tu correo electrónico.')
        navigate('/login-estudiante')
      } else {
        toast.error(result.msg || 'Error en el registro')
      }
    } catch (error) {
      toast.error('Error de conexión con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
     <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/images/registro-estudiante.jpeg')" }}
    >
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-40 backdrop-blur-md p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Registro de Estudiante
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                {...register('nombre', { required: 'Nombre es requerido' })}
                className="appearance-none rounded w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.nombre && <p className="text-red-600 text-sm">{errors.nombre.message}</p>}
            </div>

            <div>
              <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
                Apellido
              </label>
              <input
                id="apellido"
                type="text"
                {...register('apellido', { required: 'Apellido es requerido' })}
                className="appearance-none rounded w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.apellido && <p className="text-red-600 text-sm">{errors.apellido.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Correo es requerido',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Correo inválido'
                  }
                })}
                className="appearance-none rounded w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                {...register('password', { required: 'Contraseña es requerida' })}
                className="appearance-none rounded w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', { required: 'Debes confirmar la contraseña' })}
                className="appearance-none rounded w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <Link to="/login-estudiante" className="font-medium text-blue-600 hover:text-blue-500">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterEstudiante
