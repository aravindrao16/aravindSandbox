import React from 'react';
import {BrowserRouter, Route} from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import Home from "./pages/home";
import Charts from "./pages/chartsPage"

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home}></Route>     
      <Route path="/charts" exact component={Charts}></Route> 
    </BrowserRouter>
  );
}

export default App;
