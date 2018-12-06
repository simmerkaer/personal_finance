import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  EditingState,
  Column,
  DataTypeProvider
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn
} from "@devexpress/dx-react-grid-material-ui";
import CircularProgress from "@material-ui/core/CircularProgress";

const getRowId = row => row.id;

export interface Row {
  id: number;
  name: string;
  money: string;
}

interface ExpensesTableProps {
  rows: Row[];
  loading: boolean;
  commitChanges: any;
}

interface ExpensesTableState {
  columns: Column[];
}

const CurrencyFormatter = ({ value }) => (
  <b style={{ color: "darkblue" }}>{value} kr.</b>
);

const CurrencyTypeProvider = props => (
  <DataTypeProvider formatterComponent={CurrencyFormatter} {...props} />
);

class ExpensesTable extends React.Component<
  ExpensesTableProps,
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
      ]
    };
  }

  render() {
    const { rows, loading, commitChanges } = this.props;
    const { columns } = this.state;
    return (
      <Paper>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <EditingState onCommitChanges={commitChanges} />
          <CurrencyTypeProvider for={["money"]} />
          <Table
            noDataCellComponent={() => (
              <LoadingState columnCount={columns.length} loading={loading} />
            )}
          />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
        </Grid>
      </Paper>
    );
  }
}

export default ExpensesTable;

const LoadingState = ({ loading, columnCount }) => (
  <td
    colSpan={columnCount + 1}
    style={{ textAlign: "center", verticalAlign: "middle" }}
  >
    <big>{loading ? <CircularProgress size={28} /> : <span>No data</span>}</big>
  </td>
);
