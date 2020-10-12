import React from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import axios from "axios";

import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    try {
      this.setState({ loading: true });
      axios
        .post("https://express-sql-app.herokuapp.com/signup", {
          name: displayName,
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response);
          if (response) {
            this.setState({ loading: false });
            alert(response.data.message);
          }
        })
        .catch((err) => {
          alert("An error occured,please try again");
        });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <div className="container">
          <CustomButton type="submit">
            SIGN UP
          </CustomButton>
          {this.state.loading ? (
              <div className="container">
                <div className="loader"></div>
              </div>
            ) : null}
            </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
