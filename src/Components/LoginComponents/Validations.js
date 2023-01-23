export const emailValidation = (email) => {
  let validEmailTester = /^(?=[a-z])(?=[0-9]?).{1,}@(?=[a-z]).{1,}\.(com|org|net)$/g;
  return validEmailTester.test(email) ? '' : 'Please enter a valid email';
}

export const passwordValidation = (password) => {
  let validPasswordTester = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&*()_+]).{8,20}$/g;
  return validPasswordTester.test(password) ? '' : 'Please enter a valid password';
}

export const nameValidation = (name) => {
  let validNameTester = /^[a-zA-Z]*( ?[a-zA-Z])+$/g;
  return validNameTester.test(name) ? '' : 'Please enter a valid name';
}

export const postcodeValidation = (postcode) => {
  let validPostcode = /^[0-9]{5}$/g;
  return validPostcode.test(postcode) ? '' : 'Please enter a valid postcode';
}

export const phoneNumberValidation = (number) => {
  let validNumber = /^[0-9]?[0-9]{10}$/g;
  return validNumber.test(number) ? '' : 'Please enter a valid number';
}