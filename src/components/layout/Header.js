import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Header.css';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
//import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'bootstrap';

export class Header extends Component {
  refreshPage = () => {
    window.location.reload();
  };
  render() {
    return (
      <div className="headerStyle">

        <div className="header-topbar">
          <img className="app-logo" src={require('../images/logo.png')} alt="logo"/>
          <div className="app-name">The Programming Club App</div>
          <div className="profile">
            <img className="dp" src={require('../images/avatar-01.jpg')} alt="logo"/>
            <div className="username">Parva</div>
          </div>
      
      {/*    <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>;
    */}  

        {/*
         <div className="account-wrap">
            <div className="account-item clearfix js-item-menu">
              <div className="image">
                <img className="dp" src={require('../images/avatar-01.jpg')} alt="Profile Photo"/>
              </div>
              
              <div className="content">
                <a className="js-acc-btn" href="#">Parva Patel</a>
              </div>
              
              <div className="account-dropdown js-dropdown">
                <div className="info clearfix">
                  <div className="image">
                    <a href="#">
                    <img className="dp" src={require('../images/avatar-01.jpg')} alt="Profile Photo"/>
                    </a>
                  </div>
                  <div className="content">
                    <h5 className="name">
                      <a href="#">Parva Patel</a>
                    </h5>
                    <span className="email">parvapatel12@gmail.com</span>
                  </div>
                </div>
  
                <div className="account-dropdown__body">
                  <div className="account-dropdown__item">
                    <a href="#">
                      <i className="zmdi zmdi-account"></i>Account
                    </a>
                  </div>

                  <div className="account-dropdown__item">
                    <a href="#">
                      <i className="zmdi zmdi-settings"></i>Settings
                    </a>
                  </div>

                  <div className="account-dropdown__item">
                    <a href="#">
                      <i className="zmdi zmdi-money-box"></i>Billing
                    </a>
                  </div>
                </div>
                
                <div className="account-dropdown__footer">
                  <a href="#">
                    <i className="zmdi zmdi-power"></i>Logout</a>
                </div>
              </div>
            </div>
          </div>
        */}

        </div>
      
      {/*    <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
      */}
        <div className="tabs">
          <Link to="/" className="linkStyle">
              Dashboard
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
