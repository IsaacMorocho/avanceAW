import { useState } from 'react';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardPassword = () => {
  const [showActual, setShowActual] = useState(false);
  const [showNueva, setShowNueva] = useState(false);
  const [passwordActual, setPasswordActual] = useState("");
  const [passwordNuevo, setPasswordNuevo] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleActualizarPassword = async () => {
    if (!passwordActual.trim() || !passwordNuevo.trim()) {
      toast.error("Por favor, llena ambos campos.");
      return;
    }

    try {
      setCargando(true);
      const token = localStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/superadmin/actualizar-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          passwordactual: passwordActual,
          passwordnuevo: passwordNuevo
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "No se pudo actualizar la contraseña.");
      }

      toast.success("Contraseña actualizada correctamente.");
      setPasswordActual("");
      setPasswordNuevo("");
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      toast.error(error.message || "Error en la actualización.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='mt-5'>
        <h1 className='font-black text-2xl text-gray-500 mt-16'>Actualizar contraseña</h1>
        <hr className='my-4 border-t-2 border-gray-400' />
      </div>

      <form>
        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold">Contraseña actual</label>
          <div className="relative">
            <input
              type={showActual ? "text" : "password"}
              placeholder="Ingresa tu contraseña actual"
              value={passwordActual}
              onChange={(e) => setPasswordActual(e.target.value)}
              className="shadow-md block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowActual(!showActual)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
            >
              {showActual ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold">Nueva contraseña</label>
          <div className="relative">
            <input
              type={showNueva ? "text" : "password"}
              placeholder="Ingresa la nueva contraseña"
              value={passwordNuevo}
              onChange={(e) => setPasswordNuevo(e.target.value)}
              className="shadow-md block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowNueva(!showNueva)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
            >
              {showNueva ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleActualizarPassword}
            disabled={cargando}
            className="bg-white border border-gray-400 text-gray-700 px-4 py-2 rounded shadow-md 
              hover:bg-gray-700 hover:scale-105 duration-200 hover:text-white transition-all disabled:opacity-60"
          >
            {cargando ? "Actualizando..." : "ACTUALIZAR CONTRASEÑA"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CardPassword;
