import { ProfileField } from '../../components/ProfileForm/ProfileField';
import { AvatarInput } from '../../components/AvatarInput/AvatarInput';
import { Profile } from '../../components/ProfileForm/Profile';
import { Button } from '../../components/Button/Button';
import { Link } from '../../components/Link/Link';
import {
  settingsIdandFormSelector,
  settingsIdAndInputSelector,
  settingsWithId,
} from '../consts';
import {
  submitFormValues,
  validateField,
  validatePasswordMatch,
} from '../../utils/helpers';
import {
  emailPattern,
  loginPattern,
  passwordPattern,
  phonePattern,
} from '../../utils/regexPatterns';

const profileFormFields = [
  {
    fieldLabel: 'Nickname',
    fieldName: 'display_name',
    settings: settingsIdAndInputSelector,
  },
  {
    fieldLabel: 'Email',
    fieldName: 'email',
    settings: settingsIdAndInputSelector,
    events: {
      blur: validateField,
    },
    pattern: emailPattern,
  },
  {
    fieldLabel: 'First name',
    fieldName: 'first_name',
    settings: settingsIdAndInputSelector,
    events: {
      blur: validateField,
    },
  },
  {
    fieldLabel: 'Second name',
    fieldName: 'second_name',
    settings: settingsIdAndInputSelector,
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
    events: {
      blur: validateField,
    },
  },
  {
    fieldLabel: 'Repeat password',
    fieldName: 'repeatPass',
    settings: settingsIdAndInputSelector,
    events: {
      blur: validatePasswordMatch,
    },
  },
];

const avatar = new AvatarInput({});

const button = new Button({
  label: 'SAVE',
  type: 'submit',
  settings: settingsWithId,
});

const link = new Link({
  linkText: 'Back to chat',
  href: 'chat',
});

export const profileForm = new Profile({
  fields: profileFormFields.map((el) => new ProfileField(el)),
  events: {
    submit: submitFormValues,
  },
  settings: settingsIdandFormSelector,
  avatar,
  button,
  link,
});
