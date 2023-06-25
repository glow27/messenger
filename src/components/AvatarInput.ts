import emptyAva from '../../static/emptyAva.png';
import { CommonProps } from '../types/common';
import { Block } from '../utils/block';

interface AvatarInputProps extends CommonProps {
  src?: string;
}

const template = `
    <label class="avatarLabel"><img class="avatarImg" src=${emptyAva} width="120" height="120" />
    <input type="file" class="avatarInput" name="avatar" accept="image/png, image/jpeg" /></label>`;

export class AvatarInput extends Block<AvatarInputProps> {
  constructor(props: AvatarInputProps) {
    super('div', props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add('avatarContainer');
  }

  render() {
    return this.compile(template, { src: this.props.src });
  }
}
