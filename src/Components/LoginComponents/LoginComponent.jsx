import React from "react";
import { LoginInputBase } from "./LoginInputBase";
import './LoginComponent.css';

const INIT_SIGNIN = {
  signInEmail: '',
  signInPassword: ''
}

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: INIT_SIGNIN,

      error: {},

      registeredAccounts: this.props.registeredAccounts
    }
  }

  handleSignInInput = (e) => {
    this.setState((prevState) => ({
      signIn: {...prevState.signIn, [e.target.name]: e.target.value}
    }))
  }

  handleSignInWithFacebook = (e) => {
    e.preventDefault();
  }

  handleSignIn = (e) => {
    e.preventDefault();

    const {
      signIn: {
        signInEmail,
        signInPassword,
      },
      registeredAccounts
    } = this.state;

    let allClear = true;
    Object.keys(this.state.signIn).map((key) => {
      let errorText;
      switch (key) {
        case 'signInEmail':
          if (!registeredAccounts[signInEmail]) {
            errorText = 'This Email does not exist'
          } else {
            errorText = '';
          }
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              signInEmailError: errorText
            }
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'signInPassword':
          if (registeredAccounts[signInEmail] && registeredAccounts[signInEmail].password === signInPassword) {
            errorText = '';
          } else if (signInPassword.length === 0) {
            errorText = 'Please enter a Password'
          } else {
            errorText = 'Invalid Password';
          }
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              signInPasswordError: errorText
            }
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;
        default:
          break;
      }
    })
    if (allClear) {
      localStorage.setItem('loggedInEmail', signInEmail);
      localStorage.setItem('isLoggedIn', true)
      window.location.reload(false);
    }
  }

  render() {
    const signInFields = [
      {label: 'Email Address', type: 'text', name: 'signInEmail', error: 'signInEmailError'},
      {label: 'Password', type: 'password', name: 'signInPassword', error: 'signInPasswordError'}
    ]

    const loginButtons = [
      {label: 'Sign In', className: 'accountButton'},
      {label: 'Sign In With Facebook', className: 'faceBookButton'}
    ]

    return (
      <form className="loginComponent" onSubmit={this.handleSignIn}>
        {signInFields.map((item) => (
          <LoginInputBase 
          key={item.name}
          label={item.label}
          type={item.type}
          name={item.name}
          onChange={this.handleSignInInput}
          errorM={
            (this.state.error
            && this.state.error[item.error]
            && this.state.error[item.error].length > 1)
            ? this.state.error[item.error]
            : null
          }
          />
        ))}
        {loginButtons.map((button) => (
          <button className={button.className}>{button.label}</button>
        ))}
      </form>
    )
  }
}

export default LoginComponent;