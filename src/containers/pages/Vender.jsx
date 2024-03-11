import Layout from "../../hocs/layouts/Layout"
import Navbar from "../../componentes/Navigation/Navbar_logged"
import Footer from "../../componentes/Navigation/Footer"
import SideMenu from "../../componentes/Vender/Sidemenu"
import Tarjetas from "../../componentes/Vender/Tarjetas"
import Vender_l from "../../componentes/Vender_l"

function Vender(){
    return(
        <Layout>
            <Navbar/>
                <Vender_l></Vender_l>
                <Footer/>
        </Layout>
    )
}
export default Vender