import { CommonProps } from '../../types/common';
import { Block } from '../../utils/block';
import { Button } from '../Button/Button';
import { FormField } from './FormField';
import { Link } from '../Link/Link';

import styles from './authForm.module.scss';

interface FormProps extends CommonProps {
  fields: FormField[];
  formTitle: string;
  button: Button;
  link: Link;
}

const template = `
  <form class="${styles.authForm}">
    <h3>{{ formTitle }}</h3>
    {{#each fields}}
      {{{ this }}}
    {{/each}}
    {{{ button }}}
    {{{ link }}}
  </form>`;

export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super('div', props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add('centeredContainer');
  }

  render() {
    return this.compile(template, {
      formTitle: this.props.formTitle,
      button: this.props.button,
      fields: this.props.fields,
      link: this.props.link,
    });
  }
}
