import { Typewriter } from 'react-simple-typewriter'
import { Link } from 'react-router-dom'

function Header(){
  const token = localStorage.getItem("accessToken");
  if (token) {
    console.log("Token existe:", token);
    window.location = "http://localhost:3000/Header_Logged"; 
  }

  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16 lg:justify-between">
          <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
            <h2 className="text-3xl font-bold sm:text-4xl">Bienvenido a INTERLIB</h2>

            <p className="mt-4 text-gray-600">
              Somos un pequeño proyecto orientado a facilitar la comunicacion entre estudiantes con el fin de puedan Vender, Comprar o Intercambiar libros que sean del genero de su interes.
            </p>

            <p className="mt-4 text-gray-600">
              Empieza tu busqueda!
            </p>

            <a
              href="/IniciarSesion"
              className="mt-8 inline-block rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Iniciar Sesion
            </a>
          </div>
          {/* Nuevo div para el cuadro de solicitudes pendientes */}
          <div className="hidden lg:block">
            <div className="bg-gray-100 p-4 rounded-xl shadow-md">
              <h2 className="text-lg font-bold mb-2">Solicitudes Pendientes</h2>
              <p className="text-gray-600">Inicie sesión para ver solicitudes pendientes.</p>
              {/* Agrega aquí el contenido relacionado con las solicitudes pendientes */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header
