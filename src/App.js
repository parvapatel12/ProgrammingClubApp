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

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import TutorialArea from "./components/TutorialArea";
import TutorialPage from "./components/TutorialPage";
import AddTutorial from "./components/AddTutorial";


firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" style={Appstyle}>
          <div className="contain">
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
            <Route
              exact
              path="/Tutorial"
              render={props => (
                <React.Fragment>
                  <AddTutorial />
                  <TutorialArea />
                </React.Fragment>
              )}
            />
            <Route
              path="/Tutorial/:id"
              render={props => (
                <React.Fragment>
                  <TutorialPage {...props}/>
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
