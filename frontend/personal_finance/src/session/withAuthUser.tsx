import React, { ComponentType } from "react";
import AuthUserContext from "./context";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

interface InjectedProps {
  authUser: firebase.User | null;
}

const withAuthUser = <P extends InjectedProps>(Component: ComponentType<P>) =>
  class WithAuthUser extends React.Component<Subtract<P, InjectedProps>, {}> {
    public render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => <Component authUser={authUser} />}
        </AuthUserContext.Consumer>
      );
    }
  };

export default withAuthUser;
