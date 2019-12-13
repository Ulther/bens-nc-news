import React, { Component } from "react";
import axios from "axios";

class CommentVotesCard extends Component {
  state = { votes: "", voteDifference: 0 };

  patchVotes = voteChange => {
    return axios
      .patch(
        `https://ulther-news-app.herokuapp.com/api/comments/${this.props.comment}`,
        { inc_votes: voteChange }
      )
      .then(({ data }) => {
        console.log("Total votes: ", data.comment.votes);
        return data.comment;
      });
  };

  handleVote = voteChange => {
    this.patchVotes(voteChange).then(() => {
      this.setState(currentState => {
        return { voteDifference: currentState.voteDifference + voteChange };
      });
    });
  };

  render() {
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
}

export default CommentVotesCard;
