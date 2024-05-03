import React from 'react';
import "../App.css";
import "../css/HomePage.css"
import { Link } from 'react-router-dom';

function HomePage() {
  return (
      <div className="home-page">
        <h1>Salut my friend!</h1>
        <h2>You can login or create new account</h2>
        <div className="links">
          <Link to="/login" className="login">
            Login
          </Link>
          <Link to="/register" className="register">
            Register
          </Link>
        </div>
      </div>
  
  );
}

export default HomePage;

