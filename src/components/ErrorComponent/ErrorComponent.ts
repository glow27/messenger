import { Block } from '../../utils/block';
import { Link } from '../Link/Link';
import styles from './error.module.scss';

interface ErrorComponentProps {
  message: string;
  code: string;
  link: Link;
}

const template = `
  <div>
    <h1>{{ code }}</h1>
    <h3>{{ message }}</h3>
    {{{ link }}}
  </div>`;

export class ErrorComponent extends Block<ErrorComponentProps> {
  constructor(props: ErrorComponentProps) {
    super('div', props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add(styles.errorPageContainer);
  }

  render() {
    return this.compile(template, {
      message: this.props.message,
      code: this.props.code,
      link: this.props.link,
    });
  }
}
