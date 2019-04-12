import React, { Component } from "react";
import "./Blog.css";
//import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import firebase from "firebase";
import draftToHtml from 'draftjs-to-html';
//import Addreply from "./Addreply";
import Reply from "./Reply";

//import {WebView} from 'react-native';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: " ",
      curr_user: 'parvapatel12',
      curr_id: 1,
      editorState: EditorState.createEmpty(),
      commentobj: 0,
      viewreply: 0,
    };

    // console.log("hello");

    var currid = 0;



    this.getobj();

  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  async handleSendReply() {

    var currid = 0;
    var ref = firebase.database().ref().child('replyid');
    ref.on("value", function (snapshot) {
      currid = snapshot.val();
    }, function (error) {
      console.log("Error: " + error.code);
    });

    //  console.log(this.state.blogid);
    if (1) {
      var newItem = {
        // id:currid,
        userName: this.state.curr_user,
        content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
        // timestamp: firebase.database.ServerValue.TIMESTAMP, 
      };

      //   ref.transaction(function(currid) {
      //     return currid+1;
      //  });

      //firebase.database().ref().update({blogid :currid});




      var commentarray = (this.state.commentobj.replylist);
      // console.log(typeof commentarray);
      if (typeof commentarray === 'undefined') {
        commentarray = new Array(1).fill(newItem);
      }
      else
        commentarray.push(newItem);

      var tempid = this.state.commentobj.id;
      //console.log(typeof commentarray);
      var curr_key;

      var deep = this.state.commentobj;
      deep.replylist = commentarray;

      this.setState({ commentobj: deep });

      var reply_obj = this.state.commentobj;

      var query = firebase.database().ref("comment_list").orderByKey();

      await query.once("value")
        .then(function (snapshot) {
          snapshot.forEach(function (childSnapshot) {

            var childData = childSnapshot.val();

            if (childData.id == tempid) {
              curr_key = childSnapshot.key;

              firebase.database().ref("comment_list").child(curr_key).set(
                {
                  id: reply_obj.id,
                  userName: reply_obj.userName,
                  content: reply_obj.content,
                  replylist: reply_obj.replylist,
                  timestamp: reply_obj.timestamp
                });
            }

            // id:currid,
            // userName: this.state.userName,
            // content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
            // replylist: this.state.replylist,
            // timestamp: firebase.database.ServerValue.TIMESTAMP   
          });
        });

      //firebase.database().ref().child("blog_entry").child(this.props.message.key);
      // this.setState({ title: '' });
      this.setState({ content: '' });
      this.setState({ editorState: EditorState.createEmpty() });
      var deep = this.state.commentobj;
      deep.replylist = commentarray;

      this.setState({ commentobj: deep });
    }

    this.setState({ viewreply: false });
  }



  async getobj() {
    var tempid = this.props.message;
    var temp_obj;
    var curr_key;


    var query = firebase.database().ref("comment_list").orderByKey();

    await query.once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {

          var childData = childSnapshot.val();
          console.log(tempid);
          if (childData.id == tempid) {
            curr_key = childSnapshot.key;
            temp_obj = childData;
          }
        });
      });



    this.setState({ commentobj: temp_obj });
    //console.log(this.commentobj);
  }

  handleAddreply(event) {
    this.setState({ viewreply: true });
  }

  // closeEditor(event)
  // {
  //   this.setState({})
  // }


  handleChange_content(event) {
    this.setState({ content: event.target.value });
  }
  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    this.handleSend();
  }
  render() {
    const { editorState } = this.state;
    return (

      (this.state.commentobj) ?
        (
          <div className="comment-main-2">

            <div className="comment-particular">
              <div className="comment-username">[{this.state.commentobj.userName}]</div>
              <div className="comment-content" dangerouslySetInnerHTML={{ __html: this.state.commentobj.content }} />

              <div className="reply-particular">
                {this.state.commentobj.replylist ? (
                  <div >
                    {this.state.commentobj.replylist.map(element =>
                      <Reply message={element} />)
                    }
                  </div>
                ) : (
                    <div>No replies yet</div>
                  )
                }
              </div>
              <div className="for-reply">
                <div className="reply-btn" onClick={this.handleAddreply.bind(this)}>(Reply to this comment)</div>
              </div>

            </div>
            {/*     <div className="partition-line-4"></div>      */}

            {this.state.viewreply ? (
              <div className="add-comment">
                <Editor
                  className="rich_text_own"
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}
                />
                {/* <div>{this.state.taglist}</div> */}
                
                {/* <button onClick={this.closeEditor}>Close Editor</button> */}

                <div
                  className="submit-comment-btn"
                  onClick={this.handleSendReply.bind(this)}
                > Submit Reply</div>
                <div className="for-space"></div>
              </div>

            ) : (
                <div></div>
              )}

            {/* {this.state.commentobj.replylist ? (
              <div >
                {this.state.commentobj.replylist.map(element =>
                  <Reply message={element} />)
                }
              </div>
            ) : (
                <div>No replies</div>
              )
            }
          */}
          </div>
        ) : (<div></div>)


    );
  }

}
export default Comment;