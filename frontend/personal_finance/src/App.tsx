import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/TopNavigation/Layout";

class App extends Component {
  public render() {
    return (
      <>
        <CssBaseline />
        <Router>
          <div className="App">
            <Layout />
          </div>
        </Router>
      </>
    );
  }
}

export default App;
