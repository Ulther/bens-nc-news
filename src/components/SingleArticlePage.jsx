import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import CommentsList from "./CommentsList";
import ArticleVotesCard from "./ArticleVotesCard";
import "../css/SingleArticlePage.css";

class SingleArticlePage extends Component {
  state = { article: {}, isLoading: true };

  render() {
    const { err } = this.state;
    if (err) return <ErrorPage err={err} />;
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
          <CommentsList
            article={article.article_id}
            username={this.props.username}
          />
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
      })
      .catch(({ response }) => {
        this.setState({ err: { msg: response.data.msg || "Error" } });
      });
  };

  componentDidMount = () => {
    this.getSingleArticle();
  };
}

export default SingleArticlePage;
