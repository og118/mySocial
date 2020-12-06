import React, { Component } from "react";
import Toolbar from "./../Navigation/Toolbar/Toolbar";
import Aux from "../../hoc/Auxilliary/Auxilliary";
import SideDrawer from "./../Navigation/SideDrawer/SideDrawer";
import Axios from 'axios'
import Modal from "../UI/Modal/Modal";
import { withRouter } from 'react-router-dom'

class Layout extends Component {
  state = {
    showSideDrawer: false,
    showModal: false,
    modalMsg: null
  };

  logoutHandler = () => {
    Axios({
        method: "GET",
        url: '/social/users/logout',
        withCredentials: true,
    }).then((res) => {
        let cookies = this.props.cookies
        cookies.remove('userLogin')
        this.setState({
          showModal: true,
          modalMsg: 'Logged Out Successfully'
        })
        setTimeout(() => {
          this.props.history.push('/authenticate')
        }, 1000)

      }
    )
}

modalClosedHandler = () => {
  this.setState({
    showModal: false,
    modalMsg: null
  })   
}

  toggleSideBar = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        
        <Toolbar logout={this.logoutHandler} cookies={this.props.cookies} toggleSideBar={this.toggleSideBar}/>
        <SideDrawer cookies={this.props.cookies} open={this.state.showSideDrawer} />
        {this.props.children}
        <Modal show={this.state.showModal} clicked={this.modalClosedHandler} type='msgModal'>{this.state.modalMsg}</Modal>
      </Aux>
    );
  }
}

export default withRouter(Layout);
