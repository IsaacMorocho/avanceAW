import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import useFetch from '../hooks/useFetch'
import { AuthContext } from '../layout/AuthContext'

const LoginEstudiante = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { fetchDataBackend } = useFetch();
    const { login } = useContext(AuthContext);

    const loginEstudiante = async (data) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/login-estudiante`;
        const response = await fetchDataBackend(url, data, 'POST');

        if (response?.token) {
login(response.token, {
  id: response._id,
  nombre: response.nombre,
  apellido: response.apellido,
  email: response.email,
  rol: response.rol,
  redComunitaria: response.redComunitaria,
  celular: response.celular
});
navigate('/dashboard-estudiante');
} else {
            let errorMessage = "Error al iniciar sesión";
            if (response?.msg) {
                errorMessage = response.msg;
                if (response.msg.includes("verificar tu cuenta")) {
                    errorMessage += ". Por favor revisa tu correo electrónico.";
                }
            }
            toast.error(errorMessage);
        }
    };

    return (
        <div className="relative h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('images/login-estudiante.jpeg')" }}>
            <ToastContainer />
            <div className="absolute inset-0  bg-opacity-50 flex justify-center items-center">
                <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md space-y-6">
                    <div className="text-center">
                        <h1 className="font-bold text-2xl text-gray-800 tracking-wider">LOGIN ESTUDIANTE</h1>
                        <p className="text-gray-600 text-sm mt-2">Ingresa tus credenciales para acceder</p>
                    </div>

                    <form onSubmit={handleSubmit(loginEstudiante)} className="space-y-4">
                        {/* Correo electrónico */}
                        <div>
                            <label className="block mb-1 text-gray-700 text-sm font-medium">Correo electrónico</label>
                            <input
                                type="email"
                                placeholder="correo@ejemplo.com"
                                className="block w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 py-2 px-3 text-gray-700 text-sm"
                                {...register("email", { 
                                    required: "El correo es obligatorio",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Correo electrónico no válido"
                                    }
                                })}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label className="block mb-1 text-gray-700 text-sm font-medium">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="block w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 py-2 px-3 text-gray-700 text-sm pr-10"
                                    {...register("password", { 
                                        required: "La contraseña es obligatoria",
                                        minLength: {
                                            value: 2,
                                            message: "La contraseña debe tener al menos 6 caracteres"
                                        }
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Recordar contraseña */}
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link to="/estudiante/recuperar/id" className="font-medium text-blue-600 hover:text-blue-500">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                        </div>

                        {/* Botón de iniciar sesión */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                            >
                                Iniciar sesión
                            </button>
                        </div>
                    </form>

                    {/* Enlace a registro */}
                    <div className="text-center text-sm text-gray-600">
                        <p>
                            ¿No tienes una cuenta?{' '}
                            <Link to="/register-estudiante" className="font-medium text-blue-600 hover:text-blue-500">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>

                    {/* Enlace para volver */}
                    <div className="text-center">
                        <Link to="/" className="text-sm text-gray-600 hover:text-gray-800">
                            ← Volver al inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginEstudiante;