import React, { ComponentType } from 'react';
import FirebaseContext from './context';
import Firebase from './firebase';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

interface InjectedProps {
  firebase?: Firebase;
}

const withFirebase = <P extends InjectedProps>(
  Component: ComponentType<P>
) =>
  class WithFirebase extends React.Component<
    Subtract<P, InjectedProps>,
    {}
    > {
    public render() {
      return (
        <FirebaseContext.Consumer>
          {firebase => <Component firebase={firebase} />}
        </FirebaseContext.Consumer>
      );
    }
  };

export default withFirebase;
