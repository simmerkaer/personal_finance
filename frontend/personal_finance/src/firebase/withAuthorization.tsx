import React, { ComponentType } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import Firebase, { withFirebase } from "./";

interface WithAuthorizationProps extends RouteComponentProps {
  firebase: Firebase;
}

interface WithAuthorizationState {
  redirect?: string;
}

const withAuthorization = <P extends object>(Component: ComponentType<P>) => {
  class WithAuthorization extends React.Component<
    P & WithAuthorizationProps,
    WithAuthorizationState
    > {
    constructor(props: P & WithAuthorizationProps) {
      super(props);
      this.state = { redirect: undefined };
    }

    public componentDidMount() {
      this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!authUser) {
          this.setState({ redirect: "/unauthorized" });
        }
      });
    }
    public render() {
      const redirect = this.state.redirect;
      if (redirect) { return <Redirect to={redirect} />; }
      return <Component />;
    }
  }

  return withRouter(withFirebase(WithAuthorization));
};

export default withAuthorization;
