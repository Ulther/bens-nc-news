import React from "react";
import { Link } from "@reach/router";
import "../css/ArticleCard.css";

const ArticleCard = props => {
  const { article } = props;
  return (
    <li className="articleCardListItems">
      <Link className="articleCardLink" to={`/article/${article.article_id}`}>
        <p>
          <font className="articleCardTitle">{article.title}</font>
        </p>
        <p>
          <font className="articleCardAuthor">Author: </font>
          <font className="articleCardAuthorValue">{article.author}</font>
        </p>
        <p>
          <font className="articleCardTopic">Topic: </font>
          <font className="articleCardTopicValue">{article.topic}</font>
        </p>
        <p>
          <font className="articleCardVotes">Votes: </font>
          <font className="articleCardVotesValue">{article.votes}</font>
        </p>
      </Link>
    </li>
  );
};

export default ArticleCard;
