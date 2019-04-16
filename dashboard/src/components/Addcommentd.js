import React, { Component } from "react";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./Blog.css";

import draftToHtml from 'draftjs-to-html';
//import htmlToDraft from 'html-to-draftjs';


import firebase from "firebase";


class Addcommentd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'parvapatel12',
      content: ' ',
      parentblogid: 0,
      replylist: [],
      editorState: EditorState.createEmpty(),
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      commentlist: []
    };
    this.commentRef = firebase.database().ref().child('comment_list');
    this.ref = firebase.database().ref().child('commentid');

    var currid = 0;

    firebase.database().ref().child('commentid').on("value", function (snapshot) {
      currid = snapshot.val();
    }, function (error) {
      console.log("Error: " + error.code);
    });

    console.log(this.props.message.id);


  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };


  handleSend() {

    var currid;
    var ref = firebase.database().ref().child('commentid');
    ref.on("value", function (snapshot) {
      currid = snapshot.val();
    }, function (error) {
      console.log("Error: " + error.code);
    });



    //  console.log(this.state.blogid);
    if (1) {
      var newItem = {
        id: currid,
        userName: this.state.userName,
        content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
        replylist: this.state.replylist,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };

      ref.transaction(function (currid) {
        return currid + 1;
      });

      //firebase.database().ref().update({blogid :currid});


      this.commentRef.push(newItem);
      currid -= 1;
      var tempid = this.props.message.id;
      var commentarray = (this.props.message.commentlist);

      if (typeof commentarray === 'undefined') {
        commentarray = new Array(1).fill(currid);
      }
      else
        commentarray.push(currid);

      //console.log(typeof commentarray);
      var curr_key;

      var query = firebase.database().ref("discussion_entry").orderByKey();

      query.once("value")
        .then(function (snapshot) {
          snapshot.forEach(function (childSnapshot) {

            var childData = childSnapshot.val();
            console.log(tempid);
            if (childData.id == tempid) {
              curr_key = childSnapshot.key;
              firebase.database().ref().child("discussion_entry").child(curr_key).update({ commentlist: commentarray });
              window.location.reload();        
            }
          });
        });


      //firebase.database().ref().child("blog_entry").child(this.props.message.key);
      // this.setState({ title: '' });
      this.setState({ content: '' });
      this.setState({ editorState: EditorState.createEmpty() });
    }
    //  window.location.reload();
  }



  handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    this.handleSend();

  }


  render() {
    const { editorState } = this.state;
    return (
      <div className="add-comment">
        <Editor
          className="rich_text_own"
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <div>{this.state.taglist}</div> */}

        <div 
          className="submit-comment-btn"
          onClick={this.handleSend.bind(this)}
        >Submit Comment</div>
        <div className="for-space"></div>
      </div>
    );
  }
}

export default Addcommentd;
