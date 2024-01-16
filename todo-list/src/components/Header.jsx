const Header = ({dataUser}) => {
    
    console.log(dataUser);

    return (
    <>
      <header>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand">Navbar</a>
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

            <div className="flex">
              <div>
                <img height='50px' src={dataUser.image} />
              </div>
              <div>{dataUser.firstName}</div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
