import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import LandingPage from '../assets/Landing_Page.json';

const Home = () => {
  const style = {
    width: "100%",
    height: "auto",
  };

  return (
    <>
      <Lottie animationData={LandingPage} style={style} />
      <div className="container-fluid">
        <div className='row'>  
            <header className="jumbotron text-center mb-3 Myheader">
              <h1 className="display-4 fw-bold">Welcome to Our User Authentication App</h1>
              <p className="lead fw-bold">Securely manage your account with our authentication system.</p>
              <Link to="/registration" className="btn btn-primary btn-lg">Get Started</Link>
            </header>
            <section className="features text-center">
              <div className="row">
                <div className="col-md-4">
                  <div className="card mb-4">
                    <div className="card-body">
                      <h2 className="card-title">Secure Authentication</h2>
                      <p className="card-text">Protect your account with our secure authentication system.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card mb-4">
                    <div className="card-body">
                      <h2 className="card-title">Easy Registration</h2>
                      <p className="card-text">Register for an account quickly and easily.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card mb-4">
                    <div className="card-body">
                      <h2 className="card-title">Responsive Design</h2>
                      <p className="card-text">Our application is designed to work on all devices.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </div>
      </div>
    </>
  );
}

export default Home;
