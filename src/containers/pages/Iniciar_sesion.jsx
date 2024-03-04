import Layout from "../../hocs/layouts/Layout"
import Navbar from "../../componentes/Navigation/Navbar"
import Footer from "../../componentes/Navigation/Footer"
import InicioSesion from "../../componentes/IniciarSesion/IniciarSesion"

function IniciarSesion(){
    return(
        <Layout>
            <Navbar/>
                <InicioSesion/>
                <Footer/>
        </Layout>
    )
}
export default IniciarSesion