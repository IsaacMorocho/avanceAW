import { useState, useEffect } from "react";
import { MdDeleteForever, MdPublishedWithChanges } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const UserCRUD = () => {
  const initialInfo = { nombre: "", apellido: "", celular: "", correo: "", redComunitaria: "", contraseña: "" };
  const [userInfo, setUserInfo] = useState(initialInfo);
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState({ type: null, visible: false, user: null });

  const token = localStorage.getItem("token");

  useEffect(() => { fetchUsers(); }, []);
  //Ver estudiantes
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/estudiantes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Error al cargar estudiantes");
      setUsers(await res.json());
    } catch (e) { console.error(e); toast.error(e.message); }
  };

  //Crear estudiante
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, apellido, correo, contraseña } = userInfo;
    if (!nombre || !apellido || !correo || !contraseña) {
      toast.error("Completa los campos obligatorios.");
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/crear-estudiantes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: userInfo.nombre,
          apellido: userInfo.apellido,
          email: userInfo.correo,
          password: userInfo.contraseña,
          celular: userInfo.celular,
          redComunitaria: userInfo.redComunitaria
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
      toast.success("Estudiante creado correctamente.");
      setUserInfo(initialInfo);
      fetchUsers();
    } catch (e) { toast.error(e.message); }
  };

  //Actualizar estudiante
 const handleUpdate = async (e) => {
  e.preventDefault();
  const id = modal.user._id; // Correcto
  const payload = {
    nombre: modal.user.nombre,
    apellido: modal.user.apellido,
    celular: modal.user.celular,
    email: modal.user.email,
    redComunitaria: modal.user.redComunitaria,
    password: modal.user.password, // Solo si deseas enviar la contraseña también
  };

  try {
    const response = await axios.put(
      `https://backendv2-as6n.onrender.com/api/actualizar-estudiantes/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Estudiante actualizado correctamente");

    // Actualiza localmente
    const newUsers = users.map((u) =>
      u._id === id ? { ...u, ...payload } : u
    );
    setUsers(newUsers);
    setModal({ visible: false, type: null, user: null });

  } catch (err) {
    console.error("Error al actualizar:", err);
    toast.error("Error al actualizar estudiante");
  }
};


  //Eliminar estudiante
  const handleDeleteConfirm = async () => {
    const { _id } = modal.user;
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/eliminar-estudiantes/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) return toast.error(data.msg);
    toast.success("Estudiante eliminado.");
    setModal({ type: null, visible: false, user: null });
    fetchUsers();
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <ToastContainer />

      {/*Formulario Crear */}
      <form onSubmit={handleSubmit}>
        <fieldset className="bg-slate-300 p-7 rounded-lg shadow-md mb-6">
          <legend className="text-xl font-bold text-gray-300 bg-gray-700 px-4 py-1 rounded-md">
            Crear nuevo estudiante
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {["nombre","apellido","correo","contraseña","celular","redComunitaria"].map((k) => (
              <div key={k}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {k.charAt(0).toUpperCase()+k.slice(1)}
                </label>
                <input
                  type={k === "correo" ? "email" : k === "contraseña" ? "password" : "text"}
                  name={k}
                  value={userInfo[k]}
                  onChange={(e) => setUserInfo(prev => ({...prev, [k]: e.target.value}))}
                  className="w-full p-2 border border-gray-700 rounded-md"
                  required={["nombre","apellido","correo","contraseña"].includes(k)}
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="flex items-center justify-center bg-white border border-slate-300 text-gray-700 px-4 py-2 rounded shadow-md hover:bg-gray-700 hover:scale-105 duration-200 hover:text-white transition-all">
            <FiUserPlus className="mr-2" />
            CREAR ESTUDIANTE
          </button>
        </fieldset>
      </form>

      {/* 📋 Tabla Estudiantes */}
      <div className="bg-slate-300 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Lista de Estudiantes</h2>
        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-700 text-white">
                  {["ID","Nombre","Apellido","Celular","Correo","Red Comunitaria","Acciones"].map(th => (
                    <th key={th} className="py-2 px-4 border border-gray-600">{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border border-gray-600 text-center">{u._id}</td>
                    <td className="py-2 px-4 border border-gray-600 text-center">{u.nombre}</td>
                    <td className="py-2 px-4 border border-gray-600 text-center">{u.apellido}</td>
                    <td className="py-2 px-4 border border-gray-600 text-center">{u.celular || "--"}</td>
                    <td className="py-2 px-4 border border-gray-600 text-center">{u.email}</td>
                    <td className="py-2 px-4 border border-gray-600 text-center">{u.redComunitaria || "--"}</td>
                    <td className="py-2 px-4 border border-gray-600">
                      <div className="flex justify-center space-x-3">
                        <button
                          onClick={() => setModal({ type: "update", visible: true, user: {...u} })}
                          title="Actualizar"
                          className="p-1 text-blue-600 hover:text-blue-800"
                        ><MdPublishedWithChanges className="h-5 w-5" /></button>
                        <button
                          onClick={() => setModal({ type: "delete", visible: true, user: u })}
                          title="Eliminar"
                          className="p-1 text-red-600 hover:text-red-800"
                        ><MdDeleteForever className="h-5 w-5" /></button>
                      </div>
                    </td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className="text-center py-4">No hay estudiantes registrados</p>}
      </div>

      {/*Modal Actualizar */}
      {modal.visible && modal.type === "update" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-7 w-102 relative">
            {/* Botón X de salir */}
            <button
              onClick={() => setModal({ type: null, visible: false, user: null })}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold">
              &times;
            </button>

            <h3 className="font-lato text-lg font-bold mb-4 text-center">Actualizar Estudiante</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              {["nombre", "apellido", "celular", "email", "redComunitaria"].map(k => (
                <div key={k}>
                  <label className="block text-sm font-medium mb-1">
                    {k.charAt(0).toUpperCase() + k.slice(1)}
                  </label>
                  <input
                    type={k === "email" ? "email" : "text"}
                    value={modal.user[k] || ""}
                    onChange={e => setModal(prev => ({
                      ...prev, user: { ...prev.user, [k]: e.target.value }
                    }))}
                    className="w-full border border-gray-500 rounded px-2 py-1"
                  />
                </div>
              ))}
              <button type="submit" className="w-full bg-gray-700 text-white px-4 py-2 rounded hover:scale-102 duration-200 hover:bg-slate-300 hover:text-gray-700 border">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}


      {/*Modal Eliminar */}
      {modal.visible && modal.type === "delete" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <button onClick={() => setModal({ type: null, visible: false, user: null })} className="text-xl font-bold absolute top-2 right-4">×</button>
            <p>¿Eliminar a <strong>{modal.user.nombre}</strong> (ID: {modal.user._id})?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={() => setModal({ type: null, visible: false, user: null })} className="px-4 py-2 border rounded">Cancelar</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-600 text-white rounded">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCRUD;
