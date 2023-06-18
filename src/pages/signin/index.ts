import { formTemplate } from '../../components/templates/form.tmpl';
import { FormField } from '../../components/FormField';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';

const singinFormFields = [
  { fieldLabel: 'Login', fieldName: 'login' },
  { fieldLabel: 'Password', fieldName: 'password' },
];

export const signinForm = formTemplate({
  formTitle: 'SIGN IN',
  button: Button({ label: 'sing in', type: 'submit' }),
  fields: singinFormFields.map(el => FormField(el)),
  link: Link({ href: 'signup', linkText: 'Create account' }),
});
