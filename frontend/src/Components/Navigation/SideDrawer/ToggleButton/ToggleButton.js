import React from 'react';
import classes from './ToggleButton.module.css'

const ToggleButton = (props) => {
    return(
        <div className={classes.MenuIcon} onClick={props.clicked}>
            <div className={classes.MenuIconBar}></div>       
            <div className={classes.MenuIconBar}></div>
            <div className={classes.MenuIconBar}></div>
        </div>        
    )
}

export default ToggleButton
