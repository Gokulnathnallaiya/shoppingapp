import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { withRouter } from "react-router-dom";
import axios from "axios";
//redux
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";

import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      axios
        .post("https://express-sql-app.herokuapp.com/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          const { setCurrentUser, history } = this.props;
          if (response.data.success === 1) {
            setCurrentUser(email);
            this.setState({ loading: false });
            history.push({
              pathname: "/",
            });
          } else {
            this.setState({ loading: false });
            alert("Invalid Login Credentials");
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({ loading: false });
          alert("Please try again, error occured");
        });
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  googlelogin = () => {
    console.log("clicked");
    axios.get('https://express-sql-app.herokuapp.com/auth/google',{
      headers: {"Access-Control-Allow-Origin": "*"}
    })
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit"> Sign in </CustomButton>
          </div>
        </form>
        <CustomButton googlesignin onClick={this.googlelogin}>
          Google signin
        </CustomButton>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(withRouter(SignIn));
