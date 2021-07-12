import React, { Component } from "react";
import Post from "./../../Components/Post/Post";
import Axios from "axios";
import Spinner from "./../../Components/UI/Spinner/Spinner";
import SortBy from "./../../Components/SortBy/SortBy";
import CreatePostButton from "./../../Components/CreatePost/CreatePostButton";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import UserCard from "./../../Components/UserCard/UserCard";
import Aux from "./../../hoc/Auxilliary/Auxilliary";

// Axios.defaults.baseURL = 'http://localhost:9000'       //disable in prod.


class Posts extends Component {
  state = {
    posts: null,
    loading: true,
    sortby: "-createdAt",
    showUser: false,
    user: null,
  };

  componentDidMount() {
    console.log("cdm");
    Axios({
      method: "GET",
      url: `/social/posts${
        this.props.user ? `?user=${this.props.user}` : " "
      }`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log('succ')
        this.setState({ posts: res.data.data, loading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }


  // to get user when clicked
  userShowHandler = (id) => {
    if (id) {
      this.setState({ showUser: true });
      Axios.get(`/social/users/${id}`).then((res) => {
        if (res.data) {
          console.log(res.data.data);
          this.setState({ user: res.data.data });
        }
      });
    } else {
      this.setState({ showUser: false, user: null });
    }
  };

  optionChangeHandler = (event) => {
    let sortby;
    if (event.target.value === "createdAt") {
      sortby = event.target.value;
    } else {
      sortby = event.target.value + ",-createdAt";
    }
    this.setState({ loading: true });
    Axios({
      method: "GET",
      url: ` /social/posts?sort=${sortby}${
        this.props.user ? `&user=${this.props.user}` : " "
      }`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((res) => {
        this.setState({
          posts: res.data.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  createPostHandler = () => {
    this.props.history.push("/createPost");
  };

  modalShowHandler = () => {
    this.setState({
      modalShow: false,
    });
  };

  render() {
    // console.log(this.props.user)
    let posts = <Spinner />;
    let cookies = this.props.cookies;
    let userLoggedin = cookies.get("userLogin");
    let id = " ";
    if (userLoggedin) {
      id = userLoggedin.id;
    }

    if (!this.state.loading) {
      posts = this.state.posts.map((el) => {
        let userUpvote = false,
          userDownvote = false,
          userPost = false;
        // console.log(el)
        el.upvotes.forEach((e) => {
          // console.log(e)
          if (e._id === id) {
            userUpvote = true;
            // console.log('working')
          }
        });
        el.downvotes.forEach((e) => {
          // console.log(e)
          if (e._id === id) {
            userDownvote = true;
          }
        });
        if (el.user) {
          if (el.user._id === id) {
            userPost = true;
          }
        }

        return (
          <Post
            postId={el._id}
            title={el.title}
            content={el.content}
            createdBy={el.user ? el.user.username : "[deleted]"}
            date={el.createdAt}
            userClick={() => this.userShowHandler(el.user._id)}
            upvoteCount={el.upVoteCount}
            downvoteCount={el.downVoteCount}
            upvoted={userUpvote}
            downvoted={userDownvote}
            userPost={userPost}
          />
        );
      });
    }

    

    return (
      <div>
        {this.state.posts ? (
          this.state.posts.length >= 1 ? (
            <Aux>
              {this.props.history.location.pathname === "/" ? (
                <CreatePostButton clicked={this.createPostHandler} />
              ) : null}
              <SortBy optionChange={this.optionChangeHandler} />
            </Aux>
          ) : (
            <p style={{textAlign:"center"}}>No posts yet :(</p>
          )
        ) : null}
        {posts}
        {this.state.showUser ? (
          <UserCard
            clicked={() => this.userShowHandler(null)}
            user={this.state.user}
          />
        ) : null}
      
      </div>
    );
  }
}

export default withRouter(withCookies(Posts));
