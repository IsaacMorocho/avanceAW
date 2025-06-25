import { Link } from 'react-router'
import useFetch from '../hooks/useFetch'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { motion } from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css'

export const Forgot = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { fetchDataBackend } = useFetch()

  const sendMail = async (data) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(result.msg || 'Correo enviado exitosamente')
      } else {
        toast.error(result.msg || 'Hubo un error al enviar el correo')
      }
    } catch (error) {
      toast.error('Error de conexión con el servidor')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row h-screen"
    >
      <div className="w-full sm:w-1/2 h-1/3 sm:h-screen bg-[url('/images/forgot_pass.jpg')] 
        bg-no-repeat bg-cover bg-center sm:block hidden" />

      <ToastContainer />

      <div className="w-full sm:w-1/2 h-screen bg-white flex justify-center items-center">
        <div className="md:w-4/5 sm:w-full">
          <h1 className="text-3xl font-serif mb-2 text-center uppercase text-gray-700">
            RECUPERAR CUENTA
          </h1>

          <form onSubmit={handleSubmit(sendMail)}>
            <div className="mb-1">
              <label className="mb-2 block text-sm font-semibold my-11">
                Ingrese el correo electrónico asociado a su cuenta:
              </label>
              <input
                type="email"
                placeholder="Ingresa un correo electrónico válido"
                className="block w-full rounded-md border border-gray-500 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-100 py-1 px-1.5 text-gray-500"
                {...register("email", { required: "El correo electrónico es obligatorio" })}
              />
              {errors.email && <p className="text-red-800">{errors.email.message}</p>}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="my-7 bg-gray-700 border border-gray text-white px-4 py-2 rounded shadow-md 
                hover:bg-white hover:scale-105 duration-200 hover:text-gray-700 transition-all"
              >
                ENVIAR CONFIRMACIÓN
              </button>
            </div>
          </form>

          <div className="mt-5 text-xs border-b-2" />

          <div className="tracking-wider flex justify-between items-center mt-2 text-sm text-gray-700">
            <Link to="/login" className="underline hover:text-black tracking-widest">Regresar</Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
