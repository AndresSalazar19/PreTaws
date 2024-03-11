import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="bg-gray-800 py-10 relative">
      <div className="container mx-auto flex">
        <div className="flex lg:hidden">
        </div>
        <div className="lg:flex hidden flex-grow justify-between">
          <div>
            <Link to="/" className="text-white font-semibold leading-none tracking-tighter text-white lg:mr-7">Inicio</Link>
            <Link to="/IniciarSesion" className="text-white font-semibold leading-none tracking-tighter text-white lg:mr-7">Vender</Link>
            <Link to="/IniciarSesion" className="text-white font-semibold leading-none tracking-tighter text-white lg:mr-7">Comprar</Link>
          </div>
          <div className="justify-center">
          </div>
          <div>
            <Link to="/IniciarSesion" className="text-white font-semibold leading-none tracking-tighter text-white border border-white py-2.5 px-5 rounded-md hover:bg-white hover:text-gray-800 transition duration-500 ease-in-out lg:mr-7">Iniciar Sesion</Link>
            <Link to="/Registrarse" className="text-white font-semibold leading-none tracking-tighter text-white bg-blue-500 border border-blue-500 py-2.5 px-5 rounded-md hover:bg-blue-700 hover:border-blue-700 transition duration-500 ease-in-out">Registrarse</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps= state =>({

})

export default connect(mapStateToProps, {

}) (Navbar);
