import { getFormValues, validateField, validatePasswordMatch } from '../../utils/helpers';
import { FormField, FormFieldProps } from '../../components/AuthForm/FormField';
import UserController from '../../controllers/UserController';
import { passwordPattern } from '../../utils/regexPatterns';
import { Button } from '../../components/Button/Button';
import { Link } from '../../components/Link/Link';
import {
  routes,
  settingsIdandFormSelector,
  settingsIdAndInputSelector,
  settingsWithId,
} from '../consts';

const passwordFields: FormFieldProps[] = [
  {
    fieldLabel: 'Old password',
    fieldName: 'oldPassword',
    type: 'password',
    events: {
      blur: validateField,
    },
    pattern: passwordPattern,
    settings: settingsIdAndInputSelector,
  },
  {
    fieldLabel: 'New password',
    fieldName: 'newPassword',
    type: 'password',
    events: {
      blur: validateField,
    },
    settings: settingsIdAndInputSelector,
    pattern: passwordPattern,
  },
  {
      fieldLabel: 'Repeat password',
      fieldName: 'repeatPass',
      type: 'password',
      settings: settingsIdAndInputSelector,
      events: {
        blur: (e: Event) => validatePasswordMatch(e, 'newPassword'),
      },
    }
];

const button = new Button({
  label: 'update',
  settings: settingsWithId,
  type: 'submit',
});

const link = new Link({
  linkText: 'Back to profile',
  href: routes.profile,
});

export const updatePasswordProps = {
  fields: passwordFields.map((el) => new FormField(el)),
  events: {
    submit: async (e: Event) => {
      e.preventDefault()
      const data = getFormValues(e)
      
      UserController.updatePassword({data})
    },
  },
  settings: settingsIdandFormSelector,
  formTitle: 'UPDATE PASSWORD',
  button,
  link,
}
