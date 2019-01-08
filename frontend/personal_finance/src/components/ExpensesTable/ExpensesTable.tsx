import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  EditingState,
  Column,
  DataTypeProvider
} from "@devexpress/dx-react-grid";

export interface Row {
  id: number;
  name: string;
  money: string;
}

interface ExpensesTableProps {
  rows: Row[];
  loading: boolean;
}

interface ExpensesTableState {
  columns: Column[];
}

class ExpensesTable extends React.Component<
  ExpensesTableProps,
  ExpensesTableState
> {
  constructor(props: ExpensesTableProps) {
    super(props);

    this.state = {
      columns: [
        {
          name: "name",
          title: "Name"
        },
        {
          name: "money",
          title: "Money"
        }
      ]
    };
  }

  render() {
    const { rows, loading } = this.props;
    const { columns } = this.state;
    return <div>test</div>;
  }
}

export default ExpensesTable;
