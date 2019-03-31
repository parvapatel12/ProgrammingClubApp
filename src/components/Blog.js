import React, { Component } from "react";
import "./Blog.css";

export default class Blog extends Component {
  render() {
    return (
      <div className="message">
        <span className="blog_title">{this.props.message.title}</span>
        <br />
        <span className="headerh3">By : </span>
        <span className="blog_author">{this.props.message.userName}</span>

        <span className="blog_time">
          {" "}
          {new Date(this.props.message.timestamp).toLocaleDateString()}
        </span>
        <span className="blog_time">
          {" "}
          {new Date(this.props.message.timestamp).toLocaleTimeString()}
        </span>
        <br />
        <br />
        <br />

        <div className="blog_content">{this.props.message.content}</div>
        <div className="myclass">{}</div>
      </div>
    );
  }
}
