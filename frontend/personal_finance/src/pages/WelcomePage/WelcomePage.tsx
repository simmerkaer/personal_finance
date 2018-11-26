import * as React from 'react';

export default class WelcomePage extends React.Component<any, any> {
  public componentDidMount() {
    const db = this.context;
    // tslint:disable-next-line:no-console
    console.log(db)
    // db.createUser({
    //   first: "test",
    //   last: "test",
    //   born: 1000
    // })

  }
  public render() {
    return (
      <div>
        Welcome!
      </div>
    );
  }
}
