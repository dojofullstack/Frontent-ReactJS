import { useNavigate } from "react-router-dom";



const Header = ({dataUser}) => {
    
    const navigate = useNavigate();

    console.log(Object.keys(dataUser).length);

    return (
    <>
      <header>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand">Navbar</a>

            <ul>
            <li onClick={() => navigate('/')  } >  <span className="menu-nav"> App Todo</span> </li>
            <li onClick={() => navigate('/login')  }> <span className="menu-nav"> Login</span> </li>
            </ul>

            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>

          {Object.keys(dataUser).length ?
            <div className="flex">
              <div>
                <img height='50px' src={dataUser.image} />
              </div>
              <div>{dataUser.firstName}</div>
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
