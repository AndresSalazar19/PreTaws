import Layout from "../../hocs/layouts/Layout"
import Navbar from "../../componentes/Navigation/Navbar_logged"
import Footer from "../../componentes/Navigation/Footer"
import AgregarLibroJ from "../../componentes/AgregarLibroJ"

function AgregarLibro(){
    return(
        <Layout>
            <Navbar/>
                <AgregarLibroJ></AgregarLibroJ>
                <Footer/>
        </Layout>
    )
}
export default AgregarLibro