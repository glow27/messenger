import { Block } from '../utils/block';
import { Link } from './Link';

interface ErrorComponentProps {
  messege: string;
  code: string;
  link: Link;
}

const template = `
  <div>
    <h1>{{ code }}</h1>
    <h3>{{ messege }}</h3>
    {{{ link }}}
  </div>`;

export class ErrorComponent extends Block<ErrorComponentProps> {
  constructor(props: ErrorComponentProps) {
    super('div', props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add('errorPageContainer');
  }

  render() {
    return this.compile(template, {
      messege: this.props.messege,
      code: this.props.code,
      link: this.props.link,
    });
  }
}
