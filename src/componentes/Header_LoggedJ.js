import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importar la función para decodificar el token

function Header_LoggedJ() {
  const token = localStorage.getItem('accessToken');
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [nombre, setNombre] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (token) {
      // Realizar una solicitud al backend para obtener las transacciones pendientes
      fetchPendingTransactions();
      
      const decodedToken = jwtDecode(token);
      setNombre(decodedToken.username);
      setUserId(decodedToken.id);
    }
  }, [token]);

  const fetchPendingTransactions = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/pending-transactions', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener las transacciones pendientes');
      }

      const data = await response.json();
      setPendingTransactions(data.transactions);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16 lg:justify-between">
          <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
            <h2 className="text-3xl font-bold sm:text-4xl">Bienvenido a Interlib, {nombre}</h2> {/* Mostrar el nombre de usuario */}
            <p className="mt-4 text-gray-600">
              Somos un pequeño proyecto orientado a facilitar la comunicación entre estudiantes con el fin de que puedan Vender, Comprar o Intercambiar libros que sean del género de su interés.
            </p>
            <p className="mt-4 text-gray-600">
              ¡Empieza tu búsqueda!
            </p>
          </div>
          {/* Nuevo div para el cuadro de solicitudes pendientes */}
          <div className="hidden lg:block">
            <div className="bg-gray-100 p-4 rounded-xl shadow-md">
              <h2 className="text-lg font-bold mb-2">Solicitudes Pendientes</h2>
              <hr className="border-b-2 border-black mb-4"/> {/* Línea separadora */}
              {pendingTransactions.length > 0 ? (
                pendingTransactions.map((transaction, index) => (
                  <div key={transaction.transactionId} className={`mb-4 ${index !== pendingTransactions.length - 1 ? 'border-b-2 border-black' : ''}`}>
                    <p className="text-gray-600">Id de la transacción: {transaction.transactionId}</p>
                    <p className="text-gray-600">Vendedor: {transaction.vendedor}</p>
                    <p className="text-gray-600">Comprador: {transaction.comprador}</p>
                    <p className="text-gray-600">Libro: {transaction.libro}</p>
                    <p className="text-gray-600">Lugar: {transaction.lugar}</p>
                    <p className="text-gray-600">Fecha: {transaction.fecha.substring(0, 10)}</p> {/* Mostrar solo la fecha */}
                    <p className="text-gray-600">Hora: {transaction.hora}</p>
                    <p className="text-gray-600">Descripción: {transaction.descripcion}</p>
                    {/* Agrega más información de la transacción que desees mostrar */}
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No hay solicitudes pendientes</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header_LoggedJ;
