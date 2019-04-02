import React, { Component } from "react";
import "./Blog.css";
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import firebase from "firebase";

//import {WebView} from 'react-native';

export default class Blog extends Component {
  constructor(props) {
    super(props);
    //const contentBlock = htmlToDraft(this.props.message.content);
    this.state = {
      content: " ",
      curr_user: 'Sebastian',
      upvoted:false,
      downvoted:false
      //contentState: ContentState.createFromBlockArray(contentBlock.contentBlocks)
    };

    this.calculate_vote();
    //console.log(this.);
    //set curr_user here by prop
  }
  
  calculate_vote()
  {
    this.state.upvoted= (this.props.message.upvote.includes(this.state.curr_user)) ? true : false;
    this.state.downvoted= (this.props.message.downvote.includes(this.state.curr_user)) ? true : false;
    this.state.upvoted=this.state.downvoted = (this.state.upvoted || this.state.downvoted);
  }
  
  handleUpvote() {
    
    if(this.state.downvoted) return;
    this.props.message.upvote.push(this.state.curr_user);
    // let blogRef=firebase
    // .database()
    // .ref()
    // .child('blog_entry/' + this.props.key);
    
    
  //  this.props.message.update({'upvote':this.props.message.upvote})
    this.setState({upvoted:true});
  }

  handleDownvote() {
    
    if(this.state.upvoted) return;
    this.props.message.downvote.push(this.state.curr_user);
    this.setState({downvoted:true});
  }

  handleChange_content(event) {
    this.setState({ content: event.target.value });
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
       
        <div>
        {this.props.message.taglist.map((item, index) => (
          < span>{item + "  "}</span> 
        ))

        }
      </div>

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

        
        <br></br>

        {/* comment */}
        <textarea
          type="textarea"
          placeholder="Type content"
          value={this.state.content}
          onChange={this.handleChange_content.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        />
        <button>Submit</button>
        
        <div className="myclass">{}</div>
      </div>
    );
  }
}
