import React, { Component } from "react";
import "./Tutorials.css";

class TutorialPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this);
    return (
      <div>
        <h1>{this.props.match.params.id}</h1>
        <div className="temp"></div>
        <div dangerouslySetInnerHTML={{__html: this.props.location.state.message.content}} />
      </div>
    );
  }
}

const Mystyle = {
  padding: "50px"
};

export default TutorialPage;
