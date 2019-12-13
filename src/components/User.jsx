import React, { Component } from "react";
import "../css/User.css";

class User extends Component {
  render() {
    let storedUsername = this.props.username;
    return (
      <div>
        <form className="userForm">
          <label className="userFormUsername">
            Username:
            <input
              className="userFormUsernameInput"
              // value={"jessjelly"}
              type="text"
            ></input>
          </label>
          <div className="userFormButtonBlock">
            <button className="userFormButton">Login</button>
          </div>
          <div className="userFormText">
            <font>Logged in as: </font>
            <font className="userFormTextUsername">{`${storedUsername}`}</font>
          </div>
        </form>
      </div>
    );
  }
}

export default User;
