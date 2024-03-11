import Layout from "../../hocs/layouts/Layout"
import Navbar from "../../componentes/Navigation/Navbar"
import Footer from "../../componentes/Navigation/Footer"
import InicioSesion from "../../componentes/IniciarSesion/IniciarSesion"

function IniciarSesion(){
    return(
        <Layout>
            <Navbar/>
            <h3 className="text-lg font-bold text-neutral-600 leading-6 lg:text-5xl text-center mt-8 lg:mt-16">Iniciar Sesión</h3>

                <InicioSesion/>

                <Footer/>
        </Layout>
    )
}
export default IniciarSesion