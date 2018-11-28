import firebase, { firestore } from "firebase";

const config = {
  apiKey: "AIzaSyAFTpHYAgEZ6UxgAs4oJZq-N5cYtxXcIa4",
  authDomain: "personal-finance-8a87d.firebaseapp.com",
  projectId: "personal-finance-8a87d",
};

class Firebase {
  public db: firebase.firestore.Firestore;
  public auth: firebase.auth.Auth;

  constructor() {
    const app = firebase.initializeApp(config);
    this.db = app.firestore();
    this.auth = app.auth();
  }

  // *** Auth API *** 
  public doSignInWithGoogle = () =>
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider)

  public doSignOut = () =>
    this.auth.signOut()

  // *** User API *** 

  public createUser = (user: any) => this.db.collection("users")
    .add(user)
    // tslint:disable-next-line:no-console
    .catch(error => console.log(error))
}

export default Firebase;