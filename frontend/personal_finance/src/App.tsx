import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/TopNavigation/Layout";
import Firebase from './firebase/firebase';

interface AppProps {
  firebase: Firebase;
}

interface AppState {
  authUser: any;
}

class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  public componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  public render() {
    return (
      <>
        <CssBaseline />
        <Router>
          <div className="App">
            <Layout authUser={this.state.authUser} />
          </div>
        </Router>
      </>
    );
  }
}

export default App;
