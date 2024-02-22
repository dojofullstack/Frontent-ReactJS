import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Switch } from "@headlessui/react";
import useEcommerceStore from "../store";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';





function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CheckoutForm = () => {
  const [agreed, setAgreed] = useState(false);
  const [adress, setAdress] = useState("");
  const [saveAdress, setsaveAdress] = useState(false);
  const cart = useEcommerceStore((state) => state.cart);
  const user = useEcommerceStore((state) => state.user);
  const [subTotal, setSubTotal] = useState(0);
  const [Total, setTotal] = useState(0);
  const [costoServicio, setcostoServicio] = useState(1);
  const [runPayment, setrunPayment] = useState(false);
  const addressPrincipal = useEcommerceStore((state) => state.addressPrincipal);
  const navigate = useNavigate();
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });


  // basico=0 , priotirio=1, economico=2
  const [deliveryType, setdeliveryType] = useState(0);

  // efectivo=0 , tarjeta=1, paypal=2
  const [paymentType, setpaymentType] = useState(0);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }



  useEffect(() => {
    let total = 0;
    cart.map((item) => {
      const productoTotal = item.product.price * item.cantidad;
      total += productoTotal;
    });

    setSubTotal(Number(total.toFixed(2)));

    

  }, [cart]);


  const completarPago = () => {

      // basico=0 , priotirio=1, economico=2
      // basico FREE
      // prioritary $3
      // Economico  $1


    let costodeliveryType = 0;
    if (deliveryType === 1){
      costodeliveryType = 3;
    } else if (deliveryType === 2){
      costodeliveryType = 1
    }

    // total costos operativos (costo servicio + subTotal + costoEnvio)
    setTotal(subTotal + costodeliveryType + costoServicio)

    setrunPayment(true);

  }


  const CreateLinkPay = () => {

    axios.post('https://z8gez0imi4.execute-api.us-east-1.amazonaws.com/dev', {
            name:  user.firstName,
            email: user.email,
            mount: Total,
            description: 'Articulos Tienda'
          }).then((data) => {
            const LinkPay = data.data.data.payment_method.url;

            window.location.href = LinkPay;

          })

  }




  const getTokePayment  = () => {
    console.log(window.deviceSessionId);  
    OpenPay.token.extractFormAndCreate('payment-form', (response) => {console.log(response.data.id)}, (e) => console.log('eror pago', e)); 


    navigate('/checkout-success');

  }


  return (
    <>
      <div className="flex justify-center gap-28 my-5">
        <div className="py-5">
          <div className="my-1">
            <label>Direccion:</label>
            <span className="mx-3 font-bold">{addressPrincipal}</span>
            <button
              onClick={() => navigate("/config-address")}
              className="btn btn-primary"
            >
              Cambiar direccion
            </button>
          </div>

          <div className="my-2 border p-3">
            <p className="text-xl font-bold">Entrega estimada:</p>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Prioritario</span>
                <input
                  checked={deliveryType === 1}
                  value={1}
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-red-500"
                  onChange={(e) => {
                     setdeliveryType(Number(e.target.value));
                     completarPago();
                    }}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Basico</span>
                <input
                  checked={deliveryType === 0}
                  onChange={(e) => {
                     
                     setdeliveryType(Number(e.target.value));
                     completarPago();
                    }}
                  value={0}
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-500"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Economica</span>
                <input
                  checked={deliveryType === 2}
                  onChange={(e) => {
                    setdeliveryType(Number(e.target.value));
                    completarPago(); 
                  }}
                  value={2}
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-orange-500"
                />
              </label>
            </div>
          </div>


          <div className="my-2 border p-3">
          <p className="text-xl font-bold">Metodos de pago:</p>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Efectivo</span>
              <input
                checked={paymentType === 0}
                value={0}
                onChange={(e) => setpaymentType(Number(e.target.value))}
                type="radio"
                name="radio-pay"
                className="radio checked:bg-red-500"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Tarjeta debito / credito</span>
              <input
                checked={paymentType === 1}
                value={1}
                onChange={(e) => setpaymentType(Number(e.target.value))}
                type="radio"
                name="radio-pay"
                className="radio checked:bg-blue-500"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Paypal</span>
              <input
                checked={paymentType === 2}
                value={2}
                onChange={(e) => setpaymentType(Number(e.target.value))}
                type="radio"
                name="radio-pay"
                className="radio checked:bg-blue-500"
              />
            </label>
          </div>
        </div>



        </div>

    


<div className="card w-96 bg-neutral text-neutral-content">
  <div className="card-body items-center text-center">
    <h2 className="card-title">Carrito Resumen</h2>


          <p>SubTotal Productos: <span className="font-bold"> ${subTotal} USD</span> </p>
          <p>Tarifa de servicio: <span className="font-bold"> ${costoServicio} USD</span></p>
          <p>Costo de Envio:
          {deliveryType === 0 && '$0 USD'}
          {deliveryType === 1 && '$3 USD'}
          {deliveryType === 2 && '$1 USD'}
            </p>

        <p><span className="text-xl font-bold">Total: ${Total} USD</span></p>

    
    {!runPayment &&
    <div className="card-actions justify-end">
      <button onClick={() => completarPago()} className="btn btn-success w-full">Completar pago</button>
    </div>}


    <div className="w-full">
    {(runPayment && paymentType === 2 ) &&
    <PayPalScriptProvider options={{ clientId: "AXUZq9j1pLznRMUKGJpNLvq0RPOE2lDEJZnuNK-o5KcUAXbYDNPctCQnIihN2g-fpKhNlsqIgLUskvcs", currency: 'USD' }}>
        <PayPalButtons style={{ layout: "horizontal" }}
          createOrder={(data, actions) =>  {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: Total
                }
              }
            ]
          });
        }}
        onApprove={() => alert('pago completado con exito!')}
        />
    </PayPalScriptProvider>
    }


{(paymentType === 1 ) &&

  // <button onClick={() => CreateLinkPay()}  className="w-ful btn btn-secondary text-lg">Pagar con Tarjeta</button>
    <div>
    <Cards
      number={state.number}
      expiry={state.expiry}
      cvc={state.cvc}
      name={state.name}
      focused={state.focus}
    />


    <form id='payment-form' onSubmit={(e) => e.preventDefault()} >

    <label className="input input-bordered flex items-center gap-2 my-2">
    <input
        data_openpay_card
        type="number"
        name="number"
        placeholder="Card Number"
        value={state.number}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        className="grow"
      />
</label>


<label className="input input-bordered flex items-center gap-2 my-2">
<input
data_openpay_card
        type="text"
        name="name"
        placeholder="Titular"
        value={state.name}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        className="grow"
      />
</label>

 

<label className="input input-bordered flex items-center gap-2 my-2">
<input
data_openpay_card
        type="text"
        name="expiry"
        placeholder="Fecha"
        value={state.expiry}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />
</label>
  


<label className="input input-bordered flex items-center gap-2 my-2">
<input
data_openpay_card='info'
        type="text"
        name="cvc"
        placeholder="CVC"
        value={state.cvc}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />
</label>
    

    <button onClick={() =>  getTokePayment() }  className="btn btn-primary text-lg w-full">Pagar</button>
    </form>
  </div>


}






    </div>


  </div>
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
