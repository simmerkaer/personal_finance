import * as React from 'react';
import withAuthorization from '../../firebase/withAuthorization';

class WelcomePage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        Welcome!
      </div>
    );
  }
}
export default withAuthorization(WelcomePage);
