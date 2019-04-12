import React, { Component } from "react";
import Blog from "./Blog";
//import Addcomment from "./Addcomment";
import "./Blog.css";

import { Link } from "react-router-dom";
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
      numofblogs:"5",
    };
    this.blogRef = firebase
      .database()
      .ref("blog_entry");
      
      this.listenBlogs();
      
  }


  
 listenBlogs() {
   

    this.blogRef.orderByPriority().limitToFirst(20).on("value", message => {
      this.setState({
        list: Object.values(message.val())
      });
    });


  }

  handleViewMore(event)
  {
    this.listenBlogs();
  }




  render() {
    return (
      <div className="blog-main-page">

        <div className="name">Blogs</div>

          <Link to="/addblog" className="Add-Blog-button">
              +
              </Link>
        
        {this.state.list ? (   
          <div>      
         {this.state.list.map((item, index) => (
          <Blog key={index} message={item} />
        ))}
          </div>
      ) : (
        <div></div>
      )}
      <button onClick={this.handleViewMore.bind(this)}>View More</button>  
      
      </div>
    );
  }
}


export default BlogArea;
