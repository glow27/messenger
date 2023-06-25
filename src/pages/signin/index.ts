import {
  SubmitFormValues,
  settingsIdandFormSelector,
  settingsIdandInputSelector,
  settingsWithId,
} from '../consts';
import { FormField, FormFieldProps } from '../../components/AuthForm/FormField';
import { Button } from '../../components/Button/Button';
import { Link } from '../../components/Link/Link';
import { Form } from '../../components/AuthForm/Form';

const singinFormFields: FormFieldProps[] = [
  {
    fieldLabel: 'Login',
    fieldName: 'login',
    events: {
      blur: () => console.log('uk1'),
    },
    settings: settingsIdandInputSelector,
  },
  {
    fieldLabel: 'Password',
    fieldName: 'password',
    events: {
      click: () => console.log('fk2'),
    },
    settings: settingsIdandInputSelector,
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
    submit: SubmitFormValues,
  },
  settings: settingsIdandFormSelector,
  formTitle: 'SIGN IN',
  button,
  link,
});
