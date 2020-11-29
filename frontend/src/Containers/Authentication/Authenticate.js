import React, { Component } from "react";
import Login from "./../../Components/Login/Login";
import Signup from "./../../Components/Signup/Signup";
import ForgotPassword from "./../../Components/ForgotPassword/ForgotPassword";
import {withRouter} from 'react-router-dom'

class Authenticate extends Component {
  state = {
    loginEmail: false,
    signup: false,
    forgotPassword: false,

  };


  loginEmailHandler = () => {
    this.setState((prevState) => {
      return { loginEmail: !prevState.loginEmail, forgotPassword: false };
    });
  };

  forgotPasswordHandler = () => {
      this.setState((prevState) => {
          return {forgotPassword: true}
      })
  }

  signupLoginToggleHandler = () => {
    this.setState((prevState) => {
      return { signup: !prevState.signup, forgotPassword: false};
    });
  };

  render() {

    if (this.state.signup) {
      return <Signup login={this.signupLoginToggleHandler} errormsg={this.props.errormsg} />;
    } else if(this.state.forgotPassword) {
        return <ForgotPassword signup={this.signupLoginToggleHandler} login={this.loginEmailHandler} errormsg={this.props.errormsg}/>
    }
    else {
      return (
        <Login
          loginEmail={this.loginEmailHandler}
          loginType={this.state.loginEmail ? "email" : "username"}
          signup={this.signupLoginToggleHandler}
          forgotPassword={this.forgotPasswordHandler}
          cookies = {this.props.cookies}
          errormsg={this.props.errormsg}
        />
      );
    }
  }
}

export default withRouter(Authenticate);
