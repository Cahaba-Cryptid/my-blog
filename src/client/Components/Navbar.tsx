import * as React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.SFC<IAppProps> = () => {
  return (
    <>
      <div className="text-white">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-item nav-link active" to="/newblog">Admin</Link>
            </div>
          </div>
        </nav>
      </div>

    </>
  )
};

interface IAppProps {

}

export default Navbar;