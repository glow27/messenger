import { FormField, FormFieldProps } from '../../components/AuthForm/FormField';
import AuthController from '../../controllers/AuthController';
import { Button } from '../../components/Button/Button';
import { Link } from '../../components/Link/Link';
import {
  routes,
  settingsIdAndInputSelector,
  settingsIdandFormSelector,
  settingsWithId,
} from '../consts';
import {
  emailPattern,
  loginPattern,
  namePattern,
  passwordPattern,
  phonePattern,
} from '../../utils/regexPatterns';
import {
  getFormValues,
  validateField,
  validatePasswordMatch,
} from '../../utils/helpers';

const singupFormFields: FormFieldProps[] = [
  {
    fieldLabel: 'Email',
    fieldName: 'email',
    settings: settingsIdAndInputSelector,
    type: 'email',
    events: {
      blur: validateField,
    },
    pattern: emailPattern,
  },
  {
    fieldLabel: 'First name',
    fieldName: 'first_name',
    settings: settingsIdAndInputSelector,
    pattern: namePattern,
    events: {
      blur: validateField,
    },
  },
  {
    fieldLabel: 'Second name',
    fieldName: 'second_name',
    settings: settingsIdAndInputSelector,
    pattern: namePattern,
    events: {
      blur: validateField,
    },
  },
  {
    fieldLabel: 'Phone',
    fieldName: 'phone',
    settings: settingsIdAndInputSelector,
    pattern: phonePattern,
    events: {
      blur: validateField,
    },
  },
  {
    fieldLabel: 'Login',
    fieldName: 'login',
    settings: settingsIdAndInputSelector,
    pattern: loginPattern,
    events: {
      blur: validateField,
    },
  },
  {
    fieldLabel: 'Password',
    fieldName: 'password',
    settings: settingsIdAndInputSelector,
    pattern: passwordPattern,
    type: 'password',
    events: {
      blur: validateField,
    },
  },
  {
    fieldLabel: 'Repeat password',
    fieldName: 'repeatPass',
    settings: settingsIdAndInputSelector,
    type: 'password',
    events: {
      blur: validatePasswordMatch,
    },
  },
];

const button = new Button({
  label: 'sign up',
  settings: settingsWithId,
  type: 'submit',
});

const link = new Link({
  linkText: 'Back to sign in',
  href: routes.signin,
});

export const signupProps = {
  fields: singupFormFields.map((el) => new FormField(el)),
  events: {
    submit: async (e: Event) => {
      e.preventDefault()
      const data = getFormValues(e)
      
      AuthController.signup({data});
    },
  },
  settings: settingsIdandFormSelector,
  formTitle: 'SIGN UP',
  button,
  link,
}
