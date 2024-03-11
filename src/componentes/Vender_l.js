import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AgregarLibro from "./AgregarLibroJ";

function Vender_l() {
  const [userData, setUserData] = useState(null);
  const [books, setBooks] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para indicar si se está cargando
  const [showConfirm, setShowConfirm] = useState(false); // Estado para mostrar el mensaje de confirmación
  const [bookToDelete, setBookToDelete] = useState(null); // Estado para almacenar el libro que se eliminará

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

  const fetchBooks = (token) => {
    const AuthStr = 'Bearer ' + token;
    let URL = `http://localhost:3001/api/books/${token}`;
    fetch(URL, {
      method: 'GET',
      headers: {
        'Authorization': AuthStr
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setBooks(data.books);
      setLoading(false); // Cambia el estado de carga a falso cuando se obtienen los libros
      console.log(data.books);
    })
    .catch(error => {
      console.error('Error al obtener la lista de libros:', error);
      setLoading(false); // Cambia el estado de carga a falso si hay un error
    });
  };
  
  useEffect(() => {
    if (token) {
      fetchBooks(token);
    }
  }, [token]);

  const handleAdd = () => {
    // Redireccionar al usuario a la página de inicio de sesión
    window.location = "/Vender/add"; // Ajusta la ruta según la ruta de tu página de inicio de sesión
  };

  const handleDeleteConfirm = (book) => {
    setBookToDelete(book);
    setShowConfirm(true);
  };

  const handleDeleteCancel = () => {
    setBookToDelete(null);
    setShowConfirm(false);
  };

  const handleDelete = (bookId) => {
    fetch(`http://localhost:3001/api/books/${bookId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Libro eliminado:', data);
      window.location = "http://localhost:3000/Vender"; 

      // Implementa la lógica para actualizar la lista de libros en el cliente
    })
    .catch(error => {
      console.error('Error al eliminar el libro:', error);
      // Implementa la lógica para manejar errores
    });
  };
  

  return (
    <div className="container mx-auto py-10">
    <h2 className="text-2xl font-semibold mb-4">Perfil del Usuario</h2>
    <div>
      <p>
        <strong>Username:</strong> {userData?.username}
      </p>
      <p>
        <strong>Id:</strong> {userData?.id}
      </p>
      <h1 className="text-4xl font-bold text-center mb-6">MIS LIBROS</h1>
      {loading ? (
        <p>Cargando libros...</p>
      ) : (
        <>
          {books.length === 0 ? (
            <p>Usted no tiene libros.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {books.map((book) => (
                <div key={book.id} className="border border-gray-300 rounded-md p-4">
                  <p className="text-xl font-bold">{book.titulo}</p>
                  <p className="text-gray-600">Autor: {book.autor}</p>
                  <p className="text-gray-600">Género: {book.genero}</p>
                  <p className="text-gray-600">Sinopsis: {book.sinopsis}</p>
                  <p className="text-gray-600">Dueño: {book.owner}</p>
                  <div className="flex justify-center mt-4">
                    <button onClick={() => handleDeleteConfirm(book)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2">Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <div className="flex justify-center mt-6">
        <button onClick={handleAdd} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar Libro</button>
      </div>
    </div>
    {showConfirm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-md shadow-lg">
          <p>¿Estás seguro de que quieres eliminar este libro?</p>
          <div className="flex justify-center mt-4">
            <button onClick={() => handleDelete(bookToDelete.id)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">Sí, Eliminar</button>
            <button onClick={handleDeleteCancel} className="text-black bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2">Cancelar</button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
}

export default Vender_l;
