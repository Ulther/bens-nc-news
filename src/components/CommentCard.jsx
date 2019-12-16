import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import CommentVotesCard from "./CommentVotesCard";
import ErrorPage from "./ErrorPage";
import "../css/CommentCard.css";

class CommentCard extends Component {
  state = { err: null };
  render() {
    const { err } = this.state;
    if (err) return <ErrorPage err={err} />;
    const { comment } = this.props;
    return (
      <li className="commentCardListItems">
        <p>
          <font className="commentCardAuthor">{comment.author}</font>
        </p>
        <p>
          <font className="commentCardBody">{comment.body}</font>
        </p>
        <div className="commentVotes">
          <CommentVotesCard
            comment={comment.comment_id}
            votes={comment.votes}
          />
        </div>
        <p>
          <font className="commentCreatedAt">Created: </font>
          <font className="commentCreatedAtValue">
            {moment(comment.created_at)
              .startOf("second")
              .fromNow()}
          </font>
        </p>
        <p>
          <button onClick={this.handleDelete}>Delete Comment</button>
        </p>
      </li>
    );
  }

  handleDelete = () => {
    const commentAuthor = this.props.comment.author;
    const currentUser = this.props.username;
    if (commentAuthor === currentUser) {
      this.deleteComment(this.props.comment.comment_id);
    }
  };

  deleteComment = comment => {
    axios
      .delete(`https://ulther-news-app.herokuapp.com/api/comments/${comment}`)
      .then(() => {
        this.props.getComments(this.props.comment.article_id);
      })
      .catch(({ response }) => {
        this.setState({ err: { msg: response.data.msg || "Error" } });
      });
  };
}

export default CommentCard;
