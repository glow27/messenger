import { formTemplate } from '../../components/templates/form.tmpl';
import { FormField } from '../../components/FormField';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';

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
  button: Button({ label: 'sing up' }),
  fields: singupFormFields.map((el) => FormField(el)),
  link: Link({ href: 'signin', linkText: 'Back to sign in' }),
});
