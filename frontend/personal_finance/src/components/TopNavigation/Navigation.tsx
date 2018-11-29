import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { withAuthentication } from '../../session';
import AuthUserContext from '../../session/context';

const ListItemLink = (text: string, to: string, icon: JSX.Element) => {
  const renderLink = (itemProps: any) => <Link to={to} {...itemProps} />;
  return (
    <ListItem button={true} component={renderLink} key={text}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

class Navigation extends React.Component<any, any> {
  public render() {
    const NavigationAuth = () => (
      <List>
        {["Welcome", "Budget"].map((text, index) =>
          ListItemLink(text, `/${text}`, <MailIcon />)
        )}
      </List>
    );

    const NavigationNonAuth = () => (
      <List>
        {["Welcome Anon!"].map((text, index) => (
          <ListItem button={true} key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    );

    return (
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? <NavigationAuth /> : <NavigationNonAuth />}
      </AuthUserContext.Consumer>
    );
  }
}

export default withAuthentication(Navigation);
