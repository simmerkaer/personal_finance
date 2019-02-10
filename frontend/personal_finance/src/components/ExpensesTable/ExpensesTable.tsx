import * as React from "react";
import { Column } from "@devexpress/dx-react-grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider/Divider";

export interface Row {
  text: string;
  amount: number;
}

interface ExpensesTableProps {
  rows: Row[];
  deleteRow: (row: Row) => void;
}

interface ExpensesTableState {
  columns: Column[];
}

class ExpensesTable extends React.Component<
  ExpensesTableProps,
  ExpensesTableState
> {
  createRow = (x, i) => (
    <ListItem button divider key={i}>
      <ListItemText primary={x.text} />
      <ListItemText primary={`${x.amount} kr.`} />
      <ListItemSecondaryAction style={{ maxWidth: 50 }}>
        <IconButton
          aria-label="Delete"
          onClick={this.props.deleteRow.bind(this, x)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );

  render() {
    let { rows } = this.props;
    let total = rows.reduce((acc, row) => acc + +row.amount, 0);
    return (
      <div>
        <List>
          {rows.map(this.createRow)}
          <Divider />
          <ListItem>
            <ListItemText primary={"Total"} />
            <ListItemText primary={`${total} kr.`} />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default ExpensesTable;
