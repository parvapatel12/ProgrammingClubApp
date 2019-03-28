import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Header extends Component {
  refreshPage = () => {
    window.location.reload();
  };
  render() {
    return (
      <div style={headerStyle}>
        <h1> Programming Club App </h1>
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

const headerStyle = {
  padding: "5px",
  textAlign: "center",
  color: "white",
  background: "Black",
  border: "solid 3px #ccc"
};
const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  padding: "15px"
};
const linkAlign = {
  textAlign: "center"
};

export default Header;
