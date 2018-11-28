import Button from '@material-ui/core/Button';
import * as React from 'react';
import { withFirebase } from '../../firebase';
import Firebase from '../../firebase/firebase';

interface SignOutProps {
  firebase: Firebase;
}

class SignOut extends React.Component<SignOutProps, any> {
  public signOut = () => {
    this.props.firebase.doSignOut();
    // TODO: catch error
  }

  public render() {
    return (
      <Button color="inherit" onClick={this.signOut}>Sign Out</Button>
    );
  }
}

const SignOutButton = withFirebase(SignOut);
export default SignOutButton;
