import React, { Component } from "react";

class sample extends Component {
  constructor(props) {
    this.state = {
      id: 1,
    };
  }

  render() {
    return <div>{this.state.id}</div>;
  }
}

export default sample;
