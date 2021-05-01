import React, { Component } from 'react';
import classes from './UpdateMe.module.css'
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import Spinner from "../../UI/Spinner/Spinner";
import Axios from "axios";

class updateMe extends Component {


  state = {
    updatedInfo: true,
    status: "",
    loading: null
  }

    updateInfo = (event) => {
      event.preventDefault();
    let name = document.getElementsByName("name")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let username = document.getElementsByName("username")[0].value;
    // let bio = document.getElementsByName("bio")[0].value
    this.setState({loading: true})

    Axios({
      method: "PATCH",
      url: `/social/users/updateMe`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: name,
        email: email,
        username: username,
        // bio: bio
      },
      withCredentials: true
    }).then((res) => {
      console.log("res recieved")
      if (res.data) {
        console.log(res.data);
        this.setState({
          updatedInfo: true,
          status: "Details Updated",
          loading: false
        });

        //MAKE updates in the site sidebar and cookies henceforth
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
        updatedInfo: false,
        status: this.props.errormsg.message,
        loading: false
      })
      document.getElementsByName('name')[0].value = name;
      document.getElementsByName('email')[0].value = email;
      document.getElementsByName('username')[0].value = username;
    }
  });
}
render(){
  let attachedClasses = [];
    if (!this.state.updatedInfo) {
      attachedClasses.push(classes.Red);
    } else {
      attachedClasses.push(classes.Green);    
    }

  let cookies=this.props.cookies;
  let defaultdata = cookies.get('userLogin');
    return(
        <div className={classes.loginpage}>
          
        <div className={classes.form}> {this.state.loading ? <Spinner/> : (
          <div>
          <p className={classes.Title}>Update Info</p>
          <form className={classes.loginform} id="loginForm">
            <input
              type="text"
              placeholder='name'
              name='name'
              defaultValue={defaultdata.name}
            />
            <input type="email" placeholder="email" name="email" defaultValue={defaultdata.email} />
            <input type="username" placeholder="username" name="username" defaultValue={defaultdata.username}/>

            <button onClick={this.updateInfo} >update info</button>
            <p className={attachedClasses.join(" ")}>{this.state.status}</p>
            <span class={classes.message}>Want to update Password? Click here</span>
          </form>
        </div>)}
      </div>
      </div>
    );
}

}
export default withRouter(withCookies(updateMe));
