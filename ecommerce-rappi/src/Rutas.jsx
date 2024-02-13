import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Restaurante from "./views/Restaurante";
import ProductosMarca from "./views/ProductosMarca";
import Login from "./views/Login";
import Checkout from "./views/Checkout";
import Register from "./views/Register";

const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/restaurantes" element={<Restaurante/>} />  
      <Route path="/restaurantes/:marcaID" element={<ProductosMarca/>} />  
      </Routes>
    </BrowserRouter>
  );
};



export default Rutas;