import React, { Component } from "react";
import axios from "axios";
import Loading from "./Loading";
import Sorter from "./Sorter";
import ArticleCard from "./ArticleCard";
import "../css/ArticlesList.css";

class ArticlesList extends Component {
  state = { articles: [], isLoading: true, sortBy: null, topic: null };

  render() {
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
      });
  };

  componentDidMount = () => {
    let path = this.props.path;
    let search = this.props.location.search;
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
    let path = this.props.path;
    let search = this.props.location.search;
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
    if (
      prevProps.path !== this.props.path ||
      prevProps.location.search !== this.props.location.search
    ) {
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
