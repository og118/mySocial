import React, { Component } from "react";
import Posts from "./../../Containers/Posts/Posts";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import Axios from "axios";
import classes from "./UserPage.module.css";
import userImg from "./../../assets/img/userImg.png";
import Spinner from "../UI/Spinner/Spinner";
import Aux from "./../../hoc/Auxilliary/Auxilliary";

class UserPage extends Component {
  state = {
    user: null,
    loading: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    const {
      match: { params },
    } = this.props;
    Axios({
      method: "GET",
      url: `${
        params.userId
          ? `/social/users/${params.userId}`
          : `/social/users/me`
      }`,
      withCredentials: true,
    }).then((res) => {
      console.log(res.data.data);
      this.setState({
        user: res.data.data,
        loading: false,
      });
    });
  }

  render() {
    let cookies = this.props.cookies;
    let userloggedIn = cookies.get("userLogin");
    const {
      match: { params },
    } = this.props;

    let updateInfo =  <button className={classes.UpdateInfo}>Update Info</button>;
    if(!userloggedIn) {
      updateInfo = null
    } else {
      if(this.state.user) {
        if(this.state.user._id === userloggedIn._id) {
          updateInfo = null
        } 
      }
      updateInfo = <a className={classes.UpdateInfo} href='/updateMe'>Update Info</a>
    }

    return (
      <Aux>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <div className={classes.UserPanel}>
              <div className={classes.userNameImg}>
                <img src={userImg} className={classes.img} width="180px" alt='user'></img>
                <p className={classes.Name}>
                  {this.state.user ? this.state.user.name : null}
                </p>
              </div>
              <div className={classes.Divider}></div>
              <div className={classes.UserInfo}>
                <p className={classes.Username}>
                  {this.state.user ? "u/" + this.state.user.username : null}
                </p>

                <span className={classes.Info}>
                  Joined{" "}
                  {this.state.user
                    ? new Date(this.state.user.createdAt).toDateString()
                    : null}
                  <br></br>
                </span>
                <span className={classes.Info}>
                  {" "}
                  {this.state.user ? this.state.user.posts.length : null} Posts
                  <br></br>
                </span>
                {updateInfo}
              </div>
            </div>
            <Posts user={this.state.user ? this.state.user._id : null} />
          </div>
        )}
      </Aux>
    );
  }
}

export default withRouter(withCookies(UserPage));
