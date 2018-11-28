import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import BudgetPage from '../../pages/BudgetPage/BudgetPage';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import SignIn from '../SignIn/SignIn';
import SignOut from '../SignIn/SignOut';

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  root: {
    display: 'flex',
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    textAlign: "left"
  },
  toolbar: theme.mixins.toolbar,
});

const ListItemLink = (text: string, to: string, icon: JSX.Element) => {
  const renderLink = (itemProps: any) => <Link to={to} {...itemProps} />;
  return (
    <ListItem button={true} component={renderLink} key={text}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

interface LayoutProps extends WithStyles<typeof styles> {
  authUser?: any;
}

function Layout(props: LayoutProps) {
  const { classes, authUser } = props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            News
          </Typography>
          {authUser && <SignOut />}
          {!authUser && <SignIn />}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {['Welcome', 'Budget'].map((text, index) => (
            ListItemLink(text, `/${text}`, <MailIcon />)
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button={true} key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path="/Welcome" component={WelcomePage} />
        <Route path="/Budget" component={BudgetPage} />
      </main>
    </div>
  );
}

export default withStyles(styles)(Layout);