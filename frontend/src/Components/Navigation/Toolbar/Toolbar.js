import React from 'react'
import NavigationItems from './../NavigationItems/NavigationItems'
import classes from './Toolbar.module.css'
import ToggleButton from './../SideDrawer/ToggleButton/ToggleButton'

const toolbar = (props) => {

    return( 
        <div className={classes.Toolbar}>
            <div className={classes.Title}>
                mySocial.com
            </div>
            <nav className={classes.DesktopOnly} >
                <NavigationItems logout={props.logout} cookies={props.cookies} isLoggedIn={props.isLoggedIn} username={props.username}/>
            </nav>
            <ToggleButton clicked={props.toggleSideBar}/>
            
            
        </div>
    )
}

export default toolbar;