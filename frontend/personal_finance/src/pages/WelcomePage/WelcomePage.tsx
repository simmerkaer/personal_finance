import * as React from "react";
import withAuthorization from "../../firebase/withAuthorization";
import { withAuthUser } from "../../session";
import Avatar from "@material-ui/core/Avatar";

interface WelcomePageProps {
  authUser: firebase.User | null;
}

class WelcomePage extends React.Component<WelcomePageProps, any> {
  public render() {
    const { authUser } = this.props;
    if (!authUser) return null;
    const photoUrl = authUser.photoURL ? authUser.photoURL : "";
    return (
      <>
        <div>Welcome {authUser.email}!</div>
        <Avatar src={photoUrl} />
      </>
    );
  }
}
export default withAuthorization(withAuthUser(WelcomePage));
