import React, { Component } from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
import { withCookies } from 'react-cookie';
import UserNav from './UserNav/UserNav'
import { withRouter } from 'react-router-dom';


class NavigationItems extends Component {


    render() {
        let userLoggedin = this.props.cookies.get('userLogin')
        // console.log(userLoggedin)
        let user = <NavigationItem link='/authenticate' >Login</NavigationItem>
        if(userLoggedin) {
            user = <UserNav active={this.props.location.pathname==="/me"} logout={this.props.logout}>{userLoggedin.username}  <i className="fas fa-angle-down"></i></UserNav>
        //     user = <Dropdown>
        //     <Dropdown.Toggle className={classes.DropdownToggle}>
        //       {userLoggedin.username}
        //     </Dropdown.Toggle>
          
        //     <Dropdown.Menu>
        //       <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        //       <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        //       <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        //     </Dropdown.Menu>
        //   </Dropdown>
        }
                                    
        return(
            <div className={classes.NavigationItems}>
                <NavigationItem link='/' exact>Home</NavigationItem>
                {user}
            </div>
        )
    }


};

export default withCookies(withRouter(NavigationItems))