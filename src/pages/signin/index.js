import { formTemplate } from '../../utils/templator';

const singinFormFields = [
  { fieldLabel: 'Login', fieldName: 'login' },
  { fieldLabel: 'Password', fieldName: 'password' },
];

export const signinForm = formTemplate({
  formTitle: 'SIGN IN',
  btnLabel: 'sing in',
  fields: singinFormFields,
  link: 'signup',
  linkText: 'Create account',
});
