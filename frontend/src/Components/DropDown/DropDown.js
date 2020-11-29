import React, { Component } from "react";
import DropDownButton from "./DropDownButton.js/DropDownButton";
import classes from "./DropDown.module.css";

class DropDown extends Component {
  state = {
    show: false,
    btnClicked: false,
  };

  btnClickHandler = () => {
    this.setState({
      show: !this.state.show,
      btnClicked: !this.state.btnClicked,
    });
  };

  render() {
    return (
      <div className={classes.DropDown}>
        <DropDownButton clicked={this.btnClickHandler}>
          {this.props.button}
        </DropDownButton>

        {this.state.show ? (
            
          <div className={classes.Content}>
            <ul className={classes.Options}>{this.props.children}</ul>
          </div>
        ) : null}
      </div>
    );
  }
}

export default DropDown;
