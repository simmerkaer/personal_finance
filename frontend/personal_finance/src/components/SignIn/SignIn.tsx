import Button from '@material-ui/core/Button';
import * as React from 'react';
import { withFirebase } from '../../firebase';
import Firebase from '../../firebase/firebase';

interface SignInProps {
  firebase: Firebase;
}

class SignIn extends React.Component<SignInProps, any> {
  public signIn = async () => {
    const { firebase } = this.props;
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
  }

  public render() {
    return (
      <Button color="inherit" onClick={this.signIn}>Login</Button>
    );
  }
}

const SignInButton = withFirebase(SignIn);
export default SignInButton;