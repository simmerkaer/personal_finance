import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AccountIcon from "@material-ui/icons/AccountBox";
import BudgetIcon from "@material-ui/icons/AttachMoney";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import InvestIcon from "@material-ui/icons/ShowChart";
import * as React from "react";
import { Link } from "react-router-dom";
import { withAuthentication } from "../../session";
import AuthUserContext from "../../session/context";

const ListItemLink = (text: string, to: string, icon: JSX.Element) => {
  const renderLink = (itemProps: any) => <Link to={to} {...itemProps} />;
  return (
    <ListItem button={true} component={renderLink} key={text}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

interface Menu {
  title: string;
  path?: string;
  icon: JSX.Element;
}

const accountMenus: Menu[] = [
  { title: "My Profile", path: "profile", icon: <AccountIcon /> },
  { title: "Settings", path: "settings", icon: <SettingsIcon /> }
];

const budgetMenus: Menu[] = [
  { title: "My Economy", path: "economy", icon: <BudgetIcon /> },
  { title: "Investings", path: "investings", icon: <InvestIcon /> }
];
class Navigation extends React.Component<any, any> {
  public render() {
    const NavigationAuth = () => (
      <>
        <List>
          <ListSubheader>Account</ListSubheader>
          {accountMenus.map((menu, index) =>
            ListItemLink(menu.title, `/${menu.path}`, menu.icon)
          )}
        </List>
        <Divider />
        <List>
          <ListSubheader>Economy</ListSubheader>
          {budgetMenus.map((menu) =>
            ListItemLink(menu.title, `/${menu.path}`, menu.icon)
          )}
        </List>
      </>
    );

    const NavigationNonAuth = () => (
      <List>
        {["Welcome Anon!"].map((text, index) => (
         ListItemLink(text, `/unauthorized`, <PersonIcon />)
        ))}
      </List>
    );

    return (
      <AuthUserContext.Consumer>
        {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
      </AuthUserContext.Consumer>
    );
  }
}

export default withAuthentication(Navigation);
