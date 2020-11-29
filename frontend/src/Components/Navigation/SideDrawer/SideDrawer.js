import React from 'react';
import classes from './SideDrawer.module.css'
import NavigationItems from './../NavigationItems/NavigationItems'

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Hide];
    if(props.open) {
         attachedClasses = [classes.SideDrawer, classes.Show];
    }
    attachedClasses = attachedClasses.join(' ');
    return(
        <div className={attachedClasses}>
            <NavigationItems />
        </div>
    )
}

export default SideDrawer