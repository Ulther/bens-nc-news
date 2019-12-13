import React from "react";
import { Link } from "@reach/router";
import "../css/Navigation.css";
import User from "./User";

const Navigation = props => {
  return (
    <nav className="navigationBar">
      <div className="navigationBlock">
        <Link className="navigationLink" to="/">
          Home
        </Link>
        <div className="dropdown">
          <button className="dropbtn">
            Topics
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <Link className="dropdownLink" to="/articles">
              All Articles
            </Link>
            <Link className="dropdownLink" to="/articles?topic=coding">
              Coding
            </Link>
            <Link className="dropdownLink" to="/articles?topic=cooking">
              Cooking
            </Link>
            <Link className="dropdownLink" to="/articles?topic=football">
              Football
            </Link>
          </div>
        </div>
      </div>
      <div className="userBlock">
      <div className="navigationBarUser">
        <User username={props.username} />
      </div>
      </div>
    </nav>
  );
};

export default Navigation;
