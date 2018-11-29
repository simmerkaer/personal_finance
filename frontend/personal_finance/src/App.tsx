import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/TopNavigation/Layout";
import Firebase from './firebase/firebase';
import { withAuthentication } from './session';

interface AppProps {
  firebase: Firebase;
}

interface AppState {
  authUser: any;
}

class App extends Component<AppProps, AppState> {
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

export default withAuthentication(App);
