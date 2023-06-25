import { CommonProps } from '../../types/common';
import { ProfileField } from './ProfileField';
import { AvatarInput } from '../AvatarInput/AvatarInput';
import styles from './profileForm.module.scss';
import { Block } from '../../utils/block';
import { Button } from '../Button/Button';

import { Link } from '../Link/Link';

interface ProfileProps extends CommonProps {
  fields: ProfileField[];
  avatar: AvatarInput;
  button: Button;
  link: Link;
}

const template = `
  <form class="${styles.profileForm}">
    {{{ avatar }}}
    {{#each fields}}
      {{{ this }}}
    {{/each}}
    {{{ button }}}
    {{{ link }}}
  </form>`;

export class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super('div', props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add('centeredContainer');
  }

  render() {
    return this.compile(template, {
      avatar: this.props.avatar,
      button: this.props.button,
      fields: this.props.fields,
      link: this.props.link,
    });
  }
}
