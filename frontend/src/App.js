import React, { Component } from "react";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Posts from "./Containers/Posts/Posts";
import { Route } from "react-router-dom";
import Authenticate from "./Containers/Authentication/Authenticate";
import { withCookies } from "react-cookie";
import CreatePost from "./Components/CreatePost/CreatePost";
import errorHandler from "./hoc/ErrorHandler/ErrorHandler";
import EditPost from "./Components/EditPost/EditPost";
import UserPage from "./Components/UserPage/UserPage";
import UpdateMe from "./Components/UserPage/UpdateMe/UpdateMe";

class App extends Component {
  render() {
    return (
      
      <Layout cookies={this.props.cookies}>
        
        <Route
          path="/home"
          exact
          render={() => (
            <Posts
              cookies={this.props.cookies}

            />
          )}
        />

        <Route
          path="/authenticate"
          render={() => (
            <Authenticate
              cookies={this.props.cookies}
              errormsg={this.props.errormsg}
            />
          )}
        />

        <Route
          path="/createPost"
          render={() => (
            <CreatePost
              cookies={this.props.cookies}
              errormsg={this.props.errormsg}
            />
          )}
        />

        <Route
          path="/:id/edit"
          render={() => (
            <EditPost
              cookies={this.props.cookies}
              errormsg={this.props.errormsg}
            />
          )}
        />

        <Route
          path="/user_profile/:userId"
          render={() => (
            <UserPage
              cookies={this.props.cookies}
              errormsg={this.props.errormsg}
            />
          )}
        />

        <Route
          path="/user_profile/me"
          render={() => (
            <UserPage
              cookies={this.props.cookies}
              errormsg={this.props.errormsg}
            />
          )}
        />

        <Route path="/" exact render={() => <Posts />} />
        
        <Route
          path="/updateMe"
          render={() => (
            <UpdateMe
              cookies={this.props.cookies}
              errormsg={this.props.errormsg}
            />
          )}
        />

      </Layout>
    );
  }
}

export default withCookies(errorHandler(App));
