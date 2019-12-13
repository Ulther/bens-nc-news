import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import Loading from "./Loading";
import "../css/SingleArticlePage.css";
import CommentsList from "./CommentsList";
import ArticleVotesCard from "./ArticleVotesCard";

class SingleArticlePage extends Component {
  state = { article: {}, isLoading: true };

  render() {
    const { article } = this.state;
    if (this.state.isLoading === true) {
      return <Loading />;
    }
    return (
      <div>
        <div className="singleArticleBlockMain">
          <p>
            <font className="singleArticleTitle">{article.title}</font>
          </p>
          <p>
            <font className="singleArticleBody">{article.body}</font>
          </p>
          <p>
            <font className="singleArticleAuthor">Written by: </font>
            <font className="singleArticleAuthorValue">{article.author}</font>
          </p>
          <p>
            <font className="singleArticleTopic">Topic: </font>
            <font className="singleArticleTopicValue">{article.topic}</font>
          </p>
          <p>
            <font className="singleArticleCreatedAt">Created: </font>
            <font className="singleArticleCreatedAtValue">
              {moment(article.created_at).format("MMMM Do YYYY, h:mm:ss a")}
            </font>
          </p>
        </div>
        <div className="singleArticleBlockVotes">
          <ArticleVotesCard
            article={article.article_id}
            votes={article.votes}
          />
        </div>
        <div className="singleArticleBlockComments">
          <CommentsList article={article.article_id} />
        </div>
      </div>
    );
  }

  getSingleArticle = () => {
    axios
      .get(
        `https://ulther-news-app.herokuapp.com/api/articles/${this.props.article_id}`
      )
      .then(({ data }) => {
        this.setState({ article: data.article, isLoading: false });
      });
  };

  componentDidMount = () => {
    this.getSingleArticle();
  };
}

export default SingleArticlePage;
