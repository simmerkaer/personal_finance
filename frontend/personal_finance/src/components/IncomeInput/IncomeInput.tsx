import * as React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withFirebase } from "../../firebase";
import { InjectedFirebaseProps } from "../../firebase/withFirebase";
import TextField from "@material-ui/core/TextField";
import { compose } from "recompose";
import { withAuthUser } from "../../session";
import { InjectedAuthUserProps } from "../../session/withAuthUser";

interface IncomeInputProps {
  income: number;
  handleChange: any;
}

export default class IncomeInput extends React.Component<IncomeInputProps, {}> {
  public render() {
    const { income, handleChange } = this.props;
    return (
      <TextField
        id="outlined-name"
        fullWidth
        label="Monthly income"
        value={income}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        InputProps={{
          endAdornment: <InputAdornment position="end">kr.</InputAdornment>
        }}
      />
    );
  }
}
