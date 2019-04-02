import React, { Component } from "react";
import "./Blog.css";
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';

import {WebView} from 'react-native';

export default class Blog extends Component {
  constructor(props) {
    super(props);
    //const contentBlock = htmlToDraft(this.props.message.content);
    this.state = {
      content: " ",
      upvote_count: 0,
      downvote_count: 0,
      curr_user: 'Sebastian',
      //contentState: ContentState.createFromBlockArray(contentBlock.contentBlocks)
    };

    //set curr_user here by prop
     this.count_votes();
  }
  count_votes()
  {
//     var listItems = numbers.map((number) =>
//   <li>{number}</li>
// );
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
        
        {/* <div data-container="wysiwyg"><RichTextEditor html={this.props.message.content}/></div> */}
        <WebView html={this.props.message.contest}/>

        <div>
        {this.props.message.taglist.map((item, index) => (
          < span>{item + "  "}</span> 
        ))

        }
      </div>

        {/* upvote downvote */}
        
        <button>Upvote : { this.props.message.upvote }       </button>  
        <button>Downvote : {this.props.message.downvote}</button>
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
