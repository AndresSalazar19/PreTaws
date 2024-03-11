import Layout from "../../hocs/layouts/Layout"
import Navbar from "../../componentes/Navigation/Navbar_logged"
import Footer from "../../componentes/Navigation/Footer"
import Header_LoggedJ from "../../componentes/Header_LoggedJ"

function Header_Logged(){
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.log("Token no existe:");
    window.location = "http://localhost:3000"; 
  }

  return (
    <Layout>
      <Navbar />
      <Footer />
      <Header_LoggedJ></Header_LoggedJ>
    </Layout>
  )
}

export default Header_Logged
