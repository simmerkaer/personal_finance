import Button from '@material-ui/core/Button';
import * as React from 'react';
import { withFirebase } from '../../firebase';
import Firebase from '../../firebase/firebase';

interface SignInProps {
  firebase: Firebase;
}

class SignIn extends React.Component<SignInProps, any> {
  public signIn = () => {
    this.props.firebase.doSignInWithGoogle();
    // TODO: catch error
  }

  public render() {
    return (
      <Button color="inherit" onClick={this.signIn}>Login</Button>
    );
  }
}

const SignInButton = withFirebase(SignIn);
export default SignInButton;