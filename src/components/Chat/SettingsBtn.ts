import settingsIcon from '../../../static/set.png';
import { CommonProps } from '../../types/common';
import { Block } from '../../utils/block';

const template = `<img src=${settingsIcon} />`;

export class SettingsBtn extends Block<CommonProps> {
  constructor(props: CommonProps) {
    super(props, 'button');
  }

  init() {
    const currentElement = this.getContent();

    if (currentElement) {
      currentElement.setAttribute('type', 'button');
    }
  }

  render() {
    return this.compile(template, {});
  }
}
