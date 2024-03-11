import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";

function CrearOrdenCompraJ() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nombreLibro = queryParams.get("nombreLibro");
  const ownerName = queryParams.get("ownerName");
  const bookId = queryParams.get("bookId");
  const ownerId = queryParams.get("owner_id");

  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [lugar, setLugar] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [showConfirmGuardar, setShowConfirmGuardar] = useState(false); // Nuevo estado para controlar la visualización del confirm al guardar
  const [showConfirmCancelar, setShowConfirmCancelar] = useState(false); // Nuevo estado para controlar la visualización del confirm al cancelar

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        setToken(token);
        const decodedToken = jwtDecode(token, "SECRET");
        setUserData(decodedToken);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleGuardar = () => {
    // Mostrar confirmación antes de guardar
    setShowConfirmGuardar(true);
  };

  const handleGuardarConfirm = async () => {
    // Verificar si los campos obligatorios están vacíos
    if (!lugar || !fecha || !hora || !monto || !descripcion) {
      setError("Por favor, completa todos los campos.");
      return;
    }
  
    try {
      const nuevaTransaccion = {
        id_libro: bookId,
        id_comprador: userData.id,
        id_vendedor: ownerId,
        lugar,
        fecha,
        hora,
        monto,
        descripcion,
        confirmacion_comprador: false,
        confirmacion_vendedor: false,
        vigente: true
      };
      // Enviar los datos al backend para guardar la transacción
      await fetch("http://localhost:3001/crear-transaccion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaTransaccion)
      });
  
      // Opcional: mostrar un mensaje de éxito o redirigir a otra página
      setMensaje("Transacción guardada correctamente");
      window.location = 'http://localhost:3000/Header_logged';
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      setError("Error al guardar la transacción. Por favor, intenta nuevamente más tarde.");
    } finally {
      // Ocultar el confirm después de guardar
      setShowConfirmGuardar(false);
    }
  };
  
  

  const handleGuardarCancel = () => {
    setShowConfirmGuardar(false); // Ocultar el confirm al cancelar el guardado
  };

  const handleCancelar = () => {
    // Mostrar confirmación antes de cancelar
    setShowConfirmCancelar(true);
  };

  const handleCancelarConfirm = () => {
    window.location.href = "http://localhost:3000/Comprar";
    // Ocultar confirmación después de cancelar
    setShowConfirmCancelar(false);
  };

  const handleCancelarCancel = () => {
    setShowConfirmCancelar(false); // Ocultar el confirm al cancelar la cancelación (?)
  };

  return (
    <div className="container mx-auto py-10">
      <p>
        <strong>Username:</strong> {userData?.username}
      </p>
      <p>
        <strong>Id:</strong> {userData?.id}
      </p>
      <p>
        <strong>Nombre del libro:</strong> {nombreLibro}
      </p>
      <p>
        <strong>Dueño:</strong> {ownerName}
      </p>
      <h1 className="text-4xl font-bold text-center mb-6">AGREGAR EVENTO</h1>
      <div>
        {mensaje && <p className="text-green-600">{mensaje}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="text"
          placeholder="Lugar"
          value={lugar}
          onChange={(e) => setLugar(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
        />
        <input
          type="date"
          placeholder="Fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
        />
        <input
          type="time"
          placeholder="Hora"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
        />
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full h-40" 
        />
        <button 
          onClick={handleGuardar} 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 mr-2"
        >
          Guardar
        </button>
        <button 
          onClick={handleCancelar} 
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
        >
          Cancelar
        </button>
      </div>
      {showConfirmGuardar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p>¿Estás seguro de que quieres guardar este evento?</p>
            <div className="flex justify-center mt-4">
              <button onClick={handleGuardarConfirm} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">Sí, Guardar</button>
              <button onClick={handleGuardarCancel} className="text-black bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2">Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {showConfirmCancelar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p>¿Estás seguro de cancelar?</p>
            <div className="flex justify-center mt-4">
              <button onClick={handleCancelarConfirm} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">Sí, Cancelar</button>
              <button onClick={handleCancelarCancel} className="text-black bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2">No, Volver</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrearOrdenCompraJ;
