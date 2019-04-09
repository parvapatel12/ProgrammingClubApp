import React, { Component } from "react";
import "./Blog.css";
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import firebase from "firebase";
import draftToHtml from 'draftjs-to-html';
import Addreply from "./Addreply";
import Reply from "./Reply";

//import {WebView} from 'react-native';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: " ",
      curr_user: 'Sebastian',
      curr_id:1,
      editorState: EditorState.createEmpty(),
      commentobj:0,
      viewreply:0,
    };

   // console.log("hello");

   var currid=0;

    

    this.getobj();

  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  async handleSendReply() {
    
    var currid=0;
    var ref=firebase.database().ref().child('replyid');
    ref.on("value", function(snapshot) {
      currid=snapshot.val();
   }, function (error) {
      console.log("Error: " + error.code);
   });

    

  //  console.log(this.state.blogid);
    if (1) {
       var newItem = {
      // id:currid,
        userName: this.state.userName,
        content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
      // timestamp: firebase.database.ServerValue.TIMESTAMP, 
       };

    //   ref.transaction(function(currid) {
    //     return currid+1;
    //  });
      
      //firebase.database().ref().update({blogid :currid});
      

      

    var commentarray=(this.state.commentobj.replylist);
   // console.log(typeof commentarray);
    if(typeof commentarray ==='undefined')
    {
    commentarray=new Array(1).fill(newItem);
    }
    else
    commentarray.push(newItem);
    
    var tempid=this.state.commentobj.id;
    //console.log(typeof commentarray);
    var curr_key;

    var query = firebase.database().ref("comment_list").orderByKey();
   
   await query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      var childData = childSnapshot.val();
      
      if(childData.id==tempid)
      {
        curr_key=childSnapshot.key;
        firebase.database().ref().child("comment_list").child(curr_key).update({replylist : commentarray} ); 
      }
  });
});

      //firebase.database().ref().child("blog_entry").child(this.props.message.key);
      // this.setState({ title: '' });
      this.setState({ content: '' });
      this.setState({editorState:EditorState.createEmpty()});
      var deep=this.state.commentobj;
      deep.replylist=commentarray;

      this.setState({commentobj:deep});
    }
  }



 async getobj()
  {
    var tempid=this.props.message;
    var temp_obj;
    var curr_key;


    var query = firebase.database().ref("comment_list").orderByKey();
   
   await query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      var childData = childSnapshot.val();
      console.log(tempid);
      if(childData.id==tempid)
      {
        curr_key=childSnapshot.key;
        temp_obj=childData;
      }
  });
});



this.setState({commentobj:temp_obj});
//console.log(this.commentobj);
}

handleAddreply(event) {
  this.setState({ viewreply: true });
}


  handleChange_content(event) {
    this.setState({ content: event.target.value });
  }
  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    this.handleSend();
  }
  render() {
    const { editorState } = this.state;
    return (

      
      <div>
        
        
          <div> UserName : {this.state.commentobj.Username}</div>
          
        
        <br></br>
        <div dangerouslySetInnerHTML={{__html: this.state.commentobj.content}} />
        <button onClick={this.handleAddreply.bind(this)}> Reply</button>

        {this.state.viewreply ? (   
          <div>   
            <Editor
            className="rich_text_own"
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
          {/* <div>{this.state.taglist}</div> */}
          <br></br>

        <br></br>       
         
          <button
            className="form__button"
            onClick={this.handleSendReply.bind(this)}
          > Submit Reply</button>
          </div>   
         
      ) : (
        <div></div>
      )}

   {/* { this.state.commentobj.replylist ? (
            <div >
        {this.state.commentobj.replylist.map(element=>
        <Reply message={element}/>)
        }  
      </div>
          ) : (                                                           
            <div>No replies</div>
          )
        } */}
      
      </div>
      
        
      
    );
  }

}
export default Comment;