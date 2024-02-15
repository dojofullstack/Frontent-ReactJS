import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useEcommerceStore from "../store";
import { useNavigate } from "react-router-dom";



const LoginForm = () => {

    const Login =  useEcommerceStore((state) =>  state.Login);
    const user =  useEcommerceStore((state) =>  state.user);
    const inputRefEmail =  useRef();
    const inputRefPwd =  useRef();
    const navigate =  useNavigate();
    const [loadingLogin, setLoadingLogin] = useState(false);


    useEffect (() => {
        console.log('detectando cambio de estado user');

        if (user.id){
            navigate('/');
        }

    }, [user])


    return (

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto rounded-2xl"
            src="/static/image/logo_rappi.jpg"
            alt="Your Company"
          />
          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-black">
            Iniciar sesion
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6" >
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                Email:
              </label>
              <div className="mt-2">
                <input
                placeholder="Ingresar correo electronico"
                ref={inputRefEmail}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input input-bordered input-secondary w-full"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
                  Contrasena:
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Olvidaste la contrasena?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                placeholder='***'
                ref={inputRefPwd}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input input-bordered input-secondary w-full"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  if (inputRefEmail.current.value && inputRefPwd.current.value) {
                    setLoadingLogin(true);
                    Login(inputRefEmail.current.value, inputRefPwd.current.value);  
                  }
                }}
                type="btn"
                className="btn btn-secondary w-full text-xl"
              >
                {loadingLogin && <span className="loading loading-spinner"></span>}
                Iniciar
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            No eres usuario?{' '}
            <a  onClick={() => navigate('/register')}  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              registrate aqui
            </a>
          </p>
        </div>
      </div>
    )
} 


const Login = () => {
    return (

        <>
                <Header/>
                <LoginForm/>
                <Footer/>
        </>

    )
}

export default Login;