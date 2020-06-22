import React from "react";

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
    fetch("/auth/signup", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ email, password, name, lastname }),
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
        <h1>{JSON.stringify(this.state)}</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" onChange={this.updateEmailField} />
          <input
            type="password"
            name="password"
            onChange={this.updatePasswordField}
          />
          <input
            type="password"
            name="passwordbis"
            onChange={this.updatePassWordBisField}
          />
          <input type="text" name="name" onChange={this.updateNameField} />
          <input
            type="text"
            name="lastname"
            onChange={this.updateLastnameField}
          />

          <input type="submit" value="Soumettre" />
        </form>
      </>
    );
  }
}

export default SignUp;
