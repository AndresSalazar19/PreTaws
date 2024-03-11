import Layout from "../../hocs/layouts/Layout"
import Navbar from "../../componentes/Navigation/Navbar_logged"
import Footer from "../../componentes/Navigation/Footer"
import CrearOrdenCompraJ from "../../componentes/CrearOrdenCompraJ"

function CrearOrdenCompra(){
    return(
        <Layout>
            <Navbar/>
            <CrearOrdenCompraJ></CrearOrdenCompraJ>
                <Footer/>
        </Layout>
    )
}
export default CrearOrdenCompra