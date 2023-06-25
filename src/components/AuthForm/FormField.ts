import { CommonProps } from '../../types/common';
import { Block } from '../../utils/block';
import styles from './authForm.module.scss'

export interface FormFieldProps extends CommonProps {
  fieldName: string;
  fieldLabel: string;
}

const template = `
  <span>{{ fieldLabel }}</span>
  <input type="text" name={{ fieldName }} class="${styles.formField}" />`;

export class FormField extends Block<FormFieldProps> {
  constructor(props: FormFieldProps) {
    super('label', props);
  }

  render() {
    const { fieldLabel, fieldName } = this.props;

    return this.compile(template, { fieldLabel, fieldName });
  }
}
