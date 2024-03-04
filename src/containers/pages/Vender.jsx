import Layout from "../../hocs/layouts/Layout"
import Navbar from "../../componentes/Navigation/Navbar"
import Footer from "../../componentes/Navigation/Footer"
import SideMenu from "../../componentes/Vender/Sidemenu"
import Tarjetas from "../../componentes/Vender/Tarjetas"

function Vender(){
    return(
        <Layout>
            <Navbar/>
                <SideMenu/>
                
                <Footer/>
        </Layout>
    )
}
export default Vender