import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";

function Navbar() {
    const handleLogout = () => {
        // Eliminar el token JWT del localStorage
        localStorage.removeItem('accessToken'); 
        console.log('Token JWT eliminado del localStorage.');
      
        // Redireccionar al usuario a la página de inicio de sesión
        window.location = "/"; // Ajusta la ruta según la ruta de tu página de inicio de sesión
      };
      

  return (
    <nav className="bg-gray-800 py-10 realtive">
      <div className="container mx-auto flex">
        <div className="flex lg:hidden">
        </div>
        <div className="lg:flex hidden flex-grow justify-between">
          <div>
            <Link to='/Header_logged' className="text-white font-semibold leading-none tracking-tighter text-white lg:mr-7">Inicio</Link>
            <Link to='/Vender' className="text-white font-semibold leading-none tracking-tighter text-white lg:mr-7">Vender</Link>
            <Link to='/Comprar' className="text-white font-semibold leading-none tracking-tighter text-white lg:mr-7">Comprar</Link>
          </div>
          <div className="content-center">
          </div>
          <div>
            <button onClick={handleLogout} className="text-white font-semibold leading-none tracking-tighter text-white bg-blue-700 border border-blue-500 py-2.5 px-5 rounded-md hover:bg-blue-900 hover:border-blue-700 transition duration-500 ease-in-out">Cerrar sesión</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {})(Navbar);
