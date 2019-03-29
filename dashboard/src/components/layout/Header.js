import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Header.css';

export class Header extends Component {
  refreshPage = () => {
    window.location.reload();
  };
  render() {
    return (
      <div className="headerStyle">

        <div className="topbar">
          <img className="logo" src={require('../images/logo.png')} alt="logo"/>
          <div className="name">The Programming Club App</div>
          <div className="profile">
            <img className="dp" src={require('../images/avatar-01.jpg')} alt="logo"/>
            <div className="username">Parva</div>
          </div>
        </div>

        <div style={linkAlign}>
          <Link to="/" style={linkStyle}>
            Dashboard
          </Link>
        </div>
        |
        <div>
          <Link to="/blogs" style={linkStyle}>
            Blogs
          </Link>
        </div>
        |
        <div>
          <Link to="/calendar" style={linkStyle}>
            Calendar
          </Link>
          |
          <div>
            <Link to="/about" style={linkStyle}>
              About
            </Link>
          </div>
        </div>
      </div>  
    );
  }
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  padding: "15px"
};
const linkAlign = {
  textAlign: "center"
};

export default Header;
