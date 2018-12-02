import Button from "@material-ui/core/Button";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { withFirebase } from "../../firebase";
import Firebase from "../../firebase/firebase";

interface SignInProps extends RouteComponentProps {
  firebase: Firebase;
}

class SignIn extends React.Component<SignInProps, any> {
  public signIn = async () => {
    const { firebase, history } = this.props;
    const userCred = await firebase.doSignInWithGoogle();
    const user = userCred.user;
    if (!user) return; // Check this case

    const existingUser = await firebase.getUser(user.uid);

    // If the user doesnt already exist we create it
    if (!existingUser)
      firebase.createUser({
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email || ""
      });

    history.push("/profile");
  }

  public render() {
    return (
      <Button color="inherit" onClick={this.signIn}>
        Login
      </Button>
    );
  }
}

const SignInButton = withFirebase(withRouter(SignIn));
export default SignInButton;
