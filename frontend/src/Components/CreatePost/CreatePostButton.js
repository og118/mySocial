import React from 'react';
import classes from './CreatePostButton.module.css'

const createPostButton = (props) => {

        return(
            <div className={classes.Div}>
             <button class={classes.Button} onClick={props.clicked}> <i className="fas fa-pen"></i>  Post</button>
            </div>
        )


}

export default createPostButton;