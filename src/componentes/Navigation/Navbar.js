import { connect } from "react-redux"
import { Link } from "react-router-dom"
import React from "react"
function Navbar(){
  return(
    <nav class = "bg-gray-800 py-10 realtive">
      <div class = "container mx-auto flex">
        <div class="flex lg:hidden">
          <img src="src/assets/images/menu_icon.png"></img>
        </div>
        <div class="lg:flex hidden flex-grow justify-between">
          <div>
            <Link to='/' class= "text-white font-semibold leading-none tracking-tighter text-white lg:mr-7">Inicio</Link>
            <Link to='/Vender' class= "text-white font-semibold leading-none tracking-tighter text-white lg:mr-7">Vender</Link>
            <Link to='/Comprar' class= "text-white font-semibold leading-none tracking-tighter text-white lg:mr-7">Comprar</Link>
            <Link to='/Intercambiar' class= "text-white font-semibold leading-none tracking-tighter text-white">Intercambiar</Link>
          </div>
          <div calss="content-center">
            <img src="assets/images/interlib_logo.png"></img>
          </div>
          <div>
            <Link to="/IniciarSesion" class= "text-white font-semibold leading-none tracking-tighter text-white border border-white py-2.5 px-5 rounded-md hover:bg-white hover:text-gray-800 transition duration-500 ease-in-out lg: mr-7">Iniciar Sesion</Link>
            <Link to="/Registrarse" class= "text-white font-semibold leading-none tracking-tighter text-white bg-blue-500 border border-blue-500 py-2.5 px-5 rounded-md hover:bg-blue-700 hover:border-blue-700 transition duration-500 ease-in-out">Registrarse</Link>
          </div>
          
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps= state =>({

})

export default connect(mapStateToProps, {

}) (Navbar)