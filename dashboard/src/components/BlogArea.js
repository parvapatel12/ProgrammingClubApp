import React, { Component } from "react";
import Blog from "./Blog";
import Addcomment from "./Addcomment";

import firebase from "firebase";

class BlogArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "User",
      title: "",
      blogid:0,
      content: " ",
      upvote: 0,
      downvote: 0,
      taglist: [],
      commentlist: [],
      timestamp: 0,
      list: [],
      temp: [],
    };
    this.blogRef = firebase
      .database()
      .ref("blog_entry");
      
      this.listenBlogs();
      
  }


  
 listenBlogs() {
    this.blogRef.limitToLast(10).on("value", message => {
      this.setState({
        list: Object.values(message.val())
      });
    });
  }




  render() {
    return (
      <div>
        
        {this.state.list ? (   
          <div>      
         {this.state.list.map((item, index) => (
          <Blog key={index} message={item} />
        ))}
          </div>
      ) : (
        <div></div>
      )}
        
      </div>
    );
  }
}
const Mystyle = {
  padding: "50px"
};

export default BlogArea;
