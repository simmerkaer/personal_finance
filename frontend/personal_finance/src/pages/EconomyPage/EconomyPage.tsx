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
import IncomeInput from "../../components/IncomeInput/IncomeInput";
import { number } from "prop-types";

interface EconomyPageState {
  rows: Row[];
  income: number;
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
      income: 0,
      loading: false
    };
  }

  async componentDidMount() {
    const { firebase, authUser } = this.props;

    this.setState({ loading: true });
    const budgetObject = await firebase.getBudget(authUser.uid);
    if (!budgetObject) return;

    const { budget, income } = budgetObject;
    this.setState({
      rows: budget,
      income,
      loading: false
    });
  }

  handleIncomeChange = event => {
    const { firebase, authUser } = this.props;
    this.setState({ income: event.target.value });
    firebase.setIncome(authUser.uid, event.target.value);
  };

  calculateTotalExpenses = (rows: Row[]) => {
    return rows.reduce((total: number, row: Row) => total + +row.money, 0);
  };

  public render() {
    const { rows, income, loading } = this.state;
    const totalExpenses = this.calculateTotalExpenses(rows);
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={6}>
            <IncomeInput
              handleChange={this.handleIncomeChange}
              income={income}
            />
            <ExpensesTable rows={rows} loading={loading} />
          </Grid>
          <Grid item xs={6}>
            Monthly income: {income} kr.
            <br />
            Monthly expenses: {totalExpenses} kr.
            <br />
            Left-over: {income - totalExpenses} kr.
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
