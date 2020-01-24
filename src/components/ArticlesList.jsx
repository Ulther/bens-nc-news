import React, { Component } from "react";
import axios from "axios";
import Loading from "./Loading";
import Sorter from "./Sorter";
import ArticleCard from "./ArticleCard";
import ErrorPage from "./ErrorPage";
import "../css/ArticlesList.css";

class ArticlesList extends Component {
  state = { articles: [], isLoading: true, sort_by: null, topic: null };

  render() {
    const { err } = this.state;
    if (err) return <ErrorPage err={err} />;
    if (this.state.isLoading === true) {
      return <Loading />;
    }
    return (
      <div className="articlesListPage">
        <Sorter getArticles={this.getArticles} topic={this.state.topic} />
        <ul className="articlesUnorderedList">
          {this.state.articles.map(article => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
        </ul>
      </div>
    );
  }

  getArticles = (topicUrl, sort_by) => {
    return axios
      .get(`https://ulther-news-app.herokuapp.com/api/articles`, {
        params: { topic: topicUrl, sort_by: sort_by }
      })
      .then(({ data }) => {
        this.setState({
          articles: data.articles,
          isLoading: false,
          sort_by: sort_by || ""
        });
      })
      .catch(({ response }) => {
        this.setState({ err: { msg: response.msg || "Error" } });
      });
  };

  componentDidMount = () => {
    return axios
      .get(`https://ulther-news-app.herokuapp.com/api/articles`)
      .then(({ data }) => {
        this.setState({ articles: data.articles, isLoading: false });
      });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const topic = this.props.topic;
    const sort_by = this.state.sort_by;
    if (prevProps.topic !== topic || prevState.sort_by !== sort_by) {
      return axios
        .get(`https://ulther-news-app.herokuapp.com/api/articles`, {
          params: { topic: topic, sort_by: sort_by }
        })
        .then(({ data }) => {
          this.setState({
            articles: data.articles,
            topic: data.articles[0].topic,
            isLoading: false
          });
        });
    }
  };
}

export default ArticlesList;
