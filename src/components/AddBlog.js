import React, { Component } from "react";

import firebase from "firebase";

class AddBlog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "Sebastian",
      title: "",
      content: " ",
      upvote: 0,
      downvote: 0,
      taglist: [],
      commentlist: [],
      timestamp: firebase.database.ServerValue.TIMESTAMP
    };
    this.blogRef = firebase
      .database()
      .ref()
      .child("blog_entry");
  }

  handleChange_title(event) {
    this.setState({ title: event.target.value });
  }
  handleChange_content(event) {
    this.setState({ content: event.target.value });
  }

  handleSend() {
    if (this.state.title && this.state.content) {
      var newItem = {
        userName: this.state.userName,
        title: this.state.title,
        content: this.state.content,
        upvote: this.state.upvote,
        downvote: this.state.downvote,
        taglist: this.state.taglist,
        commentlist: this.state.commentlist,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };

      this.blogRef.push(newItem);
      this.setState({ title: "" });
      this.setState({ content: "" });
    }
  }

  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    this.handleSend();
  }

  render() {
    return (
      <div>
        <label>Title</label>
        <br />
        <input
          type="text"
          placeholder="Type title"
          value={this.state.title}
          onChange={this.handleChange_title.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        />
        <br />

        <label>Content</label>
        <br />
        <textarea
          type="textarea"
          placeholder="Type content"
          value={this.state.content}
          onChange={this.handleChange_content.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        />
        <br />
        <button className="form__button" onClick={this.handleSend.bind(this)}>
          {" "}
          Submit
        </button>
      </div>
    );
  }
}

export default AddBlog;
