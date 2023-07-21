import { AvatarInput } from '../AvatarInput/AvatarInput';
import { CommonProps } from '../../types/common';
import { ProfileField } from './ProfileField';
import { Block } from '../../utils/block';
import { Button } from '../Button/Button';
import { Link } from '../Link/Link';

import styles from './profileForm.module.scss';
import { State, withStore } from '../../utils/store';
import { User } from '../../api/AuthApi';

interface ProfileProps extends CommonProps {
  fields: ProfileField[];
  avatar: AvatarInput;
  exitBtn: Button;
  button: Button;
  passwordUpdate: typeof Link;
  link: typeof Link;
  user?: User
}

type UserKeys = keyof User

const template = `
  <form class="${styles.profileForm}" enctype="multipart/form-data">
    <div class="${styles.exitBtnContainer}">{{{ exitBtn }}}</div>
    {{{ avatar }}}
    {{#each fields}}
      {{{ this }}}
    {{/each}}
    {{{ passworUpdate }}}
    {{{ button }}}
    {{{ link }}}
  </form>`;

class BaseProfile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super(props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add('centeredContainer');
  }

  render() {
    const { passwordUpdate, exitBtn, avatar, button, fields, link, user } = this.props

    if (user && user.avatar && !Array.isArray(this.children.avatar)) this.children.avatar.setProps({src: `https://ya-praktikum.tech/api/v2/resources${user.avatar}`})
  
      for (const key in user) {
        if (key === 'avatar' && user[key]) continue
        const element: HTMLInputElement | null = document.querySelector(`input[name="${key}"]`)
        if (element) element.value = user[key as UserKeys]
      }

    return this.compile(template, {
      passwordUpdate,
      exitBtn,
      avatar,
      button,
      fields,
      link,
    });
  }
}

function mapStateToProps(state: State) {
  return { user: state.user };
}

export const Profile = withStore(mapStateToProps)(BaseProfile as typeof Block);
