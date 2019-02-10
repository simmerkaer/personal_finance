import * as React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import Popper from "@material-ui/core/Popper/Popper";
import { Fade, Paper, Typography, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircle";

export interface AddExpenseProps {
  addExpense: (text: string, amount: number) => void;
}
export interface AddExpenseState {
  popperOpen: boolean;
  anchorEl: any;
  text: string;
  amount: number;
}

export default class AddExpense extends React.Component<
  AddExpenseProps,
  AddExpenseState
> {
  constructor(props: AddExpenseProps) {
    super(props);
    this.state = {
      popperOpen: false,
      anchorEl: null,
      text: "Item",
      amount: 0
    };
  }

  handleChangeText = event => {
    this.setState({
      text: event.target.value
    });
  };

  handleChangeAmount = event => {
    this.setState({
      amount: event.target.value
    });
  };

  addExpense = () => {
    const { text, amount } = this.state;
    this.props.addExpense(text, amount);
    this.setState({ popperOpen: false, text: "", amount: 0 });
  };

  handleClick = event => {
    const { currentTarget } = event;
    this.setState(prevState => ({
      anchorEl: currentTarget,
      popperOpen: !prevState.popperOpen
    }));
  };

  public render() {
    let classes = {
      row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10
      }
    };

    const { popperOpen, anchorEl } = this.state;
    return (
      <div style={{ textAlign: "left" }}>
        <Button
          aria-describedby="addItem"
          variant="contained"
          onClick={this.handleClick}
        >
          Add Item
        </Button>
        <Popper
          id="addItem"
          open={popperOpen}
          anchorEl={anchorEl}
          placement={"bottom-start"}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper style={classes.row}>
                <TextField
                  style={{ marginRight: 10 }}
                  id="textField"
                  label="Text"
                  value={this.state.text}
                  onChange={this.handleChangeText}
                  margin="normal"
                />
                <TextField
                  id="amountField"
                  label="Amount"
                  type="number"
                  value={this.state.amount}
                  onChange={this.handleChangeAmount}
                  margin="normal"
                />
                <IconButton aria-label="Add" onClick={this.addExpense}>
                  <AddIcon color="primary" />
                </IconButton>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    );
  }
}
