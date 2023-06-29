import { CommonProps } from '../../types/common';
import { Block } from '../../utils/block';

interface ButtonProps extends CommonProps {
  label: string;
  type?: 'button' | 'submit' | 'reste';
}

const template = '{{label}}';

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  init() {
    const currentElement = this.getContent();

    if (currentElement) {
      const { type = 'button' } = this.props;

      currentElement.setAttribute('type', type);
    }
  }

  render() {
    const { label } = this.props;

    return this.compile(template, { label });
  }
}
