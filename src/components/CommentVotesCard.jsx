import React, { Component } from "react";
import axios from "axios";
import ErrorPage from "./ErrorPage";

class CommentVotesCard extends Component {
  state = { voteDifference: 0 };

  render() {
    const { err } = this.state;
    if (err) return <ErrorPage err={err} />;
    return (
      <div className="buttonsBlock">
        <p>
          <font className="singleArticleVotes">Score: </font>
          <font className="singleArticleVotesValue">
            {this.props.votes + this.state.voteDifference}
          </font>
        </p>

        <button
          className="upvoteButton"
          onClick={() => {
            this.handleVote(1);
          }}
        >
          Upvote
        </button>

        <button
          className="downvoteButton"
          onClick={() => {
            this.handleVote(-1);
          }}
        >
          Downvote
        </button>
      </div>
    );
  }

  patchVotes = voteChange => {
    return axios
      .patch(
        `https://ulther-news-app.herokuapp.com/api/comments/${this.props.comment}`,
        { inc_votes: voteChange }
      )
      .then(({ data }) => {
        return data.comment;
      })
      .catch(({ response }) => {
        this.setState({ err: { msg: response.data.msg || "Error" } });
      });
  };

  handleVote = voteChange => {
    this.patchVotes(voteChange).then(() => {
      this.setState(currentState => {
        return { voteDifference: currentState.voteDifference + voteChange };
      });
    });
  };
}

export default CommentVotesCard;
