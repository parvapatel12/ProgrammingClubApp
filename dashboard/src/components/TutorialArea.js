import React, { Component } from "react";

import Addcomment from "./Addcomment";

import firebase from "firebase";
import Tutorial from "./Tutorial";

class TutorialArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "User",
      title: "",
      tutorialid:0,
      content: " ",
      timestamp: 0,
      list: [],
      temp: [],
      numoftutorial:"5",
    };
    this.tutorialRef = firebase
      .database()
      .ref("tutorial_entry");
      
     // this.listenTutorials();
      
  }


  
 listenTutorials() {
   

    this.tutorialRef.orderByPriority().limitToFirst(20).on("value", message => {
      this.setState({
        list: Object.values(message.val())
      });
    });


  }

  handleViewMore(event)
  {
    this.listenTutorials();
  }




  render() {
    return (
      <div>
        
        {this.state.list ? (   
          <div>      
              
         {this.state.list.map((item, index) => (
          <Tutorial key={index} message={item} />
          ))
         }
          </div>
      ) : (
        <div></div>
      )}
      <button onClick={this.handleViewMore.bind(this)}>View More</button>  
      </div>
    );
  }
}
const Mystyle = {
  padding: "50px"
};

export default TutorialArea;

