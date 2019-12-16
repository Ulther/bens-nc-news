import React, { Component } from "react";
import axios from "axios";
import Loading from "./Loading";
import CommentCard from "./CommentCard";
import CommentAdder from "./CommentAdder";
import ViewToggler from "./ViewToggler";
import ErrorPage from "./ErrorPage";
import "../css/CommentsList.css";

class CommentsList extends Component {
  state = { comments: [], isLoading: true };

  render() {
    const { err } = this.state;
    if (err) return <ErrorPage err={err} />;
    if (this.state.isLoading === true) {
      return <Loading />;
    }
    return (
      <div>
        <CommentAdder article={this.props} addComment={this.addComment} />
        <ViewToggler className="commentListToggler">
          <ul className="commentUnorderedList">
            {this.state.comments.map(comment => {
              return (
                <CommentCard
                  comment={comment}
                  key={comment.comment_id}
                  getComments={this.getComments}
                  username={this.props.username}
                />
              );
            })}
          </ul>
        </ViewToggler>
      </div>
    );
  }

  addComment = newComment => {
    this.setState(currentState => {
      return { comments: [newComment, ...currentState.comments] };
    });
  };

  getComments = axiosUrl => {
    axios
      .get(
        `https://ulther-news-app.herokuapp.com/api/articles/${axiosUrl}/comments`
      )
      .then(({ data }) => {
        this.setState({ comments: data.comments, isLoading: false });
      })
      .catch(({ response }) => {
        this.setState({ err: { msg: response.data.msg || "Error" } });
      });
  };

  componentDidMount = () => {
    let axiosUrl = "";
    axiosUrl = this.props.article;
    this.getComments(axiosUrl);
  };
}

export default CommentsList;
