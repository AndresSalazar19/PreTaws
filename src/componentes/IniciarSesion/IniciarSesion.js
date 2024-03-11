import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function IniciarSesion() {
  // Estado para almacenar el correo electrónico y la contraseña ingresados por el usuario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    try {
      // Envía una solicitud POST al servidor con las credenciales del usuario
      const response = await axios.post('http://localhost:3001/login', { email, password });

      // Verifica si la respuesta del servidor indica un inicio de sesión exitoso
      if (response.data.success) {
        // Muestra una alerta indicando que el inicio de sesión fue exitoso
        alert('Inicio de sesión exitoso');

          // Obtener el token de la respuesta del servidor
  const accessToken = response.data.accessToken;

  // Guardar el token en el almacenamiento local del navegador
  localStorage.setItem('accessToken', accessToken);
        // Redirecciona a la página de inicio o a otra página deseada después del inicio de sesión
        window.location = "Header_logged"; // Redirige a la página de encabezado de sesión iniciada

      } else {
        // Si la respuesta del servidor indica un inicio de sesión fallido, muestra una alerta con un mensaje de error
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      // Si ocurre un error durante la solicitud al servidor, muestra una alerta con el mensaje de error
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Verifique que el correo y la contraseña sean los correctos.');
    }
  };

  // Renderiza el formulario de inicio de sesión
  return (
    <form onSubmit={handleSubmit} className="max-w-sm py-20 mx-auto">
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ejemplo@correo.com"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
        </div>
      </div>
      <div className="content-center">
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Iniciar Sesión</button>
      </div>
    </form>
  );
}

export default IniciarSesion;
