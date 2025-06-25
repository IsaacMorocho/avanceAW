import { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import useFetch from '../hooks/useFetch'
import { AuthContext } from '../layout/AuthContext'

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { fetchDataBackend } = useFetch();
    const { login } = useContext(AuthContext);

    const loginUser = async (data) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/login`;
        const response = await fetchDataBackend(url, data, 'POST');

        if (response?.token) {
            const user = {
                id: response._id,
                nombre: response.nombre,
                apellido: response.apellido,
                celular: response.celular,
                email: response.email,
                rol: response.rol,
            };

            login(response.token, user); // Aquí es clave
            navigate('/dashboard');
        } else {
            toast.error("Credenciales inválidas o error al iniciar sesión");
        }
    };

    return (
        <div className="relative h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/login_1.jpeg')" }}>
            <ToastContainer />
            <div className="leading-normal absolute inset-0 flex justify-center items-center">
                <div className="bg-none bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-120 space-y-8 ">
                    <h1 className="font-lato font-bold text-2xl text-center text-white tracking-widest">LOGIN ADMINISTRADOR</h1>
                    <p className="text-white text-sm font-semibold text-center">Por favor ingresa tus datos</p>

                    <form onSubmit={handleSubmit(loginUser)} className="space-y-5">
                        {/* Correo */}
                        <div>
                            <label className="block mb-1 text-white text-base ">Correo electrónico</label>
                            <input
                                type="email"
                                placeholder="Ingresa tu correo"
                                className="block w-full rounded-xl border border-gray-300 focus:border-black-700 focus:outline-none focus:ring-1 focus:ring-black-700 py-2 px-3 text-gray-900 text-sm"
                                {...register("email", { required: "El correo es obligatorio" })}
                            />
                            {errors.email && <p className="text-red-300 text-sm">{errors.email.message}</p>}
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label className="block mb-1 text-white text-base ">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="********************"
                                    className="block w-full rounded-xl border border-gray-300 focus:border-black-700 focus:outline-none focus:ring-1 focus:ring-black-700 py-2 px-3 text-gray-900 pr-10"
                                    {...register("password", { required: "La contraseña es obligatoria" })}
                                />
                                {errors.password && <p className="text-red-300 text-sm">{errors.password.message}</p>}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" />
                                    ) : (
                                        <svg className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Botón de iniciar sesión */}
                        <button className="tracking-widest py-3 w-full text-center rounded-xl bg-gray-800 text-white 
                        hover:bg-white transition hover:scale-105 duration-300 hover:text-black">
                            Iniciar sesión
                        </button>
                    </form>

                    {/* Enlaces extras */}
                    <div className="text-center mt-4 text-sm">
                        <Link to="/forgot/id" className="text-blue-200 hover:text-white underline">Olvidé mi contraseña</Link>
                    </div>
                    <div className="tracking-wider flex justify-between items-center mt-2 text-sm text-gray-200">
                        <Link to="/" className="underline hover:text-white">Regresar</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
