import React, { Component } from "react";
import classes from "./EditPost.module.css";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";

class editPost extends Component {
  state = {
    status: null,
    updated: null,
    loading: null,
    title: null,
    content: null
  };

  componentDidMount() {
    const { match: { params } } = this.props;
    console.log(params.id)
    Axios({
        method: "GET",
        url: `http://localhost:9000/social/posts/${params.id}`,
        headers: {
            "Content-Type": "application/json"
          },
        withCredentials: true
        }).then(res => {
            console.log(res.data.data)
            this.setState({
                title: res.data.data.title,
                content: res.data.data.content
            })
        }).catch(err => {
            console.log(err);
        });
}

  updatePostHandler = (event) => {
    const { match: { params } } = this.props;

    this.setState({loading: true})
    event.preventDefault();
    // console.log(document.getElementsByName("title")[0].value);
    let title = document.getElementsByName("title")[0].value;
    let content = document.getElementsByName("content")[0].value;

    Axios({
      method: "PATCH",
      url: `http://localhost:9000/social/posts/${params.id}`,
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
        this.setState({ status: "Post updated Successfully", updated: true, loading: false, title: title, content: content });
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
            updated: false,
            loading: false
          });
        }
      }
    });
  };
  render() {
    let attachedClasses = [];
    if (this.state.updated) {
      attachedClasses.push(classes.Green);
    } else {
      attachedClasses.push(classes.Red);
    }
    return (
      <div className={classes.CreatePost}>
        {this.state.loading ? <Spinner/> : (<form className={classes.form}><label>Edit Post</label>
          <hr></hr>
        <input name="title" defaultValue={this.state.title}></input>
          <textarea
            name="content"
            defaultValue={this.state.content}
          ></textarea>
          <p className={attachedClasses.join(" ")}>{this.state.status}</p>
          <button onClick={this.updatePostHandler}>Edit</button>
          
        </form>)}
      </div>
    );
  }
}

export default withRouter(editPost);
