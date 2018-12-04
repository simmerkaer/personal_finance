import React, { ComponentType } from "react";
import AuthUserContext from "./context";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

export interface InjectedAuthUserProps {
  authUser: firebase.User | null;
}

const withAuthUser = <P extends InjectedAuthUserProps>(
  Component: ComponentType<P>
) =>
  class WithAuthUser extends React.Component<
    Subtract<P, InjectedAuthUserProps>,
    {}
  > {
    public render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => <Component authUser={authUser} {...this.props} />}
        </AuthUserContext.Consumer>
      );
    }
  };

export default withAuthUser;
