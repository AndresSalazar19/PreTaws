import Layout from "../../hocs/layouts/Layout"
import Navbar from "../../componentes/Navigation/Navbar"
import Footer from "../../componentes/Navigation/Footer"
import SideMenu from "../../componentes/Vender/Sidemenu"

function Comprar(){
    return(
        <Layout>
            <Navbar/>
            <SideMenu/>
                <Footer/>
        </Layout>
    )
}
export default Comprar