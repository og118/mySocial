import React, { Component } from "react";
import classes from "./Login.module.css";
import Axios from "axios";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    loggedIn: null,
    status: this.props.err ? "Please Log in to access this feature" : null,
    userId: null,
    username: null,
  };

  login = (event) => {
    event.preventDefault();
    let password = document.getElementsByName("password")[0].value;
    let userInfo = { email: null, username: null };
    userInfo[this.props.loginType] = document.getElementsByName(
      this.props.loginType
    )[0].value;
    console.log(password, userInfo);
    // let password = document.getElementsByName("password")[0].value;
    // userInfo[this.props.loginType] = document.getElementsByName(this.props.loginType)[0].value;
    // console.log(this.state, password, userInfo);

    Axios({
      method: "POST",
      url: `/social/users/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: userInfo.email,
        username: userInfo.username,
        password: password,
      },
      withCredentials: true,
    }).then((res) => {
      if (res.data) {
        console.log(res.data.data.username);
        this.setState({
          loggedIn: true,
          username: res.data.data.username,
          userId: res.data.data.id,
          status: "Log in successful",
        });
        let cookies = this.props.cookies;
        cookies.set("userLogin", res.data.data);
        setTimeout(() => {this.props.history.push("/")}, 1000)
        //  this.props.history.push("/")
      } else {
        this.setState({
          loggedIn: false,
          status: this.props.errormsg.message,
        });
      }
    });
  };

  render() {
    console.log(this.props);
    let attachedClasses = [];
    if (this.state.loggedIn) {
      attachedClasses.push(classes.Green);
    } else {
      attachedClasses.push(classes.Red);
    }

    return (
      <div className={classes.loginpage}>
        <div className={classes.form}>
          <form className={classes.loginform} id="loginForm">
            <input
              type="text"
              placeholder={this.props.loginType}
              name={this.props.loginType}
            />
            <input type="password" placeholder="password" name="password" />
            <button onClick={this.login}>login</button>
            <span class={attachedClasses.join(" ")}>
              {this.state.loggedIn === null ? " " : this.state.status}
            </span>
            <p className={classes.message} onClick={this.props.loginEmail}>
              Log-in with{" "}
              {this.props.loginType === "email" ? "username" : "email"}
            </p>
            <p className={classes.message} onClick={this.props.forgotPassword}>
              forgot Password?
            </p>
            <p className={classes.message} onClick={this.props.signup}>
              Not registered? Create an account
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
