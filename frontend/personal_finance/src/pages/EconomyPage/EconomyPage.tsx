import * as React from "react";
import withAuthorization from "../../firebase/withAuthorization";
import ExpensesTable, {
  Row
} from "../../components/ExpensesTable/ExpensesTable";
import { Grid, Typography } from "@material-ui/core";
import { compose } from "recompose";
import { withFirebase } from "../../firebase";
import { InjectedFirebaseProps } from "../../firebase/withFirebase";
import { withAuthUser } from "../../session";
import { InjectedAuthUserProps } from "../../session/withAuthUser";
import TextField from "@material-ui/core/TextField";
import AddExpense from "../../components/AddExpense";

interface EconomyPageState {
  expenses: Row[];
  totalExpenses: number;
  loading: boolean;
}

class EconomyPage extends React.Component<
  InjectedFirebaseProps & InjectedAuthUserProps,
  EconomyPageState
> {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      totalExpenses: 0,
      loading: false
    };
  }

  async componentDidMount() {
    const { firebase, authUser } = this.props;

    this.setState({ loading: true });
    const expensesObject = await firebase.getExpenses(authUser.uid);
    if (!expensesObject) return;

    const { expenses, totalExpenses } = expensesObject;
    this.setState({
      expenses,
      totalExpenses,
      loading: false
    });
  }

  // handleIncomeChange = event => {
  //   const { firebase, authUser } = this.props;
  //   this.setState({ totalExpenses: event.target.value });
  //   firebase.setIncome(authUser.uid, event.target.value);
  // };

  addExpense = (text: string, amount: number) => {
    const { firebase, authUser } = this.props;

    firebase.addExpense(authUser.uid, text, amount);

    this.setState(prevState => ({
      expenses: [...prevState.expenses, { text, amount }]
    }));
  };

  deleteRow = (row: Row) => {
    const { firebase, authUser } = this.props;

    firebase.deleteExpense(authUser.uid, row);

    this.setState(prevState => ({
      expenses: prevState.expenses.filter(x => x.text !== row.text)
    }));
  };

  public render() {
    const { expenses, totalExpenses } = this.state;
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={6}>
            <Typography variant="h4" gutterBottom>
              Monthly expenses
            </Typography>
            <ExpensesTable rows={expenses} deleteRow={this.deleteRow} />
            <AddExpense addExpense={this.addExpense} />
          </Grid>
          <Grid item xs={6}>
            Monthly income: {totalExpenses} kr.
            <br />
            Monthly expenses: {totalExpenses} kr.
            <br />
            Left-over: {totalExpenses - totalExpenses} kr.
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
