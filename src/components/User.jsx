import React, { Component } from "react";
import "../css/User.css";

class User extends Component {
  render() {
    const storedUsername = this.props.username;
    return (
      <div>
        <form className="userForm">
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
