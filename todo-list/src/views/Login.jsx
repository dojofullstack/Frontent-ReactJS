import Footer from "../components/Footer";
import Header from "../components/Header";



const Login = () => {
    return (

        <>
            <Header dataUser={{}} />

            <div>
            <h2>Iniciasr Sesion</h2>
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>

            <label for="inputPassword5" class="form-label">Password</label>
            <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock"/>
            <div id="passwordHelpBlock" class="form-text">
            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
            </div>

            <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <input type="submit" id="inputPassword5" class="form-control btn btn-primary" aria-describedby=""/>
        </div>

            <Footer/>
        
        </>
       
    )
}


export default Login;