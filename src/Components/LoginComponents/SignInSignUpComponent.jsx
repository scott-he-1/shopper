import React from "react";
import CreateAccountComponent from "./CreateAccountComponent";
import LoginComponent from "./LoginComponent";
import './SignInSignUpComponent.css';

class SignInSignUpComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      registeredAccounts: {
        'test@test.com': {
          emailAddress: 'test@test.com',
          password: 'Password!123',
          name: 'test',
          surname: 'test',
          postcode: '99999',
        }
      },

      activeTab: 'loginTab'
    }
  }

  handleRegisterAccount = (newAccountData) => {
    this.setState((prevState) => ({
      registeredAccounts: {...prevState.registeredAccounts, ...newAccountData}
    }))
  }

  handleTabChange = (e) => {
    this.setState({activeTab: e.target.getAttribute('name')})
  }

  render() {
    const tabs = [
      {label: 'SIGN IN', name: 'loginTab'},
      {label: 'CREATE ACCOUNT', name: 'createAccountTab'}
    ]

    return (
      <div className="signInSignUp" id="signInSignUp">
        <div className="tabs">
          {tabs.map((tab) => (
            <div key={tab.name} name={tab.name} onClick={this.handleTabChange}>{tab.label}</div>
          ))}
        </div>
        <div className="mainDisplay">
          {this.state.activeTab === 'loginTab' &&
          <LoginComponent registeredAccounts={this.state.registeredAccounts}/>
          }
          {this.state.activeTab === 'createAccountTab' &&
          <CreateAccountComponent handleRegisterAccount={this.handleRegisterAccount}/>
          }
        </div>
      </div>
    )
  }
}

export default SignInSignUpComponent;