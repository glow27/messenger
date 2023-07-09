import { CommonProps } from '../../types/common';
import { Block } from '../../utils/block';

import styles from './profileForm.module.scss'

interface ProfileFieldProps extends CommonProps {
  fieldName: string;
  fieldLabel: string;
  pattern?: string;
  type?: string;
}

const template = `
  {{ fieldLabel }}
  <input type="text"  name={{ fieldName }} class="${styles.profileField}" 
    {{#if type}} type={{ type }} {{/if}}
    {{#if pattern}} pattern={{ pattern }} {{/if}}
    required
  />`;

export class ProfileField extends Block<ProfileFieldProps> {
  constructor(props: ProfileFieldProps) {
    super(props, 'label');
  }

  render() {
    const { fieldLabel, fieldName } = this.props;

    return this.compile(template, { fieldLabel, fieldName });
  }
}
