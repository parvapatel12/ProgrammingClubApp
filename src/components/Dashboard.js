import React, { Component } from "react";

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <div style={left}>
          <h2>Recommendations</h2>
          <p>Here are the recommendations</p>
        </div>
        <div style={right}>
          <h2>Topics</h2>
          <p>Here are the topics</p>
        </div>
      </div>
    );
  }
}

const left = {
  align: "left",
  padding: "3px",
  width: "40%",
  display: "inline-block"
};

const right = {
  padding: "3px",
  textAlign: "center",
  width: "40%",
  display: "inline-block"
};

export default Dashboard;
