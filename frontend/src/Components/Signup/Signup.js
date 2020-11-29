import React, { Component } from "react";
import classes from "./Signup.module.css";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";
import { withCookies } from "react-cookie";

class signup extends Component {
  state = {
    signedUp: null,
    status: "",
    loading: null
  };
  signUp = (event) => {
    event.preventDefault();
    let name = document.getElementsByName("name")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let username = document.getElementsByName("username")[0].value;
    let password = document.getElementsByName("password")[0].value;
    let passwordConfirm = document.getElementsByName("confirmPassword")[0].value;
    // let bio = document.getElementsByName("bio")[0].value
    this.setState({loading: true})
    Axios({
      method: "POST",
      url: `http://localhost:9000/social/users/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: name,
        email: email,
        username: username,
        password: password,
        passwordConfirm: passwordConfirm,
        // bio: bio
      },
    }).then((res) => {
      console.log("res recieved")
      if (res.data) {
        console.log(res.data);
        this.setState({
          signedUp: true,
          status: "Account Created Successfully",
          loading: false
        });
        let cookies = this.props.cookies;
        cookies.set("userLogin", res.data.data);
  
        setTimeout(() => {
          this.props.history.push("/");
        }, 1000);
      } else {
        console.log(this.props.errormsg)
        let errmsg, errors;
        if (this.props.errormsg.error) {
          if(this.props.errormsg.error.errors) {
          errmsg = Object.keys(this.props.errormsg.error.errors);
          errors = [];
          errmsg.map((el) =>
            errors.push(this.props.errormsg.error.errors[el].properties.message)
          );
          errors = errors.join(", ");
          this.props.errormsg.message=errors
          }
        } 
        this.setState({
          signedUp: false,
          status: this.props.errormsg.message,
          loading: false
        })
        document.getElementsByName('name')[0].value = name;
        document.getElementsByName('email')[0].value = email;
        document.getElementsByName('password')[0].value = password;
        document.getElementsByName('confirmPassword')[0].value = passwordConfirm;
        document.getElementsByName('username')[0].value = username;
      }
      // } else if (res.response) {
      //   console.log(res.response.data);
      //   let errmsg, errors;
      //   if (res.response.data.error.errors) {
      //     errmsg = Object.keys(res.response.data.error.errors);
      //     errors = [];
      //     errmsg.map((el) =>
      //       errors.push(res.response.data.error.errors[el].properties.message)
      //     );
      //     errors = errors.join(", ");
      //   } else {
      //     errors = "Network Error";
      //   }
      // } else {
      //   this.setState({
      //     signedUp: false,
      //     status: "Network Error, Please try after a while"
      //   })
      // }
    })
    // .catch((err) => {
    //   console.log(err.response.data)
    //   let errmsg, errors;
    //   if(err.response.data.error.errors) {
    //    errmsg = Object.keys(err.response.data.error.errors)
    //    errors = []
    //    errmsg.map((el)=>
    //     errors.push(err.response.data.error.errors[el].properties.message)
    //   )
    //   errors = errors.join(', ')
    //   } else {
    //     errors = err.response.data.error
    //   }

    //   this.setState({
    //     signedUp: false,
    //     status: errors
    //   })
    // });

    // CHANGE SIGNUP STATE FROM AUTHENTICATE.JS WHEN U R DONE
  };
  render() {
    let attachedClasses = [];
    if (this.state.signedUp) {
      attachedClasses.push(classes.Green);
    } else {
      attachedClasses.push(classes.Red);
    }
    console.log(attachedClasses);
    return (
      <div className={classes.loginpage}>
        <div className={classes.form}>{this.state.loading ? <Spinner/> : (
          <form className={classes.registerform}>
            <input type="text" placeholder="name" name="name" />
            <input type="text" placeholder="email address" name="email" />
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="password" name="password" />
            <input
              type="password"
              placeholder=" confirm password"
              name=
              "confirmPassword"
            />
            {/* <textarea placeholder="Bio... (optional, will appear on your profile page)" name="bio"/> */}

            <button onClick={this.signUp}>create</button>
            <span class={attachedClasses.join(" ")}>{this.state.status}</span>
            <p className={classes.message} onClick={this.props.login}>
              Already registered? <span>Sign In</span>
            </p>
          </form>)}
        </div>
      </div>
    );
  }
}

export default withRouter(withCookies(signup));
