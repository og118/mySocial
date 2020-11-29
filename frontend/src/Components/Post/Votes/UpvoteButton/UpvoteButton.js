import React from 'react'


const upvoteButton = (props) => {
    return(
        <span style={props.red ? {color: '#ff4500'} : {color: 'black'}} onClick={props.Vote}>
            <i className={'fas fa-arrow-up'}></i>
            <span> {props.upvotes}</span>
        </span>
        
    )
}
export default upvoteButton