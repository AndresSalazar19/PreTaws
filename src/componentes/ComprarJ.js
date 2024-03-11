import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AgregarLibro from "./AgregarLibroJ";

function ComprarJ() {
  const [userData, setUserData] = useState(null);
  const [books, setBooks] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para indicar si se está cargando

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

  useEffect(() => {
    if (token) {
      fetchBooks(); // Llamar a fetchBooks cuando se actualice el token
    }
  }, [token]);

  const fetchBooks = () => {
    let URL = `http://localhost:3001/api/show`;
    fetch(URL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Filtrar los libros cuyo ownerId sea diferente al userId
        const filteredBooks = data.books.filter(book => book.owner_id !== userData.id);
        setBooks(filteredBooks);
        setLoading(false); // Cambia el estado de carga a falso cuando se obtienen los libros
        console.log(filteredBooks);
        console.log(data.books);
  
    })
    .catch(error => {
        console.error('Error al obtener la lista de libros:', error);
        setLoading(false); // Cambia el estado de carga a falso si hay un error
    });
};



 const handleBuy = (bookId) => {
  // Hacer una solicitud al backend para actualizar el owner_id del libro
  const URL = `http://localhost:3001/api/books/${bookId}/buy`;
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId: userData.id })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al comprar el libro');
    }
    // Si la solicitud es exitosa, volver a cargar la lista de libros
    fetchBooks();
  })
  .catch(error => {
    console.error('Error al comprar el libro:', error);
  });
};

const IrComprar = (bookId, nombreLibro, ownerName, owner_id) => {
  window.location = `/CrearOrdenCompra?nombreLibro=${encodeURIComponent(nombreLibro)}&ownerName=${encodeURIComponent(ownerName)}&bookId=${bookId}&owner_id=${owner_id}`;
}


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
        <h1 className="text-4xl font-bold text-center mb-6">LIBROS DISPONIBLES</h1>
        {loading ? (
          <p>Cargando libros...</p>
        ) : (
          <>
            {books.length === 0 ? (
              <p>No hay libros dispoibles.</p>
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
                    <button onClick={() => IrComprar(book.id, book.titulo, book.owner,book.owner_id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-text-white font-semibold leading-none tracking-tighter bg-blue-500 border border-blue-500 py-2.5 px-5 rounded-md hover:bg-blue-700 hover:border-blue-700 transition duration-500 ease-in-out focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2">Comprar</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        <div className="flex justify-center mt-6">
        </div>
      </div>
    </div>
  );
}

export default ComprarJ;
