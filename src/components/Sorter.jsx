// import React from "react";
import React, { Component } from "react";
import "../css/Sorter.css";

class Sorter extends Component {
  state = {
    sort_by: "created_at"
  };

  handleSort = event => {
    if (event.target.value !== this.state.sort_by) {
      this.setState({ sort_by: event.target.value });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.sortArticles(this.state);
  };

  render() {
    return (
      <div className="sorterSortBlock">
        <p className="sorterSubheader">Sort Articles:</p>
        <form className="sorterSortForm" onChange={this.handleSort}>
          <select className="sorterSortFormOptions">
            <option value="created_at">Most Recent</option>
            <option value="comments">Most Comments</option>
            <option value="votes">Highest Rating</option>
          </select>
        </form>
        <button
          className="sorterSortButton"
          type="submit"
          onClick={this.handleSubmit}
        >
          Sort
        </button>
      </div>
    );
  }
}

export default Sorter;
