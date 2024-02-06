import { useNavigate } from "react-router-dom";
import useEcommerceStore from "../store";



const categorias = ['Restaurantes', 'Supermecardo', 'Boticas'];

const Categorias = () => {

  // const statecontadorVisitas = useEcommerceStore((state) => state.contadorVisitas);
  const navigate = useNavigate();

    // console.log('statecontadorVisitas', statecontadorVisitas);

    return (
        
        <div className="flex">
      

            {
                      categorias.map((item, index) => (
                        <div className="card w-96 bg-base-100 shadow-xl" key={index} onClick={() => navigate(`/${item}`)}  >
              <figure className="px-10 pt-10">
                <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{item}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Comprar</button>
                </div>
              </div>
            </div>
                    ) )
            
            }


        </div>
  
    )
}

export default Categorias;