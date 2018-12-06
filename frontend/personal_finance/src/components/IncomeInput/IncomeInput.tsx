import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Firebase, { withFirebase } from "../../firebase";
import { InjectedFirebaseProps } from "../../firebase/withFirebase";

interface IncomeInputProps extends InjectedFirebaseProps {
  test: string;
}
interface IncomeInputState {
  income: number;
}

class IncomeInput extends React.Component<IncomeInputProps, IncomeInputState> {
  constructor(props) {
    super(props);
    this.state = { income: 0 };
  }

  handleChange = event => {
    this.setState({ income: event.target.value });
  };

  public render() {
    return (
      <FormControl fullWidth>
        <InputLabel htmlFor="adornment-amount">Monthly income</InputLabel>
        <Input
          id="adornment-amount"
          value={this.state.income}
          onChange={this.handleChange}
          endAdornment={<InputAdornment position="end">kr.</InputAdornment>}
        />
      </FormControl>
    );
  }
}

export default withFirebase(IncomeInput);
