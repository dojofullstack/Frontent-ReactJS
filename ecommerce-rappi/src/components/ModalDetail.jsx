import { useNavigate } from "react-router-dom";
import useEcommerceStore from "../store";
import { useState } from "react";

export const ModalDetail = () => {
  const productID = useEcommerceStore((state) => state.productID);
  const productDetail = useEcommerceStore((state) => state.productDetail);
  const navigate = useNavigate();
  const isLoginActive = useEcommerceStore((state) => state.isLoginActive);
  const addCartItem = useEcommerceStore((state) => state.addCartItem);

  const updateProductID = useEcommerceStore((state) => state.updateProductID);

  
  const [cantidad, setCantidad] = useState(1);

  return (
    <>
      <dialog id="my_modal_product" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-2xl ms-3">{productDetail.name}</h3>

          <div className="flex">
            <div className="m-1 p-2 w-5/12">
              <img
                className="rounded-xl"
                src={`https://images.rappi.pe/products/${productDetail.image}`}
              />
            </div>

            <div className="m-1 p-2 w-full flex flex-col">
              <p className="text-2xl font-bold">${productDetail.price} USD</p>
              <p className="mt-2 text-lg">{productDetail.description}</p>

              {/* personalizar pedido */}
              <div className="mt-2 w-full">
                <div className="collapse collapse-arrow">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title text-xl font-medium">
                    ¿Deseas Cubiertos?
                  </div>
                  <div className="collapse-content">
                    <div className="border-2 p-5 flex justify-between px-7">
                      <span>No</span>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-accent"
                      />
                    </div>

                    <div className="border-2 p-5 flex justify-between px-7 mt-2">
                      <span>Si</span>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-accent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button onClick={() => updateProductID(null)} className="btn me-5">Cerrar</button>

              <input
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                type="number"
                placeholder=""
                className="input input-bordered input-primary w-[70px] mx-5"
              />

              <button
                onClick={() => addCartItem(productDetail, Number(cantidad))}
                className="btn btn-success text-white font-bold text-xl"
              >
                Agregar al carrito
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
