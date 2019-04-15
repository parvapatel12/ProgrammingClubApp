import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Blog.css";

import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import firebase from "firebase";

class AddBlog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "Deep",
      title: "",
      content: " ",
      upvote: ["__S"],
      downvote: ["__D"],
      taglist: [],
      commentlist: [],
      editorState: EditorState.createEmpty(),
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      currtag: " "
    };
    this.blogRef = firebase
      .database()
      .ref()
      .child("blog_entry");
    this.ref = firebase
      .database()
      .ref()
      .child("blogid");

    var currid = 0;

    firebase
      .database()
      .ref()
      .child("blogid")
      .on(
        "value",
        function(snapshot) {
          currid = snapshot.val();
          console.log(currid);
        },
        function(error) {
          console.log("Error: " + error.code);
        }
      );
  }
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };
  handleChange_title(event) {
    this.setState({ title: event.target.value });
  }
  handleChange_content(event) {
    this.setState({ content: event.target.value });
  }
  handleChange_tag(event) {
    this.setState({ currtag: event.target.value });
  }

  handleSend() {
    var ref = firebase
      .database()
      .ref()
      .child("blogid");
    var currid = 0;

    firebase
      .database()
      .ref()
      .child("blogid")
      .on(
        "value",
        function(snapshot) {
          currid = snapshot.val();
          // console.log(currid);
        },
        function(error) {
          console.log("Error: " + error.code);
        }
      );

    console.log("currid" + currid);
    //  console.log(this.state.blogid);
    if (this.state.title) {
      var newItem = {
        id: 1e9 - currid,
        userName: this.state.userName,
        title: this.state.title,
        content: draftToHtml(
          convertToRaw(this.state.editorState.getCurrentContent())
        ),
        upvote: this.state.upvote,
        downvote: this.state.downvote,
        taglist: this.state.taglist,
        commentlist: this.state.commentlist,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };
      //      console.log('currid2' + currid);

      ref.transaction(function(currid) {
        return currid + 1;
      });

      //firebase.database().ref().update({blogid :currid});

      var item = this.blogRef.push();
      item.setWithPriority(newItem, 0 - Date.now());

      this.setState({ title: "" });
      this.setState({ content: "" });
      this.setState({ currtag: "" });
      this.setState({ taglist: [] });
    }
    this.props.history.push("/header/blogs");
  }

  handleAddTag() {
    this.state.taglist.push(this.state.currtag);
    this.setState({ currtag: "" });
  }

  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    this.handleSend();
  }

  handleKeyPressAddTag(event) {
    if (event.key !== "Enter") return;
    this.handleAddTag();
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <label>Title</label>
        <br />
        <input
          type="text"
          placeholder="Type title"
          onEditorStateChange
          value={this.state.title}
          onChange={this.handleChange_title.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        />
        <br />

        <label>Content</label>

        <Editor
          className="rich_text_own"
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <div>{this.state.taglist}</div> */}
        <br />

        <br />

        <label>Tags</label>
        <br />

        <input
          type="text"
          placeholder="add tag one by one and press enter"
          value={this.state.currtag}
          onChange={this.handleChange_tag.bind(this)}
          onKeyPress={this.handleKeyPressAddTag.bind(this)}
        />

        <button onClick={this.handleAddTag.bind(this)}>Add tag</button>

        <div>
          {this.state.taglist.map((item, index) => (
            <span>{item + "  "}</span>
          ))}
        </div>

        <button className="form__button" onClick={this.handleSend.bind(this)}>
          {" "}
          Submit
        </button>
      </div>
    );
  }
}

export default AddBlog;
