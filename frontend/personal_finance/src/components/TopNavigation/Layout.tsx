import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Route } from "react-router-dom";
import BudgetPage from "../../pages/BudgetPage/BudgetPage";
import UnauthorizedPage from "../../pages/Unauthorized/UnauthorizedPage";
import WelcomePage from "../../pages/WelcomePage/WelcomePage";
import { withAuthentication } from "../../session";
import AuthUserContext from "../../session/context";
import SignIn from "../SignIn/SignIn";
import SignOut from "../SignIn/SignOut";
import Navigation from "./Navigation";

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3
    },
    drawer: {
      flexShrink: 0,
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    },
    root: {
      display: "flex",
      flexGrow: 1
    },
    grow: {
      flexGrow: 1,
      textAlign: "left"
    },
    toolbar: theme.mixins.toolbar
  });

interface LayoutProps extends WithStyles<typeof styles> {}

function Layout(props: LayoutProps) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            News
          </Typography>
          <AuthUserContext.Consumer>
            {authUser => (authUser ? <SignOut /> : <SignIn />)}
          </AuthUserContext.Consumer>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <Navigation />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path="/Unauthorized" component={UnauthorizedPage} />
        <Route path="/Welcome" component={WelcomePage} />
        <Route path="/Budget" component={BudgetPage} />
      </main>
    </div>
  );
}

export default withAuthentication(withStyles(styles)(Layout));
