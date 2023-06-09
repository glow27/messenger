import { Button } from '../../components/Button';
import { formTemplate } from '../../components/templates/form.tmpl';

const singinFormFields = [
  { fieldLabel: 'Login', fieldName: 'login' },
  { fieldLabel: 'Password', fieldName: 'password' },
];

export const signinForm = formTemplate({
  formTitle: 'SIGN IN',
  button: Button({ label: 'sing in' }),
  fields: singinFormFields,
  link: 'signup',
  linkText: 'Create account',
});
