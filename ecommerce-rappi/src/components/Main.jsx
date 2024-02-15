import { useNavigate } from "react-router-dom";
import Categorias from "./Categorias";




const Carousel = () => {

    return (
        <div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full">
    <img src="https://blog.rappi.com/wp-content/uploads/2017/01/Banner-Super.jpg" className="w-full h-96" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src="https://www.mundoglam.co/wp-content/uploads/Rappi.png" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src="https://www.horeca.pe/sites/default/files/Rappi.png" className="w-full h-96" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 

</div>
    )
}



const Main = () => {

    return (
        <>

            <Carousel/>
            <Categorias/>
          
        </>
    )
}


export default Main;
