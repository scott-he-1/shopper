import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { emailValidation, nameValidation, passwordValidation, postcodeValidation } from "./Validations";
import { LoginInputBase } from "./LoginInputBase";
import './CreateAccountComponent.css';

const INIT_CREATEACCOUNT = {
  createAccountEmail: '',
  createAccountCreatePassword: '',
  createAccountConfirmPassword: '',
  createAccountFirstName: '',
  createAccountSurname: '',
  createAccountPostcode: '',
}

class CreateAccountComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      createAccountPasswordHide: true,

      createAccount: INIT_CREATEACCOUNT,
      
      registeredEmails: ['test@test.com'],

      error: {},
    }
  }

  handleCreateAccountInputs = (e) => {
    this.setState((prevState) => ({
      createAccount: {
        ...prevState.createAccount,
        [e.target.name]: e.target.value,
      },
    }));
  };

  handleHidePassword = () => {
    this.setState({createAccountPasswordHide : false})
  }

  handleShowPassword = () => {
    this.setState({createAccountPasswordHide: true})
  }

  handleCreateAccount = (e) => {
    e.preventDefault();

    const {
      createAccount: {
        createAccountEmail,
        createAccountCreatePassword,
        createAccountFirstName,
        createAccountSurname,
        createAccountPostcode
      }
    } = this.state

    let allClear = true;
    Object.keys(this.state.createAccount).map((key) => {
      let errorText;
      switch (key) {
        case 'createAccountEmail':
          if (this.state.registeredEmails.includes(createAccountEmail)) {
            errorText = 'Email Already Exists';
          } else {
            errorText = emailValidation(createAccountEmail);
          }
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              emailError: errorText,
            },
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'createAccountCreatePassword':
          errorText = passwordValidation(createAccountCreatePassword);
          this.setState((prevState) => ({
            error: {
              ...prevState.error, 
              passwordError: errorText,
            }
          }));
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'createAccountConfirmPassword':
          errorText = (this.state.createAccount.createAccountCreatePassword === this.state.createAccount.createAccountConfirmPassword) ? '' : 'Password must be the same';
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              confirmPasswordError: errorText,
            }
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'createAccountFirstName':
          errorText = nameValidation(createAccountFirstName);
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              firstNameError: errorText,
            }
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'createAccountSurname':
          errorText = nameValidation(createAccountSurname);
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              surnameError: errorText,
            }
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'createAccountPostcode':
          errorText = postcodeValidation(createAccountPostcode);
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              postcodeError: errorText,
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
      let newAccount = {
        [`${createAccountEmail}`]: {
          emailAddress: createAccountEmail,
          password: createAccountCreatePassword,
          name: createAccountFirstName,
          surname: createAccountSurname,
          postcode: createAccountPostcode,
        },
      };

      this.props.handleRegisterAccount(newAccount);

      this.setState((prevState) => ({
        registeredEmails: [...prevState.registeredEmails, createAccountEmail],
        createAccount: INIT_CREATEACCOUNT,
      }))

      alert('Successfully Registered Account!');
    }
  }

  handleCreateAccountWithFacebook = (e) => {
    e.preventDefault();
  };

  render() {
    const {createAccountPasswordHide} = this.state;

    const createAccountFields = [
      {label: 'Your Email Address* :', type: 'text', name: 'createAccountEmail', error: 'emailError'},
      {label: 'Create Password* :', 
      type: (createAccountPasswordHide ? 'password' : 'text'), 
      name: 'createAccountCreatePassword', 
      extraText: 'Password must be 8-20, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % & * () _ +', 
      error: 'passwordError'},
      {label: 'Confirm Password* :', type: (createAccountPasswordHide ? 'password' : 'text'), name: 'createAccountConfirmPassword', error: 'confirmPasswordError'},
      {label: 'First Name* :', type: 'text', name: 'createAccountFirstName', error: 'firstNameError'},
      {label: 'Surname* :', type: 'text', name: 'createAccountSurname', error: 'surnameError'},
      {label: 'Postcode* :', type: 'text', name: 'createAccountPostcode', error: 'postcodeError'},
    ]

    return (
      <form className="createAccountComponent" onSubmit={this.handleCreateAccount}>
        {createAccountFields.map((item) => (
          <LoginInputBase 
          value={this.state.createAccount && this.state.createAccount[item.name]}
          onChange={this.handleCreateAccountInputs}
          name={item.name}
          key={item.name}
          type={item.type}
          label={item.label}
          autoComplete="off" 
          extraText={item['extraText'] ? item.extraText : null}
          errorM={
            (this.state.error)
            && (this.state.error[item.error])
            && (this.state.error[item.error].length > 1)
            ? this.state.error[item.error]
            : null
          }/>
        ))}
        {createAccountPasswordHide &&
        <FontAwesomeIcon icon={faEye} onClick={this.handleHidePassword}/>
        }
        {!createAccountPasswordHide &&
        <FontAwesomeIcon icon={faEyeSlash} onClick={this.handleShowPassword}/>
        }   
        <button className="accountButton">Create Account</button>   
        <button className="faceBookButton" onClick={this.handleCreateAccountWithFacebook}>Create Account With Facebook</button>   
        </form>

    )
  }
}

export default CreateAccountComponent;