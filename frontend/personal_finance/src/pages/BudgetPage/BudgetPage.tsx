import * as React from "react";
import withAuthorization from "../../firebase/withAuthorization";

class BudgetPage extends React.Component<any, any> {
  public render() {
    return <div>Budget!</div>;
  }
}

export default withAuthorization(BudgetPage);
