import { CommonProps } from '../../types/common';
import { Block } from '../../utils/block';

import styles from './profileForm.module.scss'

interface ProfileFieldProps extends CommonProps {
  fieldName: string;
  fieldLabel: string;
  required?: boolean;
  pattern?: string;
  type?: string;
  value?: string
}

const template = `
  {{ fieldLabel }}
  <input type="text"  name={{ fieldName }} class="${styles.profileField}" {{#if value}} value={{ value }} {{/if}}
    {{#if type}} type={{ type }} {{/if}}
    {{#if pattern}} pattern={{ pattern }} {{/if}}
    {{#if required}} required {{/if}}
  />`;

export class ProfileField extends Block<ProfileFieldProps> {
  constructor(props: ProfileFieldProps) {
    super(props, 'label');
  }

  render() {
    const { fieldLabel, fieldName, pattern, type, required, value } = this.props;

    return this.compile(template, { fieldLabel, fieldName, pattern, type, required, value });
  }
}
