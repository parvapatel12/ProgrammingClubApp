import React, { Component } from "react";
import "./Blog.css";
import { Link } from "react-router-dom";

export default class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr_user: 'Parva'
    };
}


  
  render() {
    return (
      <div className="tag-bar">
             <div className="tags-name">   </div>
             <Link to={{ pathname:`/header/Discussion/${this.props.message}`, state: {...this.props} }}> {this.props.message} </Link>
           </div>

      );
  }
}
