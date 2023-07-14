import emptyAva from '../../../static/emptyAva.png';
import { CommonProps } from '../../types/common';
import { Block } from '../../utils/block';
import styles from './avatar.module.scss'

interface AvatarInputProps extends CommonProps {
  src?: string;
}

const template = `
    <label class="${styles.avatarLabel}"><img class="${styles.avatarImg}" src="{{ src }}" width="120" height="120" />
    <input type="file" class="${styles.avatarInput}" name="avatar" accept="image/png, image/jpeg" /></label>`;

export class AvatarInput extends Block<AvatarInputProps> {
  constructor(props: AvatarInputProps) {
    super(props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add(styles.avatarContainer);
  }

  render() {
    const { src = emptyAva } = this.props;

    return this.compile(template, { src });
  }
}
