import React from 'react' 
import classes from './SortBy.module.css'

const sortBy = (props) => {
    return( 
        <div className={classes.SortBy}>
            <span>
                <form className={classes.Options}>
                    <label><b>Sort by : </b></label>
                    <select onChange={props.optionChange}>
                        <option selected value="-createdAt">Time (newest first)</option>
                        <option value="createdAt">Time (oldest first)</option>
                        <option value="-upVoteCount">Upvotes</option>
                        <option value="-downVoteCount">Downvotes</option>
                    </select>
                </form>
            </span>
            
        </div>
        
    )
}

export default sortBy;