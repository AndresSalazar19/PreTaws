import Layout from "../../hocs/layouts/Layout"
import Navbar from "../../componentes/Navigation/Navbar"
import Footer from "../../componentes/Navigation/Footer"
import Registrar from "../../componentes/IniciarSesion/Registro"

function Registrarse(){
    return(
        <Layout>
            <Navbar/>
            <Registrar/>
                <Footer/>
        </Layout>
    )
}
export default Registrarse