import React from 'react';
import classes from './UpdateMe.module.css'

const updateMe = (props) => {
    return(
        <div className={classes.loginpage}>
          
        <div className={classes.form}>
          <p className={classes.Title}>Update Info</p>
          <form className={classes.loginform} id="loginForm">
            <input
              type="text"
              placeholder='name'
              name='name'
            />
            <input type="email" placeholder="email" name="email" />
            <input type="username" placeholder="username" name="username" />

            <button >update info</button>
            <span class={classes.message}>Want to update Password? Click here</span>
          </form>
        </div>
      </div>
    )
}

export default updateMe;