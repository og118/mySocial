import React from 'react'
import classes from './DropDownButton.module.css'

const dropDownButton = (props) => {
    return(
    <button className={classes.DropButton} onClick={props.clicked}>{props.children}</button>
    )
}

export default dropDownButton;