import Layout from "../../hocs/layouts/Layout"
import Navbar from "../../componentes/Navigation/Navbar_logged"
import Footer from "../../componentes/Navigation/Footer"
import SideMenu from "../../componentes/Vender/Sidemenu"
import Tarjetas from "../../componentes/Vender/Tarjetas"
import ComprarJ from "../../componentes/ComprarJ"

function Vender(){
    return(
        <Layout>
            <Navbar/>
                <ComprarJ></ComprarJ>
                <Footer/>
        </Layout>
    )
}
export default Vender