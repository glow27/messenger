import { profileTemplate } from '../../components/templates/profile.tmpl';
import { ProfileField } from '../../components/ProfileField';
import { AvatarInput } from '../../components/AvatarInput';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import { singupFormFields } from '../consts';

const profileFormFields = [
  { fieldLabel: 'Nickname', fieldName: 'display' },
  ...singupFormFields
];

export const profileForm = profileTemplate({
  avatar: AvatarInput(),
  button: Button({ label: 'SAVE' }),
  fields: profileFormFields.map((el) => ProfileField(el)),
  link: Link({ href: 'chat', linkText: 'Back to chat' }),
});
