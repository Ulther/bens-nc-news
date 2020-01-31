import React, { Component } from "react";
import axios from "axios";
import Loading from "./Loading";
import Sorter from "./Sorter";
import ArticleCard from "./ArticleCard";
import ErrorPage from "./ErrorPage";
import "../css/ArticlesList.css";

class ArticlesList extends Component {
  state = { articles: [], isLoading: true, sort_by: null, topic: null };

  getArticles = (topic, sort_by) => {
    if (sort_by === null) {
      return axios.get(`https://ulther-news-app.herokuapp.com/api/articles`, {
        params: { topic: topic, sort_by: sort_by }
      });
    } else {
      return axios.get(`https://ulther-news-app.herokuapp.com/api/articles`, {
        params: { topic: topic, sort_by: sort_by.sort_by }
      });
    }
  };

  sortArticles = sort_by => {
    if (sort_by !== this.state.sort_by) {
      this.setState({ sort_by: sort_by });
    }
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
      this.getArticles(topic, sort_by)
        .then(({ data }) => {
          this.setState({
            articles: data.articles,
            isLoading: false
          });
        })
        .catch(({ response }) => {
          this.setState({ err: { msg: response.msg || "Error" } });
        });
    }
  };

  render() {
    const { err } = this.state;
    if (err) return <ErrorPage err={err} />;
    if (this.state.isLoading === true) {
      return <Loading />;
    }
    return (
      <div className="articlesListPage">
        <Sorter sortArticles={this.sortArticles} topic={this.state.topic} />
        <ul className="articlesUnorderedList">
          {this.state.articles.map(article => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
        </ul>
      </div>
    );
  }
}

export default ArticlesList;
