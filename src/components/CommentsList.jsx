import React, { Component } from "react";
import axios from "axios";
import Loading from "./Loading";
import CommentCard from "./CommentCard";
import CommentAdder from "./CommentAdder";
import ViewToggler from "./ViewToggler";
import "../css/CommentsList.css";

class CommentsList extends Component {
  state = { comments: [], isLoading: true };

  render() {
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
      });
  };

  componentDidMount = () => {
    let axiosUrl = "";
    axiosUrl = this.props.article;

    this.getComments(axiosUrl);
  };
}

export default CommentsList;
