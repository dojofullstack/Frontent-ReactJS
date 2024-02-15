import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useEcommerceStore from "../store";
import { useNavigate } from "react-router-dom";



const RegisterForm = () => {

    const register =  useEcommerceStore((state) =>  state.register);
    const user =  useEcommerceStore((state) =>  state.user);
    const inputRefEmail =  useRef();
    const inputRefPwd =  useRef();
    const inputRefName = useRef();
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
            Registrar usuario
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6" >

          <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                Nombre:
              </label>
              <div className="mt-2">
                <input
                ref={inputRefName}
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  required
                  className="input input-bordered input-secondary w-full"
                />
              </div>
            </div>



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
                onClick={() => register(inputRefName.current.value ,inputRefEmail.current.value, inputRefPwd.current.value)}
                type="btn"
                className="btn btn-secondary w-full text-xl font-bold"
              >
                Registrate
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            ya eres usuario?{' '}
            <a  onClick={() => navigate('/login')}  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                inicia sesion aqui
            </a>
          </p>
        </div>
      </div>
    )
} 


const Register = () => {
    return (

        <>
                <Header/>
                <RegisterForm/>
                <Footer/>
        </>

    )
}

export default Register;