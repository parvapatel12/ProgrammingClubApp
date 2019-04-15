import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router";
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  handleonClick = () => {
    firebase.auth().signOut();
    this.setState({ redirect: true });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <button onClick={this.handleonClick}>Logout</button>
        <React.Fragment>
          <h3>This Application is built by the members of Group 33.</h3>
        </React.Fragment>
      </div>
    );
  }
}
export default About;
