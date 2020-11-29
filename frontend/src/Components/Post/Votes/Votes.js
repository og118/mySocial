import React, { Component } from 'react'
import UpvoteButton from './UpvoteButton/UpvoteButton'
import DownvoteButton from './DownvoteButton/DownvoteButton'
import classes from './Votes.module.css'

class Votes extends Component {
    render() {        
        return(
        <div className={classes.VoteCounter}>
            <span className={classes.Vote} onClick={this.props.upHandler} >
                <UpvoteButton red={this.props.up} upvotes={this.props.upvotes} /> 
            </span >

            <span className={classes.Vote} onClick={this.props.downHandler} >
                <DownvoteButton blue={this.props.down} downvotes={this.props.downvotes} />
            </span>
        </div>
        );
    }
}

export default Votes