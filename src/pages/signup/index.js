import { formTemplate } from '../../components/templates/form.tmpl';
import { FormField } from '../../components/FormField';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import { singupFormFields } from '../consts';

export const signupForm = formTemplate({
  formTitle: 'SIGN UP',
  button: Button({ label: 'sing up' }),
  fields: singupFormFields.map((el) => FormField(el)),
  link: Link({ href: 'signin', linkText: 'Back to sign in' }),
});
