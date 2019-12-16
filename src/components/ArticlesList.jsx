import React, { Component } from "react";
import axios from "axios";
import Loading from "./Loading";
import Sorter from "./Sorter";
import ArticleCard from "./ArticleCard";
import ErrorPage from "./ErrorPage";
import "../css/ArticlesList.css";

class ArticlesList extends Component {
  state = { articles: [], isLoading: true, sortBy: null, topic: null };

  render() {
    const { err } = this.state;
    if (err) return <ErrorPage err={err} />;
    if (this.state.isLoading === true) {
      return <Loading />;
    }
    return (
      <div className="articlesListPage">
        <Sorter
          getSortedArticles={this.getSortedArticles}
          topic={this.state.topic}
        />
        <ul className="articlesUnorderedList">
          {this.state.articles.map(article => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
        </ul>
      </div>
    );
  }

  getSortedArticles = (sort_by, topic) => {
    axios
      .get("https://ulther-news-app.herokuapp.com/api/articles", {
        params: { sort_by: sort_by, topic: topic }
      })
      .then(({ data }) => {
        this.setState({ articles: data.articles, isLoading: false });
      })
      .catch(({ response }) => {
        this.setState({ err: { msg: response.data.msg || "Error" } });
      });
  };

  getArticles = (axiosUrl, topicUrl) => {
    axios
      .get(`https://ulther-news-app.herokuapp.com/api/articles${axiosUrl}`)
      .then(({ data }) => {
        this.setState({
          articles: data.articles,
          isLoading: false,
          topic: topicUrl || ""
        });
      })
      .catch(({ response }) => {
        this.setState({ err: { msg: response.msg || "Error" } });
      });
  };

  componentDidMount = () => {
    const path = this.props.path;
    const search = this.props.location.search;
    let axiosUrl = "";
    let topicUrl = "";
    if (path === "/articles" && search === "?topic=coding") {
      axiosUrl = "?topic=coding";
      topicUrl = "coding";
    }
    if (path === "/articles" && search === "?topic=cooking") {
      axiosUrl = "?topic=cooking";
      topicUrl = "cooking";
    }
    if (path === "/articles" && search === "?topic=football") {
      axiosUrl = "?topic=football";
      topicUrl = "football";
    }
    this.getArticles(axiosUrl, topicUrl);
  };

  componentDidUpdate = prevProps => {
    const path = this.props.path;
    const search = this.props.location.search;
    let axiosUrl = "";
    let topicUrl = "";
    if (path === "/articles" && search === "?topic=coding") {
      axiosUrl = "?topic=coding";
      topicUrl = "coding";
    }
    if (path === "/articles" && search === "?topic=cooking") {
      axiosUrl = "?topic=cooking";
      topicUrl = "cooking";
    }
    if (path === "/articles" && search === "?topic=football") {
      axiosUrl = "?topic=football";
      topicUrl = "football";
    }
    if (prevProps.path !== path || prevProps.location.search !== search) {
      axios
        .get(`https://ulther-news-app.herokuapp.com/api/articles${axiosUrl}`)
        .then(({ data }) => {
          this.setState({ articles: data.articles, isLoading: false });
        });
      this.getArticles(axiosUrl, topicUrl);
    }
  };
}

export default ArticlesList;
