import React, { useState } from 'react';
import axios from 'axios';

function Registrar() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/registro', { email, password });
      alert('Registro exitoso');
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Error al registrar. Por favor, inténtalo de nuevo más tarde');
    }
  };

  return (
    <section>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
        <div className="justify-center mx-auto text-left align-bottom transition-all transform bg-white rounded-lg sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="grid flex-wrap items-center justify-center grid-cols-1 mx-auto shadow-xl lg:grid-cols-2 rounded-xl">
            <div className="w-full px-6 py-3">
              <div>
                <div className="mt-3 text-left sm:mt-5">
                  <div className="inline-flex items-center w-full">
                    <h3 className="text-lg font-bold text-neutral-600 leading-6 lg:text-5xl">Regístrate</h3>
                  </div>
                  <div className="mt-4 text-base text-gray-500">
                    <p>Registra una cuenta para seguir navegando</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mt-6 space-y-2">
                  <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      placeholder="Ingresa tu correo electrónico"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">Contraseña</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      placeholder="Ingresa una contraseña"
                      required
                    />
                  </div>
                  <div className="flex flex-col mt-4 lg:space-y-2">
                    <button
                      type="submit"
                      className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Registrarse
                    </button>
                    <a href="#" className="inline-flex justify-center py-4 text-base font-medium text-gray-500 focus:outline-none hover:text-neutral-600 focus:text-blue-600 sm:text-sm">¿Olvidaste tu contraseña?</a>
                  </div>
                </div>
              </form>
            </div>
            <div className="order-first hidden w-full lg:block">
              <img className="object-cover h-full bg-cover rounded-l-lg" src="./assets/images/libros.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registrar;
