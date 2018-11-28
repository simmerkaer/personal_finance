import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Firebase, { FirebaseContext } from './firebase';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <FirebaseContext.Consumer>
      {firebase => <App firebase={firebase} />}
    </FirebaseContext.Consumer>
  </FirebaseContext.Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
