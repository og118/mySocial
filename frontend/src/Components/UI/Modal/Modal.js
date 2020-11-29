import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "./../Backdrop/Backdrop";
import Aux from "./../../../hoc/Auxilliary/Auxilliary";

const modal = (props) => {
   let modalClass = [];
   if(props.type === "msgModal") {
     modalClass.push(classes.Msg)
   } else if(props.type === "userCard") {
     modalClass.push(classes.UserCard)
   }
  return(
  <Aux>
    <Backdrop clicked={props.clicked} show={props.show} />
    <div
      className={modalClass}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
        {props.children}    
    </div>
  </Aux>
)};

export default modal;
