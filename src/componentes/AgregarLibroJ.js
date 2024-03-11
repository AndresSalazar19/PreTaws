import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function AgregarLibro() {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [showConfirmGuardar, setShowConfirmGuardar] = useState(false); // Nuevo estado para controlar la visualización del confirm al guardar

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

  const handleGuardar = async () => {
    if (!titulo || !autor || !genero || !sinopsis) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // Mostrar confirmación antes de guardar
    setShowConfirmGuardar(true);
  };

  const handleGuardarConfirm = async () => {
    const data = {
      titulo,
      autor,
      genero,
      sinopsis,
      owner_id: userData.id,
      username: userData.username
    };

    try {
      const response = await fetch("http://localhost:3001/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setMensaje("Se ha enviado con éxito.");
        setError("");
        window.location = "http://localhost:3000/Vender";
      } else {
        setError("Error al agregar el libro.");
        setMensaje("");
      }
    } catch (error) {
      setError("Error de red.");
      setMensaje("");
    }

    // Ocultar confirmación después de guardar
    setShowConfirmGuardar(false);
  };

  const handleGuardarCancel = () => {
    setShowConfirmGuardar(false); // Ocultar el confirm al cancelar el guardado
  };

  const handleCancelar = () => {
    setShowConfirmGuardar(true); // Mostrar el confirm al hacer clic en Cancelar
  };

  return (
    <div className="container mx-auto py-10">
      <p>
        <strong>Username:</strong> {userData?.username}
      </p>
      <p>
        <strong>Id:</strong> {userData?.id}
      </p>
      <h1 className="text-4xl font-bold text-center mb-6">AGREGAR LIBRO</h1>
      <div>
        {mensaje && <p className="text-green-600">{mensaje}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
        />
        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
        />
        <input
          type="text"
          placeholder="Género"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
        />
        <textarea
          placeholder="Sinopsis"
          value={sinopsis}
          onChange={(e) => setSinopsis(e.target.value)}
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
      {showConfirmGuardar && ( // Mostrar el confirm al guardar si showConfirmGuardar es true
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p>¿Estás seguro de que quieres guardar este libro?</p>
            <div className="flex justify-center mt-4">
              <button onClick={handleGuardarConfirm} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">Sí, Guardar</button>
              <button onClick={handleGuardarCancel} className="text-black bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AgregarLibro;
