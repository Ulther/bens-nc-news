import React, { Component } from "react";
import { Router } from "@reach/router";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import ArticlesList from "./components/ArticlesList";
import SingleArticlePage from "./components/SingleArticlePage";
import ErrorPage from "./components/ErrorPage";
import "./App.css";

class App extends Component {
  state = { username: "jessjelly" };

  render() {
    return (
      <div className="App">
        <Header />
        <Navigation username={this.state.username} />
        <Router primary={false}>
          <Homepage path="/" />
          <ArticlesList path="/articles" />
          <ArticlesList path="/articles/:topic" />
          <SingleArticlePage
            path="/article/:article_id"
            username={this.state.username}
          />
          <ErrorPage default />
        </Router>
      </div>
    );
  }
}

export default App;
