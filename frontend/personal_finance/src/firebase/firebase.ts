import firebase, { firestore } from "firebase"

const config = {
  apiKey: "AIzaSyAFTpHYAgEZ6UxgAs4oJZq-N5cYtxXcIa4",
  authDomain: "personal-finance-8a87d.firebaseapp.com",
  projectId: "personal-finance-8a87d",
}

class Firebase {
  private db: firebase.firestore.Firestore;

  constructor() {
    const app = firebase.initializeApp(config);
    this.db = app.firestore();
  }

  // *** User API *** 

  public createUser = (user: any) => this.db.collection("users")
    .add(user)
    // tslint:disable-next-line:no-console
    .catch(error => console.log(error))
}

export default Firebase;