import React from "react";
import classes from "./UserNav.module.css";


const userNav = (props) => {
  const toggleDropdown = () => {
    // document.getElementsByClassName("dropdownContent")[1].style.display = "block"
    if (
      document.getElementsByClassName("dropdownContent")[0].style.display !==
      "block"
    ) {
      document.getElementsByClassName("dropdownContent")[0].style.display =
        "block";
    } else {
      document.getElementsByClassName("dropdownContent")[0].style.display =
        "none";
    }
    if (
      document.getElementsByClassName("dropdownContent")[1].style.display !==
      "block"
    ) {
      document.getElementsByClassName("dropdownContent")[1].style.display =
        "block";
    } else {
      document.getElementsByClassName("dropdownContent")[1].style.display =
        "none";
    }
  };


  // attachedClasses = attachedClasses.join(' ')
  
  return (
    <div>
      <div className={classes.UserNav} style={props.active ? {backgroundColor: "white", color: "black"} : {backgroundColor: "black", color: "white"}} onClick={toggleDropdown}>
        {props.children}
      </div>
      <div
        className={classes.dropdownContent + " dropdownContent"}
        id="dropdown"
      >
        <a className={classes.profileLink} href='/me'>Profile</a>
        <p onClick={props.logout}>Log Out</p>
      </div>
    </div>
  );
};

export default userNav;
