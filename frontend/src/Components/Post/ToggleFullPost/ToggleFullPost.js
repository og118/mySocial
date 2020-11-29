import React from 'react'
import classes from './ToggleFullPost.module.css'

const toggleFullPost = (props) => {
    return(
        <div className={classes.ToggleButton} onClick={props.togglePost}>
            {
                props.full ? (
                    <span>
                        <span>Read Less  </span> 
                        <i className='fas fa-angle-up'></i>
                    </span>
                ) : (
                    <span>
                        <span>Read More  </span> 
                        <i className='fas fa-angle-down'></i>
                    </span>
                )
            }
        </div>
    )
}

export default toggleFullPost;

