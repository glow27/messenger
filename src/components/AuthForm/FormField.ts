import { CommonProps } from '../../types/common';
import { Block } from '../../utils/block';
import styles from './authForm.module.scss'

export interface FormFieldProps extends CommonProps {
  fieldName: string;
  fieldLabel: string;
  pattern?: string;
  type?: string;
}

const template = `
  <span>{{ fieldLabel }}</span>
  <input name={{ fieldName }} class="${styles.formField}" 
    {{#if type}} type={{ type }} {{/if}}
    {{#if pattern}} pattern={{ pattern }} {{/if}}
    required
  />`;

export class FormField extends Block<FormFieldProps> {
  constructor(props: FormFieldProps) {
    super('label', props);
  }

  render() {
    const { fieldLabel, fieldName, pattern, type } = this.props;

    return this.compile(template, { fieldLabel, fieldName, pattern, type });
  }
}
