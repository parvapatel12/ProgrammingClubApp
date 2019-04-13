import React, { Component } from "react";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./Blog.css";

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


import firebase from "firebase";


class AddTutorial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'Deep',
      title: '',
      content: ' ',
      editorState: EditorState.createEmpty(),
      timestamp: firebase.database.ServerValue.TIMESTAMP,     
    };
    this.tutorialRef = firebase.database().ref().child('tutorial_entry');
    this.ref=firebase.database().ref().child('tutorialid');

    var currid=0;

    firebase.database().ref().child('tutorialid').on("value", function(snapshot) {
      currid=snapshot.val();
      console.log(currid);
   }, function (error) {
      console.log("Error: " + error.code);
   }); 

    
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  handleChange_title(event) {
    this.setState({ title: event.target.value });
  }
  handleChange_content(event) {
    this.setState({ content: event.target.value });
  }

 handleSend() {
    
    var ref=firebase.database().ref().child('tutorialid');
    var currid=0;

    firebase.database().ref().child('tutorialid').on("value", function(snapshot) {
      currid=snapshot.val();
     // console.log(currid);
   }, function (error) {
      console.log("Error: " + error.code);
   });

    

    console.log('currid'+ currid);
    if (this.state.title ) {
        var newItem = {
        id: 1e9-currid,
        userName: this.state.userName,
        title: this.state.title,
        content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
    };
//      console.log('currid2' + currid);

      ref.transaction(function(currid) {
        return currid+1;
     });
      
      
      var item=this.tutorialRef.push();
      item.setWithPriority(newItem,0-Date.now());

      this.setState({ title: '' });
      this.setState({ content: '' });
      this.setState({ currtag: '' });
      this.setState({ taglist: [] });
    }
  }


  handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    this.handleSend();
  }


  render() {
    const { editorState } = this.state;
    return (
      <div >
        <label >Title</label>
        <br></br>
        <input type="text"
          placeholder="Type title"onEditorStateChange
          value={this.state.title}
          onChange={this.handleChange_title.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        ></input>
        <br></br>

        <label>Content</label>
        
        <Editor
            className="rich_text_own"
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
        <br></br>

        <br></br>

         
        <button
            className="form__button"
            onClick={this.handleSend.bind(this)}
        > Submit  </button>
        </div>
    );
  }
}

export default AddTutorial;

