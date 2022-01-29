import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/header/Header';
import { Container } from 'react-bootstrap';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Cart from './components/cart/Cart';


function App() {
  return (
     <>
        <BrowserRouter>
         <Header   />
           <Container fluid>
               <Routes>
                   <Route   path="/"   element={<Home />}   />
                   <Route   path="/product/:id"  element={<ProductDetails />}   />
                   <Route   path="/cart"  element={<Cart/>}   />


               </Routes>
           </Container>
        </BrowserRouter>
     </>
  );
}

export default App;
