import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoAppContext from "../context";



const Header = ({dataUser}) => {
    
    const navigate = useNavigate();

    const {todoApp, checkLogin, closeLogin} =  useContext (TodoAppContext);


    // console.log(Object.keys(dataUser).length);


    useEffect(() => {
      if (todoApp?.user?.id == undefined){
        checkLogin();
      }

      if (!todoApp.isLogin){
          navigate('/login');
        } else {
          navigate('/app');
        }


    }, [todoApp.user, todoApp.isLogin]);





    // useEffect(() => {
    //   console.log('isLogin', todoApp.isLogin);
    //   if (!todoApp.isLogin){
    //     navigate('/login');
    //   }

    // }, [todoApp.isLogin]);




    return (
    <>
      <header>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand">Navbar</a>

            <ul>
            <li onClick={() => navigate('/')  } >  <span className="menu-nav"> App Todo</span> </li>

            {todoApp?.user?.id === null && <li onClick={() => navigate('/login')  }> <span className="menu-nav"> Login</span> </li>}
            </ul>

            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar tareas"
                aria-label="Buscar"
              />
              <button className="btn btn-outline-success" type="submit">
                Buscar 
              </button>
            </form>

          {Object.keys(dataUser).length ?
            <div className="flex">
              <div>
                <img height='50px' src={dataUser.image} />
              </div>
              <div>{dataUser.firstName}</div>
              <button onClick={() => closeLogin()} >Cerrar sesion</button>
            </div> :
              <div>
                <button onClick={() => navigate('/login')} className="btn btn-primary">Iniciar Sesion</button>
              </div>
            } 

            {/* {Object.keys(dataUser).length > 0 && <div className="flex">
              <div>
                <img height='50px' src={dataUser.image} />
              </div>
              <div>{dataUser.firstName}</div>
            </div>}


            {!Object.keys(dataUser).length &&
             <div>
             <button onClick={() => navigate('/login')} className="btn btn-primary">Iniciar Sesion</button>
           </div>
            } */}


          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
