import React from "react";
import { Link}  from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { purple } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }
    this.fillEmailField = this.fillEmailField.bind(this);
    this.fillPasswordField = this.fillPasswordField.bind(this);
  }

  fillEmailField(e) {
    this.setState({ email: e.target.value });
  }

  fillPasswordField(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    const { email, password } = this.state;
    e.preventDefault();
    this.setState({ isFlash: true });
    fetch("/auth/signin", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then(
        (res) => this.setState({ flash: res.flash }),
        (err) => this.setState({ flash: err.flash })
      );
  }

  render() {
    return (
      <>
        <Link to="/signup">Sign Up</Link>
        <form onSubmit={this.handleSubmit}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            style={{ padding: 20 }}
          >
            <h2>Sign In!</h2>
            <TextField
              label="Email"
              type="email"
              name="email"
              onChange={this.fillEmailField}
              required
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              onChange={this.fillPasswordField}
              required
            />
            <Box mt={5} style={{ alignSelf: "flex-end" }}>
              <ColorButton type="submit" p={5}>
                Submit
              </ColorButton>
            </Box>
          </Grid>
        </form>
      </>
    );
  }
}

export default SignIn;
