import { ProfileField } from '../../components/ProfileForm/ProfileField';
import { AvatarInput } from '../../components/AvatarInput/AvatarInput';
import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';
import { Button } from '../../components/Button/Button';
import { Link } from '../../components/Link/Link';
import {
  routes,
  settingsIdandFormSelector,
  settingsIdAndInputSelector,
  settingsWithId,
} from '../consts';
import {
  getFormValues,
  validateField,
} from '../../utils/helpers';
import {
  emailPattern,
  loginPattern,
  phonePattern,
} from '../../utils/regexPatterns';

const uploadAvatar = (e: Event) => {
  const input = e.target as HTMLInputElement;

  if (input && input.files) {
    const avatar = input.files[0] as File;

    const form = new FormData();

    form.append('avatar', avatar);

    UserController.updateAvatar({ data: form, isAvatar: true });
  }
};

const submitProfile = async (e: Event) => {
  e.preventDefault();
  const data = getFormValues(e);
  UserController.updateProfile({data})
}

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
    required: true,
  },
  {
    fieldLabel: 'First name',
    fieldName: 'first_name',
    settings: settingsIdAndInputSelector,
    events: {
      blur: validateField,
    },
    required: true,
  },
  {
    fieldLabel: 'Second name',
    fieldName: 'second_name',
    settings: settingsIdAndInputSelector,
    events: {
      blur: validateField,
    },
    required: true,
  },
  {
    fieldLabel: 'Phone',
    fieldName: 'phone',
    settings: settingsIdAndInputSelector,
    pattern: phonePattern,
    events: {
      blur: validateField,
    },
    required: true,
  },
  {
    fieldLabel: 'Login',
    fieldName: 'login',
    settings: settingsIdAndInputSelector,
    pattern: loginPattern,
    events: {
      blur: validateField,
    },
    required: true,
  },
];

const avatar = new AvatarInput({
  settings: settingsIdAndInputSelector,
  events: {
    change: uploadAvatar,
  },
});

const button = new Button({
  label: 'SAVE',
  type: 'submit',
  settings: settingsWithId,
});

const logout = () => {
  AuthController.logout();
};

const exitBtn = new Button({
  label: 'log out',
  settings: settingsWithId,
  events: {
    click: logout,
  },
});

const link = new Link({
  linkText: 'Back to chat',
  href: routes.chat,
});

const passworUpdate = new Link({
  linkText: 'update password',
  href: routes.updatePassword,
});

export const profileProps = {
  fields: profileFormFields.map((el) => new ProfileField(el)),
  events: {
    submit: submitProfile,
  },
  settings: settingsIdandFormSelector,
  passworUpdate,
  exitBtn,
  avatar,
  button,
  link,
};
