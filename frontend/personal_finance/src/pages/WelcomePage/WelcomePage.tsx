import * as React from "react";
import withAuthorization from "../../firebase/withAuthorization";
import { withAuthUser } from "../../session";
import Avatar from "@material-ui/core/Avatar";
import { compose } from "recompose";

interface WelcomePageProps {
  authUser: firebase.User;
}

class WelcomePage extends React.Component<WelcomePageProps, any> {
  public render() {
    const { authUser } = this.props;
    const photoUrl = authUser.photoURL ? authUser.photoURL : "";
    return (
      <>
        <div>Welcome {authUser.email}!</div>
        <Avatar src={photoUrl} />
      </>
    );
  }
}
export default compose(
  withAuthorization,
  withAuthUser
)(WelcomePage);
