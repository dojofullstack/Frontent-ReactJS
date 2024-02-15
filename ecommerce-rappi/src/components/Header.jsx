import { useEffect } from "react";
import useEcommerceStore from "../store";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";




const Cart = () => {
  const cart = useEcommerceStore((state) => state.cart);
  const clearCart = useEcommerceStore((state) => state.clearCart);
  const isLoginActive = useEcommerceStore((state) => state.isLoginActive);
  const navigate = useNavigate();

  

  const completarPedido = () => {
    console.log('isLoginActive', isLoginActive);
    if (!isLoginActive){
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  
  }
  



  useEffect(() => {
    console.log("Log cart", cart);
  }, [cart]);

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{/* Page content here */}</div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}

          <h1 className="text-3xl font-bold my-3">Tu Canasta</h1>

          {cart.map((item, index) => (
            <div className="card card-side bg-base-100 shadow-xl my-2" key={index} >
              <figure>
                <img
                  className="h-[90px]"
                  src={`https://images.rappi.pe/products/${item?.product?.image}` }
                  alt="Movie"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item?.product?.name}</h2>
                <p className="text-green-400 text-base font-bold">${item?.product?.price}</p>
                <span className="font-bold">x {item.cantidad}</span>
              </div>
            </div>
          ))}

          <button onClick={() => completarPedido()} className="btn btn-primary my-3">Ir al pago</button>

          <button onClick={() => clearCart()} className="btn btn-outline btn-secondary">Vaciar Canasta</button>


        </ul>
      </div>
    </div>
  );
};

const Header = () => {
  const user = useEcommerceStore((state) => state.user);
  const isLoginActive = useEcommerceStore((state) => state.isLoginActive);
  const checkLogin = useEcommerceStore((state) => state.checkLogin);
  const loginClose = useEcommerceStore((state) => state.loginClose);
  const addressPrincipal = useEcommerceStore((state) => state.addressPrincipal);
  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      <Cart />

      <div className="navbar bg-base-100">
        <div className="flex-1" >
          <img className="h-12 border rounded-xl" src="/static/image/logo_rappi.jpg" />
          <a  onClick={() => navigate('/')} className="btn btn-ghost text-xl">Pedidos Rappi</a>

          <button onClick={() => navigate('/config-address')} className="max-w-[300px] btn btn-outline btn-secondary mx-3">
            <FaMapMarkerAlt className="text-2xl"/>
            {addressPrincipal}
            <FaAngleDown/>
            </button>


        </div>

        <div className="flex-none gap-2">

        <div className="form-control  w-full md:w-[350px] mx-auto ">
            <input
              type="text"
              placeholder="Buscar en Rappi"
              className="input input-bordered"
            />
          </div>

          <button onClick={() => navigate('/login')} className="btn btn-outline btn-success">
          <FaUserCircle className="text-2xl" />
          Ingresar</button>


          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-error text-white mx-1"
          >
            <FaShoppingCart className="text-2xl" />
          </label>

     

          {isLoginActive && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.image_profile}
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <p>{user.firstName}</p>
                </li>
                <li>
                  <a className="justify-between">
                    Perfil
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Configurar</a>
                </li>

                <li>
                  <a onClick={() => loginClose()}>Cerrar sesion</a>
                </li>

              </ul>
            </div>
          )}
        </div>

        
      </div>

      <div className="text-sm breadcrumbs ms-10">
  <ul>
    <li onClick={() => navigate('/')} ><a>Categorias</a></li> 
    <li onClick={() => navigate('/restaurantes')} ><a>Restaurantes</a></li> 
    <li>Supermercados</li>
  </ul>
</div>
    </>
  );
};

export default Header;
