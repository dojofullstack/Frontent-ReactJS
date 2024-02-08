import { useEffect } from "react";
import useEcommerceStore from "../store";



const Header = () => {

  const user =  useEcommerceStore((state) =>  state.user);
  const isLoginActive =  useEcommerceStore ((state) =>  state.isLoginActive);
  const checkLogin =  useEcommerceStore ((state) =>  state.checkLogin);


    useEffect(() => {
      checkLogin()
    }, [])


    return (
        <>
         
         <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Ecommerce Rappi</a>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>

{isLoginActive &&
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={user.image_profile} />
        </div>
      </div>

      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li><p>{user.firstName}</p></li>
        <li>
          <a className="justify-between">
            Perfil  
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Configurar</a></li>
        <li><a>Cerrar sesion</a></li>
      </ul>

    </div>
}



  </div>
</div>

        </>
    )
}


export default Header;