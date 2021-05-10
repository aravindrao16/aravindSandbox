import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home";
import MediaControlCard from "./pages/chartsPage";
import YelpSearch from "./pages/yelpFusionSearch";
//import { VideoStream } from "./pages/videoStream";
import Navigation from "./components/MaterialUi/NavigationMUI";
import { userAuth } from "./redux/actions/index";
import { connect } from "react-redux";
import axios from "axios";
import Dashboard from "./components/MaterialUi/NavigationMUI";

class Nav extends Component {
  render() {
    return (
      <Navigation>
        <Route path="/" exact component={Home}></Route>
        <Route path="/charts" exact component={MediaControlCard}></Route>
        <Route path="/yelpSearch" exact component={YelpSearch}></Route>
      </Navigation>
    );
  }
}

class App extends Component {
  componentDidMount() {
    axios
      .get("/api/auth")
      .then((response) => {
        this.props.userAuth(response.data);
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
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

// class Nav extends Component {
//   render() {
//     return (
//       <div>
//         <Navigation>
//           <Route path="/" exact component={Home}></Route>
//           <Route path="/charts" exact component={MediaControlCard}></Route>
//           <Route path="/yelpSearch" exact component={YelpSearch}></Route>
//         </Navigation>
//       </div>
//     );
//   }
// }

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, { userAuth })(App);
