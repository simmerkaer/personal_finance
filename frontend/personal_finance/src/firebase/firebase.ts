import firebase, { firestore } from "firebase";
import { User } from "../models/user";
import { Row } from "../components/ExpensesTable/ExpensesTable";

const config = {
  apiKey: "AIzaSyAFTpHYAgEZ6UxgAs4oJZq-N5cYtxXcIa4",
  authDomain: "personal-finance-8a87d.firebaseapp.com",
  projectId: "personal-finance-8a87d"
};

const settings = { timestampsInSnapshots: true };

class Firebase {
  public db: firebase.firestore.Firestore;
  public auth: firebase.auth.Auth;

  constructor() {
    const app = firebase.initializeApp(config);
    this.db = app.firestore();
    this.db.settings(settings);
    this.auth = app.auth();
  }

  // *** Auth API ***
  public doSignInWithGoogle = () =>
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  public doSignOut = () => this.auth.signOut();

  // *** User API ***
  public createUser = (user: User) =>
    this.db
      .collection("users")
      .doc(user.uid)
      .set(user);

  public getUser = (uid: string) =>
    this.db
      .collection("users")
      .doc(uid)
      .get()
      .then(doc => doc.data());

  /// *** Economy API ***
  public setExpenses = (uid: string, budget: Row[]) =>
    this.db
      .collection("budgets")
      .doc(uid)
      .set({ budget }, { merge: true });

  public getBudget = (uid: string) =>
    this.db
      .collection("budgets")
      .doc(uid)
      .get()
      .then(doc => doc.data());

  public setIncome = (uid: string, income: number) =>
    this.db
      .collection("budgets")
      .doc(uid)
      .set({ income }, { merge: true });

  public getIncome = (uid: string) => {
    this.db
      .collection("budgets")
      .doc(uid)
      .get();
  };
}

export default Firebase;
