import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import store from './store';
import { Provider } from 'react-redux';
import Error404 from './containers/errors/Error404';
import Home from './containers/pages/Home';
import Vender from './containers/pages/Vender';
import Comprar from './containers/pages/Comprar';
import IniciarSesion from './containers/pages/Iniciar_sesion';
import Intercambiar from './containers/pages/Intercambiar';
import Registrarse from './containers/pages/Registrarse';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          #Error Display
         <Route path="*" element={<Error404 />} />

          #Home Display
          <Route path="/" element={<Home />} />
          <Route path="/Vender" element={<Vender />} />
          <Route path="/Comprar" element={<Comprar />} />
          <Route path="/Intercambiar" element={<Intercambiar />} />
          <Route path="/IniciarSesion" element={<IniciarSesion />} />
          <Route path="/Registrarse" element={<Registrarse />} />
        </Routes>
      </Router>
    </Provider>
    
  );
}

export default App;
