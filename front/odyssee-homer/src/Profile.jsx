import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { purple } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        email: "homer.simpson@wildcodeschool.fr",
        name: "Homer",
        lastname: "Simpson",
      },
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.history.push("/signin");
  }

  render() {
    const { email, name, lastname } = this.state.profile;
    return (
      <>
        <List component="nav">
          <ListItem>
            <ListItemText primary="name" secondary={name} />
            <ListItemText primary="lastname" secondary={lastname} />
            <ListItemText primary="email" secondary={email} />
          </ListItem>
        </List>
        <ColorButton onClick={this.handleClick} p={5}>
          Logout
        </ColorButton>
      </>
    );
  }
}

export default Profile;
