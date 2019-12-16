import React, { Component } from "react";
import "../css/Sorter.css";

class Sorter extends Component {
  // state = { sortBy: "", topic: "" };

  handleSubmit = event => {
    const sortValue = event.target.value;
    const topic = this.props.topic;
    event.preventDefault();
    this.props.getArticles(topic, sortValue);
  };

  render() {
    return (
      <div className="sorterSortBlock">
        <p className="sorterSubheader">Sort Articles:</p>
        <form className="sorterSortForm" onChange={this.handleSubmit}>
          <select className="sorterSortFormOptions">
            <option value="created_at">Most Recent</option>
            <option value="comments">Most Comments</option>
            <option value="votes">Highest Rating</option>
          </select>
        </form>
      </div>
    );
  }
}

export default Sorter;
