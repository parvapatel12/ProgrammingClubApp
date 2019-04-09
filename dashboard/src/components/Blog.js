import React, { Component } from "react";
import "./Blog.css";
import Addcomment from "./Addcomment";
import Comment from "./Comment";

import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import firebase from "firebase";

//import {WebView} from 'react-native';

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: " ",
      curr_user: 'Jitesh',
      upvoted:false,
      downvoted:false,
      viewcomments:false,
      commentlist:false,
      comment_obj_list:[],
      curr_id:0,
    };

    this.calculate_vote();
  }
  

  calculate_vote()
  {
    this.state.upvoted= (this.props.message.upvote.includes(this.state.curr_user)) ? true : false;
    this.state.downvoted= (this.props.message.downvote.includes(this.state.curr_user)) ? true : false;
    
   // console.log(this.commentlist);
    
    // console.log(this.commentlist);
  //  this.state.upvoted=this.state.downvoted = (this.state.upvoted || this.state.downvoted);
  }
  
  handleUpvote() {
    
    if(this.state.downvoted) return;
    this.props.message.upvote.push(this.state.curr_user);

    var tempid=this.props.message.id;
    var upvotearray=this.props.message.upvote;
    var curr_key;

    var query = firebase.database().ref("blog_entry").orderByKey();
   
   query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      var childData = childSnapshot.val();
      
      if(childData.id==tempid)
      {
        curr_key=childSnapshot.key;
       // console.log(curr_key);
        firebase.database().ref().child("blog_entry").child(curr_key).update({upvote : upvotearray} );
        
      }
  });
});

    this.setState({upvoted:true});
  }

  handleDownvote() {
    
    if(this.state.upvoted) return;
    this.props.message.downvote.push(this.state.curr_user);

    var tempid=this.props.message.id;
    var downvotearray=this.props.message.downvote;
    var curr_key;

    var query = firebase.database().ref("blog_entry").orderByKey();
   
   query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      var childData = childSnapshot.val();
      
      if(childData.id==tempid)
      {
        curr_key=childSnapshot.key;
        //console.log(curr_key);
        firebase.database().ref().child("blog_entry").child(curr_key).update({downvote : downvotearray} );
        
      }
  });
});

    this.setState({downvoted:true});
  }

  handleChange_content(event) {
    this.setState({ content: event.target.value });
  }

  handleAddcomment(event) {
    this.setState({ viewcomments: true });
  }
  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    this.handleSend();
  }
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
        
        <div dangerouslySetInnerHTML={{__html: this.props.message.content}} />
           
        {/* // <div contenteditable="true"> {this.props.message.content} </div> */}
        {this.props.message.taglist ? (
         <div>
        
         {this.props.message.taglist.map((item, index) => (
           < span>{item + "  "}</span> 
         ))
 
         }
       </div>
      ) : (
        <div></div>
      )}
        

        {/* upvote downvote */}
        
        {this.state.upvoted ? (
         <button disabled className="upvoted_blog">Upvote : { (this.props.message.upvote.length)-1 }       </button>
      ) : (
        <button onClick={this.handleUpvote.bind(this)} >Upvote : { (this.props.message.upvote.length)-1 }       </button>
      )}
        {this.state.downvoted ? (
         <button disabled className="downvoted_blog">Downvote : { (this.props.message.downvote.length)-1 }       </button>
      ) : (
        <button onClick={this.handleDownvote.bind(this)}>Downvote : { (this.props.message.downvote.length)-1 }       </button>
      )} 

      <button onClick={this.handleAddcomment.bind(this)}> Comment </button>

        
        <br></br>

      
          
          { this.props.message.commentlist ? (
            <div >
        {this.props.message.commentlist.map(element=>
        <Comment message={element}/>)
        }  
      </div>
          ) : (                                                           
            <div>hudd</div>
          )
        }

              
          
    


        {this.state.viewcomments ? (   
          <div>      
         <Addcomment message={this.props.message}/>
         {/* <Comment message={this.state.commentlist}/> */}
          </div>
      ) : (
        <div></div>
      )}
        
        <button>Submit</button>
        
        <div className="myclass">{}</div>
      </div>
    );
  }
}
