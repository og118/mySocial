import React, { Component } from "react";
import classes from "./CreatePost.module.css";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";

class createPost extends Component {
  state = {
    status: null,
    created: null,
    loading: null
  };
  createPostHandler = (event) => {
    this.setState({loading: true})
    event.preventDefault();
    // console.log(document.getElementsByName("title")[0].value);
    let title = document.getElementsByName("title")[0].value;
    let content = document.getElementsByName("content")[0].value;

    Axios({
      method: "POST",
      url: `/social/posts`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        title: title,
        content: content,
      },
      withCredentials: true,
    }).then((res) => {
      if (res.data) {
        console.log(res.data.data);
        this.setState({ status: "Post created Successfully", created: true, loading: false });
        setTimeout(() => {
          this.props.history.push("/");
        }, 1000);
      } else {
        let errmsg, errors;
        if (this.props.errormsg.error) {
          if (this.props.errormsg.error.errors) {
            errmsg = Object.keys(this.props.errormsg.error.errors);
            errors = [];
            errmsg.map((el) =>
              errors.push(
                this.props.errormsg.error.errors[el].properties.message
              )
            );
            errors = errors.join(", ");
            this.props.errormsg.message = errors;
          }
          // console.log(res.response.data.message)
          this.setState({
            status: this.props.errormsg.message,
            created: false,
            loading: false
          });
        }
      }
    });
  };
  render() {
    let attachedClasses = [];
    if (this.state.created) {
      attachedClasses.push(classes.Green);
    } else {
      attachedClasses.push(classes.Red);
    }
    return (
      <div className={classes.CreatePost}>
        {this.state.loading ? <Spinner/> : (<form className={classes.form}><label>Create a Post</label>
          <hr></hr>
          <input placeholder="Title" name="title"></input>
          <textarea
            placeholder="Your ideas and thoughts go here"
            name="content"
          ></textarea>
          <p className={attachedClasses.join(" ")}>{this.state.status}</p>
          <button onClick={this.createPostHandler}>Post</button>
          
        </form>)}
      </div>
    );
  }
}

export default withRouter(createPost);
