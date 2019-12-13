import React, { Component } from "react";
import axios from "axios";

class CommentAdder extends Component {
  state = { username: "", body: "" };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post(
        `https://ulther-news-app.herokuapp.com/api/articles/${this.props.article.article}/comments`,
        { username: "jessjelly", body: this.state.body }
      )
      .then(({ data }) => {
        this.props.addComment(data.comment);
        this.setState({ body: "" });
      });
  };

  render() {
    return (
      <form className="studentAdderForm">
        <p></p>
        <label>
          Comment:
          <input
            value={this.state.body}
            onChange={this.handleInput}
            name="body"
          ></input>
        </label>
        <p></p>
        <button onClick={this.handleSubmit}>Submit</button>
        <p></p>
      </form>
    );
  }
}

export default CommentAdder;
