import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../layout/AuthContext.jsx";
import { RiPlayListAddLine } from "react-icons/ri";
import { MdDeleteForever, MdPublishedWithChanges } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const RedesC_Panel_Admin = () => {
  const { token } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [redes, setRedes] = useState([]);
  const [modal, setModal] = useState({ type: null, visible: false, red: null });

  const fetchRedes = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/redes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Error al obtener redes");
      setRedes(data);
    } catch (error) {
      console.error("Error al obtener redes:", error);
      toast.error("Error al cargar redes comunitarias");
    }
  };

  useEffect(() => {
    fetchRedes();
  }, []);

  // Crear red comunitaria
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !descripcion) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }
    
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/crear-red`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ nombre, descripcion })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al crear red");
      
      toast.success("Red creada correctamente");
      setNombre("");
      setDescripcion("");
      fetchRedes();
    } catch (error) {
      console.error("Error al crear red:", error);
      toast.error(error.message || "Error al crear red");
    }
  };

  // Actualizar red comunitaria
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/actualizar-red/${modal.red._id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: modal.red.nombre,
          descripcion: modal.red.descripcion
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al actualizar red");
      
      toast.success("Red actualizada correctamente");
      setModal({ type: null, visible: false, red: null });
      fetchRedes();
    } catch (error) {
      console.error("Error al actualizar red:", error);
      toast.error(error.message || "Error al actualizar red");
    }
  };

  // Eliminar red comunitaria
  const handleDeleteConfirm = async () => {
    try {
      const res = await fetch(`https://backendv2-as6n.onrender.com/api/eliminar-red/${modal.red._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al eliminar red");
      
      toast.success("Red eliminada correctamente");
      setModal({ type: null, visible: false, red: null });
      fetchRedes();
    } catch (error) {
      console.error("Error al eliminar red:", error);
      toast.error(error.message || "Error al eliminar red");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <ToastContainer />

      {/* Formulario Crear Red */}
      <form onSubmit={handleSubmit}>
        <fieldset className="bg-slate-300 p-6 rounded-lg shadow-lg mb-6">
          <legend className="text-xl font-bold text-gray-300 bg-gray-700 px-4 py-1 rounded-md">
            Crear nueva red comunitaria
          </legend>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded-md"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full mt-4 bg-white border border-slate-300 text-gray-700 px-4 py-2 rounded shadow-md 
                    hover:bg-gray-700 hover:scale-102 duration-200 hover:text-white transition-all"
          >
            <RiPlayListAddLine className="mr-2" />
            CREAR RED COMUNITARIA
          </button>
        </fieldset>
      </form>

      {/* Lista de Redes Comunitarias */}
{/* Tabla de Redes Comunitarias */}
<div className="bg-slate-300 p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold mb-4">Redes Comunitarias</h2>
  
  {redes.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-700">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="py-2 px-4 border border-gray-600 text-center">ID</th>
            <th className="py-2 px-4 border border-gray-600 text-center">Nombre</th>
            <th className="py-2 px-4 border border-gray-600 text-center">Descripcion</th>
            <th className="py-2 px-4 border border-gray-600 text-center">Fecha de creacion</th>
            
            <th className="py-2 px-4 border border-gray-600 text-center">Acciones</th>

          </tr>
        </thead>
        <tbody>
          {redes.map(red => (
            <tr key={red._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border border-gray-600 text-center">{red._id.substring(0, 8)}...</td>
              <td className="py-2 px-4 border border-gray-600 text-center">{red.nombre}</td>
              <td className="py-2 px-4 border border-gray-600 text-center">{red.descripcion}</td>
              <td className="py-2 px-4 border border-gray-600 text-center">{red.createdAt}</td>
              {/*<td className="py-2 px-4 border border-gray-600 text-center">{red.cantidadMiembros}</td>*/}
              <td className="py-2 px-4 border border-gray-600">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => setModal({ type: "update", visible: true, red })}
                    title="Actualizar"
                    className="p-1 text-blue-600 hover:text-blue-800"
                  >
                    <MdPublishedWithChanges className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setModal({ type: "delete", visible: true, red })}
                    title="Eliminar"
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <MdDeleteForever className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-center py-4">No hay redes comunitarias registradas</p>
  )}
</div>

      {/* Modal Actualizar Red */}
      {modal.visible && modal.type === "update" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button
              onClick={() => setModal({ type: null, visible: false, red: null })}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
            >
              &times;
            </button>

            <h3 className="text-lg font-bold mb-4 text-center">Actualizar Red Comunitaria</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  value={modal.red?.nombre || ""}
                  onChange={(e) => setModal(prev => ({
                    ...prev,
                    red: { ...prev.red, nombre: e.target.value }
                  }))}
                  className="w-full p-2 border border-gray-700 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <input
                  type="text"
                  value={modal.red?.descripcion || ""}
                  onChange={(e) => setModal(prev => ({
                    ...prev,
                    red: { ...prev.red, descripcion: e.target.value }
                  }))}
                  className="w-full p-2 border border-gray-700 rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded hover:bg-slate-300 hover:text-gray-700 border transition-colors"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Eliminar Red */}
      {modal.visible && modal.type === "delete" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <button
              onClick={() => setModal({ type: null, visible: false, red: null })}
              className="text-xl font-bold absolute top-2 right-4"
            >
              ×
            </button>
            <p className="mb-4">
              ¿Eliminar la red <strong>"{modal.red?.nombre}"</strong>?
              <br />
              Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setModal({ type: null, visible: false, red: null })}
                className="px-4 py-2 border border-gray-700 rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default RedesC_Panel_Admin;