import * as React from "react";
import { ComponentType } from "react";
import { withFirebase } from "../firebase";
import Firebase from "../firebase/index";
import AuthUserContext from "./context";

interface WithAuthenticationProps {
  firebase: Firebase;
}

interface WithAuthenticationState {
  authUser: firebase.User | null;
}

const withAuthentication = <P extends object>(Component: ComponentType<P>) => {
  class WithAuthentication extends React.Component<
    P & WithAuthenticationProps,
    WithAuthenticationState
  > {
    constructor(props: P & WithAuthenticationProps) {
      super(props);
      this.state = { authUser: null };
    }

    public componentWillMount() {
      this.props.firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      });
    }

    public render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
