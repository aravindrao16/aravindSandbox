import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home";
import Charts from "./pages/chartsPage";
import { userAuth } from "./redux/actions/index";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    const details = {
      id: "abc123",
      name: "abc",
      email: "abc@gmail.com",
    };
    this.props.userAuth(details);
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Route path="/" component={Nav} />
        </BrowserRouter>
      </>
    );
  }
}

class Nav extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Home}></Route>
        <Route path="/charts" exact component={Charts}></Route>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, { userAuth })(App);
