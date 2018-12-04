import React, { ComponentType } from "react";
import FirebaseContext from "./context";
import Firebase from "./firebase";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

export interface InjectedFirebaseProps {
  firebase: Firebase | null;
}

const withFirebase = <P extends InjectedFirebaseProps>(
  Component: ComponentType<P>
) =>
  class WithFirebase extends React.Component<
    Subtract<P, InjectedFirebaseProps>,
    {}
  > {
    public render() {
      return (
        <FirebaseContext.Consumer>
          {firebase => <Component firebase={firebase} {...this.props} />}
        </FirebaseContext.Consumer>
      );
    }
  };

export default withFirebase;
