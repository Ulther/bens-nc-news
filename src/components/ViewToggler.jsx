import React, { Component } from "react";

class ViewToggler extends Component {
  state = { showContent: false };

  toggleShowContent = () => {
    this.setState(currentState => {
      return { showContent: !currentState.showContent };
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleShowContent}>
          {this.state.showContent ? "Hide Comments" : "Show Comments"}
        </button>
        {this.state.showContent && this.props.children}
      </div>
    );
  }
}

export default ViewToggler;
