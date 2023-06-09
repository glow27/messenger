import { FormField, FormFieldProps } from '../../components/AuthForm/FormField';
import { loginPattern, passwordPattern } from '../../utils/regexPatterns';
import { submitFormValues, validateField } from '../../utils/helpers';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/AuthForm/Form';
import { Link } from '../../components/Link/Link';
import {
  settingsIdandFormSelector,
  settingsIdAndInputSelector,
  settingsWithId,
} from '../consts';

const singinFormFields: FormFieldProps[] = [
  {
    fieldLabel: 'Login',
    fieldName: 'login',
    events: {
      blur: validateField,
    },
    pattern: loginPattern,
    settings: settingsIdAndInputSelector,
  },
  {
    fieldLabel: 'Password',
    fieldName: 'password',
    type: 'password',
    events: {
      blur: validateField,
    },
    settings: settingsIdAndInputSelector,
    pattern: passwordPattern,
  },
];

const button = new Button({
  label: 'sign in',
  settings: settingsWithId,
  type: 'submit',
});

const link = new Link({
  linkText: 'Create account',
  href: 'signup',
});

export const signinForm = new Form({
  fields: singinFormFields.map((el) => new FormField(el)),
  events: {
    submit: submitFormValues,
  },
  settings: settingsIdandFormSelector,
  formTitle: 'SIGN IN',
  button,
  link,
});
