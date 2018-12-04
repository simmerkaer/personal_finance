import React, { ComponentType } from "react";
import Firebase from "./firebase";

export const FirebaseSingleton = new Firebase();

const FirebaseContext = React.createContext<Firebase>(FirebaseSingleton);

export default FirebaseContext;
