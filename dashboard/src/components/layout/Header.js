import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Header.css';
//import PropTypes from 'prop-types'
//import { DropdownButton, Dropdown } from 'react-bootstrap';
//import Dropdown from 'react-bootstrap/Dropdown';
//import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'bootstrap';
//import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';





export class Header extends Component {
  refreshPage = () => {
    window.location.reload();
  };




  //for drop down button starting here...
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {

    if (!this.dropdownMenu.contains(event.target)) {

      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });

    }
  }
  // till here...


  render() {
    return (
      <div className="headerStyle">

        <div className="header-topbar">
          <img className="app-logo" src={require('../images/logo.png')} alt="logo" />
          <div className="app-name">The Programming Club App</div>

          {/*  <div className="profile">
            <img className="dp" src={require('../images/avatar-01.jpg')} alt="logo" />
            <div className="username">Parva</div>
          </div>
    */}

          <div className="profile" onClick={this.showMenu}>
            <img className="dp" src={require('../images/avatar-01.jpg')} alt="profile" />
            <p className="username">Parva Patel</p>
            <p className="arrow-down">^</p>
            {
              this.state.showMenu
                ? (
                  <div
                    className="menu"
                    ref={(element) => {
                      this.dropdownMenu = element;
                    }}
                  >
                    <div className="dropitems-view-only">
                      <img className="dp-big" src={require('../images/avatar-01.jpg')} alt="profile" />
                      <div className="name-email">
                        <p className="username-big" >Parva Patel</p>
                        <p className="email-big">parvapatel12@gmail.com</p>
                      </div>
                    </div>
                    <div className="line"></div>
                    <div className="dropitems">Account</div>
                    <div className="dropitems">More</div>
                    <div className="dropitems">Logout</div>
                  </div>
                )
                : (
                  null
                )
            }
          </div>

        </div>


        <div className="tabs">
          <Link to="/" className="linkStyle">
            Dashboard
            </Link>

          <Link to="/" className="linkStyle">
            Tutorials
            </Link>

          <Link to="/blogs" className="linkStyle">
            Blogs
            </Link>

          <Link to="/calendar" className="linkStyle">
            Calendar
            </Link>

          <Link to="/about" className="linkStyle">
            About
            </Link>
        </div>
      </div>
    );
  }
}


export default Header;
