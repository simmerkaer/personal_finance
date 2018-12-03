import * as React from "react";
import withAuthorization from "../../firebase/withAuthorization";
import ExpensesTable from "../../components/ExpensesTable/ExpensesTable";

class EconomyPage extends React.Component<any, any> {
  public render() {
    return <div>
      <ExpensesTable />
    </div>;
  }
}

export default withAuthorization(EconomyPage);
