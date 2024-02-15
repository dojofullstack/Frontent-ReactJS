import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Switch } from "@headlessui/react";
import useEcommerceStore from "../store";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CheckoutForm = () => {
  const [agreed, setAgreed] = useState(false);
  const [adress, setAdress] = useState('');
  const [saveAdress, setsaveAdress] = useState(false);
  const cart = useEcommerceStore((state) => state.cart);
  const [subTotal, setSubTotal] = useState(0);
  const addressPrincipal = useEcommerceStore((state) => state.addressPrincipal);



  useEffect(() => {

    let total = 0;
    cart.map((item) => {
      const productoTotal = item.product.price * item.cantidad;
      total += productoTotal;
    })
    
    setSubTotal( parseInt(total) );

  }, [cart])

  return (
    <>
      <div className="flex">
        <div className="mx-auto py-5">

          <div className="my-1">
          <label>Direccion:</label>
          <input
            value={addressPrincipal}
            onChange={(e) => setAdress(e.target.value)}
            type="text"
            placeholder="Ingresar direccion"
            className="input input-bordered input-accent w-full max-w-xs"
            disabled={saveAdress}
          />
          <button onClick={() => setsaveAdress(true) } className="btn btn-primary">Guardar direccion</button>
          </div>
       

        </div>


        <div className="mx-auto py-5">
            <p>Carrito Resumen</p>

            <p>SubTotal: ${subTotal}</p>
            
        </div>
      </div>
    </>
  );
};

const Checkout = () => {
  return (
    <>
      <Header />
      <CheckoutForm />
      <Footer />
    </>
  );
};

export default Checkout;
