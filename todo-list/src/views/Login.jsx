import { useContext, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TodoAppContext from "../context";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";


const Login = () => {

    const inputRefEmail =  useRef();
    const inputRePwd =  useRef();
    const {todoApp, loginUser} =  useContext(TodoAppContext);
    const navigate =  useNavigate();


    const login = () => {
        const email = inputRefEmail.current.value;
        const pwd = inputRePwd.current.value;
        loginUser(email, pwd);
    }


    useEffect(() => {

        console.log('detectando cambio de estado user');

        if (todoApp?.user?.token){
            navigate('/app');
        }

    }, [todoApp.user])



    


    return (

        <>
            <Header dataUser={{}} />

            <div className="content">
            <h2>Iniciasr Sesion</h2>
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input  value={'kminchelle'} ref={inputRefEmail} type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>

            <label for="inputPassword5" class="form-label">Password</label>
            <input  value={'0lelplR'} ref={inputRePwd} type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock"/>
            <div id="passwordHelpBlock" class="form-text">
            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
            </div>

            {/* <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div> */}

            <input onClick={login} type="butonn" id="inputPassword5" class="form-control btn btn-primary" aria-describedby="" value={'Iniciar sesion'}/>



        </div>


            <ToastContainer />
            <Footer/>
        
        </>
       
    )
}


export default Login;