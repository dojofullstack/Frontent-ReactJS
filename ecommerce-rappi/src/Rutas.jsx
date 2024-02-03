import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Restaurante from "./views/Restaurante";
import ProductosMarca from "./views/ProductosMarca";

const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<Restaurante/>} />  
      <Route path="/restaurantes/:marcaID" element={<ProductosMarca/>} />  
      </Routes>
    </BrowserRouter>
  );
};



export default Rutas;