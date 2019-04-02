import React, { Component } from "react";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


import firebase from "firebase";


class AddBlog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'Sebastian',
      title: '',
      content: ' ',
      upvote: ["__S"],
      downvote: ["__D"],
      taglist: [],
      commentlist: [],
      editorState: EditorState.createEmpty(),
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      currtag: ' ',
    };
    this.blogRef = firebase.database().ref().child('blog_entry');
  }
  onEditorStateChange = (editorState) => {
    console.log(editorState);
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
  handleChange_tag(event) {
    this.setState({ currtag: event.target.value });
  }

  handleSend() {
    
    if (this.state.title ) {
      var newItem = {
        userName: this.state.userName,
        title: this.state.title,
        //content: this.state.content,
        content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
        upvote: this.state.upvote,
        downvote: this.state.downvote,
        taglist: this.state.taglist,
        commentlist: this.state.commentlist,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };

      this.blogRef.push(newItem);
      this.setState({ title: '' });
      this.setState({ content: '' });
      this.setState({ currtag: '' });
      this.setState({ taglist: [] });
    }
  }

  handleAddTag() {
    this.state.taglist.push(this.state.currtag);
    this.setState({ currtag: '' });
  }

  handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    this.handleSend();
  }

  handleKeyPressAddTag(event) {
    if (event.key !== 'Enter') return;
    this.handleAddTag();
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <label>Title</label>
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
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
          {/* <div>{this.state.taglist}</div> */}
          <br></br>

        <br></br>

        <label>Tags</label>
        <br></br>

        <input type="text"
          placeholder="add tag one by one and press enter"
          value={this.state.currtag}
          onChange={this.handleChange_tag.bind(this)}
          onKeyPress={this.handleKeyPressAddTag.bind(this)}
        ></input>

          <button onClick={this.handleAddTag.bind(this)} >Add tag</button>

          <div>
            {this.state.taglist.map((item, index) => (
              < span>{item + "  "}</span>
            ))
            }
          </div>
         
          <button
            className="form__button"
            onClick={this.handleSend.bind(this)}
          > Submit</button>
          </div>
    );
  }
}

export default AddBlog;
