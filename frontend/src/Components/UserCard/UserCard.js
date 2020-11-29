import React from "react";
import Modal from "../UI/Modal/Modal";
import userImg from "./../../assets/img/userImg.png";
import classes from "./UserCard.module.css";
import { withRouter } from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";

const userCard = (props) => {
  return (
    <div>
      <Modal clicked={props.clicked} show type="userCard">
        {!props.user ? (
          <Spinner />
        ) : (
          <div className={classes.UserCard}>
            <img src={userImg} width="80px" alt="user"></img>{" "}
            <hr style={{ width: "223px", marginLeft: "-17px" }}></hr>
            <p>{props.user.name}</p>
            <p>u/{props.user.username}</p>
            <p>{props.user.posts.length} Posts</p>
            <p>
              <a
                className={classes.Button}
                target="_blank"
                href={`/user/${props.user._id}`}
              >
                View Profile
              </a>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default withRouter(userCard);
