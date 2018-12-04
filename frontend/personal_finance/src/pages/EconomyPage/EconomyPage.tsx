import * as React from "react";
import withAuthorization from "../../firebase/withAuthorization";
import ExpensesTable, {
  Row
} from "../../components/ExpensesTable/ExpensesTable";
import { Grid } from "@material-ui/core";
import { compose } from "recompose";
import { withFirebase } from "../../firebase";
import { InjectedFirebaseProps } from "../../firebase/withFirebase";
import { withAuthUser } from "../../session";
import { InjectedAuthUserProps } from "../../session/withAuthUser";

interface EconomyPageState {
  rows: Row[];
  loading: boolean;
}

class EconomyPage extends React.Component<
  InjectedFirebaseProps & InjectedAuthUserProps,
  EconomyPageState
> {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      loading: false
    };
  }

  async componentDidMount() {
    const { firebase, authUser } = this.props;
    if (!firebase || !authUser) return;

    this.setState({ loading: true });
    const budgetObject = await firebase.getBudget(authUser.uid);

    if (!budgetObject) return;
    const rows: Row[] = budgetObject.budget;
    this.setState({
      rows: rows,
      loading: false
    });
  }

  commitChanges = ({ added, changed, deleted }) => {
    let { rows } = this.state;
    let { firebase, authUser } = this.props;
    if (!firebase || !authUser) return;
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
    firebase.setBudget(authUser.uid, rows);
  };

  calculateTotalExpenses = (rows: Row[]) => {
    return rows.reduce((total: number, row: Row) => total + +row.money, 0);
  };

  public render() {
    const { rows, loading } = this.state;
    const totalExpenses = this.calculateTotalExpenses(rows);
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={6}>
            <ExpensesTable
              rows={rows}
              commitChanges={this.commitChanges}
              loading={loading}
            />
          </Grid>
          <Grid item xs={6}>
            Total expenses: {totalExpenses} kr.
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default compose(
  withAuthorization,
  withFirebase,
  withAuthUser
)(EconomyPage);
