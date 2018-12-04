import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Firebase, { FirebaseContext } from "./firebase";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { FirebaseSingleton } from "./firebase/context";

ReactDOM.render(
  <FirebaseContext.Provider value={FirebaseSingleton}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
