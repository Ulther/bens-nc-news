import React from "react";

const ErrorPage = props => {
  const { err } = props;
  return (
    <div>
      <p>
        <font>Error: {err.msg}</font>
      </p>
    </div>
  );
};

export default ErrorPage;
