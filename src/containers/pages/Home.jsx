import Layout from "../../hocs/layouts/Layout"
import Navbar from "../../componentes/Navigation/Navbar"
import Footer from "../../componentes/Navigation/Footer"
import Header from "../../componentes/Home/Header"

function Home(){
    return(
        <Layout>
            <Navbar/>
                <Header/>
                <Footer/>
        </Layout>
    )
}
export default Home