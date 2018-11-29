import React, { ComponentType } from 'react';
import Firebase from './firebase';

const FirebaseContext = React.createContext({} as Firebase);

export default FirebaseContext;