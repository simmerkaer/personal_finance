import Button from "@material-ui/core/Button";
import * as React from "react";
import { withFirebase } from "../../firebase";
import Firebase from "../../firebase/firebase";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface SignOutProps extends RouteComponentProps {
  firebase: Firebase;
}

class SignOut extends React.Component<SignOutProps, any> {
  public signOut = () => {
    this.props.firebase.doSignOut();
    this.props.history.push("/unauthorized");
    // TODO: catch error
  };

  public render() {
    return (
      <Button color="inherit" onClick={this.signOut}>
        Sign Out
      </Button>
    );
  }
}

const SignOutButton = withFirebase(withRouter(SignOut));
export default SignOutButton;
