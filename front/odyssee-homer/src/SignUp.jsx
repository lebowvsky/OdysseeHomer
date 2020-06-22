import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { purple } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordBis: "",
      name: "",
      lastname: "",
      flash: "",
      flashIsOk: false,
      isFlash: false,
    };
    this.updateEmailField = this.updateEmailField.bind(this);
    this.updatePasswordField = this.updatePasswordField.bind(this);
    this.updatePassWordBisField = this.updatePassWordBisField.bind(this);
    this.updateNameField = this.updateNameField.bind(this);
    this.updateLastnameField = this.updateLastnameField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateEmailField(e) {
    this.setState({ email: e.target.value });
  }

  updatePasswordField(e) {
    this.setState({ password: e.target.value });
  }

  updatePassWordBisField(e) {
    this.setState({ passwordBis: e.target.value });
  }

  updateNameField(e) {
    this.setState({ name: e.target.value });
  }

  updateLastnameField(e) {
    this.setState({ lastname: e.target.value });
  }

  handleSubmit(e) {
    const { email, password, name, lastname } = this.state;
    e.preventDefault();
    this.setState({ isFlash: true });
    fetch("/auth/signup", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ email, password, name, lastname }),
    })
      .then((res) => res.json())
      .then(
        (res) => this.setState({ flash: res.flash, flashIsOk: true }),
        (err) => this.setState({ flash: err.flash })
      );
  }

  handleClose = () => {
    this.setState({ isFlash: false });
    this.state.flashIsOk && this.props.history.push("/");
  };

  render() {
    return (
      <>
        <Link to="/signin">Sign In</Link>
        {/* <h1>{JSON.stringify(this.state)}</h1> */}
        <form onSubmit={this.handleSubmit}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            style={{ padding: 20 }}
          >
            <h2>Sign Up!</h2>
            <TextField
              label="Email"
              type="email"
              name="email"
              onChange={this.updateEmailField}
              required
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              onChange={this.updatePasswordField}
              required
            />

            <TextField
              label="Password copy"
              type="password"
              name="passwordbis"
              onChange={this.updatePassWordBisField}
              required
            />

            <TextField
              label="Name"
              type="text"
              name="name"
              onChange={this.updateNameField}
              required
            />

            <TextField
              label="Lastname"
              type="text"
              name="lastname"
              onChange={this.updateLastnameField}
              required
            />
            <Box mt={5} style={{ alignSelf: "flex-end" }}>
              <ColorButton type="submit" p={5}>
                Submit
              </ColorButton>
            </Box>
          </Grid>
        </form>
        <Snackbar
          open={this.state.isFlash}
          autoHideDuration={2000}
          onClose={this.handleClose}
          message={this.state.flash}
        />
      </>
    );
  }
}

export default SignUp;
