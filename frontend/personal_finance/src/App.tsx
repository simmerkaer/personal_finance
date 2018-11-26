import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from "react";
import "./App.css";
import Layout from "./components/TopNavigation/Layout";

class App extends Component {
  public render() {
    return (
      <>
        <CssBaseline />
        <div className="App">
          <Layout />
        </div>
      </>
    );
  }
}

export default App;
