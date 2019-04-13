import React, { Component } from "react";
import Discussion from "./Discussion";
//import Addcomment from "./Addcomment";
import "./Blog.css";

import { Link } from "react-router-dom";
import firebase from "firebase";

class DiscussionArea extends Component {
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

        <div className="name">Discussion</div>

          <Link to="/addDiscussion" className="Add-Blog-button">
              +
          </Link>
        
        {this.state.list ? (   
          <div>      
         {this.state.list.map((item, index) => (
          <Discussion key={index} message={item} />
        ))}
          </div>
      ) : (
        <div> </div>
      )}
      <button onClick={this.handleViewMore.bind(this)}>View More</button>  
      
      </div>
    );
  }
}


export default DiscussionArea;
