import React, { Component } from "react";
import "./Blog.css";
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import firebase from "firebase";

//import {WebView} from 'react-native';

class Reply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: " ",
      curr_user: 'Sebastian',
      curr_id:0,
      commentobj:0,
    };

   // console.log("hello");

    //this.getobj();

  }

//  async getobj()
//   {
//     var tempid=this.props.message;
//     var temp_obj;
//     var curr_key;


//     var query = firebase.database().ref("reply_list").orderByKey();
   
//    await query.once("value")
//   .then(function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {

//       var childData = childSnapshot.val();

//       //console.log(childData.id);
//       if(childData.id==tempid)
//       {
//         curr_key=childSnapshot.key;
//         temp_obj=childData;
//       }
//   });
// });

// this.setState({commentobj:temp_obj});
// //console.log(this.commentobj);
// }


  handleChange_content(event) {
    this.setState({ content: event.target.value });
  }
  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    this.handleSend();
  }
  render() {
    return (

      
      <div>
        <div> UserName : {this.props.message.userName}</div>
        <br></br>
        <div dangerouslySetInnerHTML={{__html: this.props.message.content}} />
      </div>
        
      
    );
  }
}
export default Reply;