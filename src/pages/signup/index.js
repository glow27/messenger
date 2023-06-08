import { formTemplate } from '../../utils/templator';

const singupFormFields = [
  { fieldLabel: 'Email', fieldName: 'email' },
  { fieldLabel: 'First name', fieldName: 'first_name' },
  { fieldLabel: 'Second name', fieldName: 'second_name' },
  { fieldLabel: 'Phone', fieldName: 'phone' },
  { fieldLabel: 'Login', fieldName: 'login' },
  { fieldLabel: 'Password', fieldName: 'password' },
  { fieldLabel: 'Repeat password', fieldName: 'repeatPass' },
];

export const signupForm = formTemplate({
  formTitle: 'SIGN UP',
  btnLabel: 'sing up',
  fields: singupFormFields,
  link: 'signin',
  linkText: 'Back to sign in',
});
