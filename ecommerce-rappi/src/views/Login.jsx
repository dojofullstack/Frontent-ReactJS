import { useEffect, useRef } from "react";
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


    console.log('user', user);


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
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
            Iniciar sesion
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6" >
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                Email:
              </label>
              <div className="mt-2">
                <input
                ref={inputRefEmail}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                ref={inputRefPwd}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => Login(inputRefEmail.current.value, inputRefPwd.current.value)}
                type="btn"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
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