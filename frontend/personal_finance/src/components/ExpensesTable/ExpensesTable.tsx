import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { EditingState } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn
} from "@devexpress/dx-react-grid-material-ui";

const getRowId = row => row.id;

interface ExpensesTableState {
  columns: any;
  rows: any;
}

export default class ExpensesTable extends React.PureComponent<
  {},
  ExpensesTableState
> {
  constructor(props) {
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
      ],
      rows: []
    };
  }

  commitChanges = ({ added, changed, deleted }) => {
    let { rows } = this.state;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      rows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row
        }))
      ];
    }
    if (changed) {
      rows = rows.map(row =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row
      );
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      rows = rows.filter(row => !deletedSet.has(row.id));
    }
    this.setState({ rows });
  };

  render() {
    const { rows, columns } = this.state;

    return (
      <Paper>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <EditingState onCommitChanges={this.commitChanges} />
          <Table />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
        </Grid>
      </Paper>
    );
  }
}
