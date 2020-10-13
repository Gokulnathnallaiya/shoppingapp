import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { withRouter } from "react-router-dom";
import axios from "axios";
//redux
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import "./sign-in.styles.scss";

//toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        setCurrentUser(userAuth.email)
        toast("Login Successfull", { type: "success" });
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log("entered")
    const { email, password } = this.state;

    try {
      axios
        .post("https://express-sql-app.herokuapp.com/user/login", {
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
            toast("Login Successfull", { type: "success" });
          } else {
            this.setState({ loading: false });
            toast("Login failed", { type: "error" });
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
          <CustomButton type='submit'> Sign in </CustomButton>
          
          
        </form>
        <div className='buttons'>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Google Sign in
            </CustomButton>
          </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(withRouter(SignIn));
