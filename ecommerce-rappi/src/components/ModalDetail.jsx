import { useNavigate } from "react-router-dom";
import useEcommerceStore from "../store";




export const ModalDetail = () => {
  const productID =  useEcommerceStore ((state) =>  state.productID);
  const productDetail =  useEcommerceStore ((state) =>  state.productDetail);
  const navigate = useNavigate();
  const isLoginActive =  useEcommerceStore ((state) =>  state.isLoginActive);




  const completarPedido = () => {
    console.log('isLoginActive', isLoginActive);
    if (!isLoginActive){
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  
  }
  

  

    return (
        <>
<dialog id="my_modal_product" className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
    <h3 className="font-bold text-lg">{productDetail.name}</h3>
    
    <div className="flex">


      <div className="m-1 p-2">
          <img src={`https://images.rappi.pe/products/${productDetail.image}`} />
      </div>

      <div className="m-1 p-2">
        <p className="text-2xl">
        ${productDetail.price} USD
        </p>
        <p>
            {productDetail.description}
        </p>
      </div>

    </div>



    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button className="btn me-5">Cerrar</button>
        <button onClick={() => completarPedido()} className="btn btn-success">Completar pedido</button>
      </form>
    </div>
  </div>
</dialog>

        </>
    )
}