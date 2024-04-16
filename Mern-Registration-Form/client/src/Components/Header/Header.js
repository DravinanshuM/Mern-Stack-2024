import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-12 col-md-12 col-12 p-0'>
          <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body fixed-top" data-bs-theme="dark">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/">ADVANCE CRUD</NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink className="nav-link active fw-bold" to="/">Home</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Header;