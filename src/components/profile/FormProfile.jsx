import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const FormularioPerfil = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [celular, setCelular] = useState("");

  const handleActualizar = async ()=> {
    const payload = {};
    if (nombre.trim() !== "") payload.nombre = nombre;
    if (apellido.trim() !== "") payload.apellido = apellido;
    if (celular.trim() !== "") payload.celular = celular;

    if (Object.keys(payload).length === 0) {
      toast.error("Debe llenar al menos un campo para actualizar.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/actualizar-superadmin`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Error al actualizar");
      }

      toast.success("Información actualizada correctamente.");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error al actualizar los datos.");
    }
  };

  return (
    <form>
      <ToastContainer />
      <div className="flex flex-col md:flex-row md:gap-5 mb-5 mt-8">
        <div className="md:w-1/2 mb-5 md:mb-0">
          <label className="mb-2 block text-sm font-semibold">Nombre</label>
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            className="shadow-md block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="md:w-1/2">
          <label className="mb-2 block text-sm font-semibold">Apellido</label>
          <input
            type="text"
            placeholder="Ingresa tu apellido"
            className="shadow-md block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold">Celular</label>
        <input
          type="text"
          placeholder="Ingresa su celular"
          className="shadow-md block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
        />
      </div>



      <div className="text-center">
        <button
          type="button"
          onClick={handleActualizar}
          className="bg-white border border-gray-400 text-gray-700 px-4 py-2 rounded shadow-md 
          hover:bg-gray-700 hover:scale-105 duration-200 hover:text-white transition-all"
        >
          ACTUALIZAR INFORMACIÓN
        </button>
      </div>
    </form>
  );
};

export default FormularioPerfil;
