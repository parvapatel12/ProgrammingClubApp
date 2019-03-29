import React, { Component } from "react";
import Header from "./components/layout/Header";
import About from "./components/pages/About";
import Dashboard from "./components/Dashboard";
//import Blogaddition from "./components/addBlog";
//import Calendar from "./components/Calendar";
import AddBlog from "./components/AddBlog";
import NewCalendar from "./components/NewCalendar";
import BlogArea from "./components/BlogArea";
import firebase from "firebase";
import firebaseConfig from "./components/config";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
//import Blogs from "./components/Blogs";

firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" style={Appstyle}>
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <Dashboard />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/blogs"
              render={props => (
                <React.Fragment>
                  <AddBlog />
                  <BlogArea />
                </React.Fragment>
              )}
            />
            <Route path="/calendar" component={NewCalendar} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}
const Appstyle = {
  padding: "0px",
  margin: "0px",
};

export default App;
