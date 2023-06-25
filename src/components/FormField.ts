import { CommonProps } from '../types/common';
import { Block } from '../utils/block';

export interface FormFieldProps extends CommonProps {
  fieldName: string;
  fieldLabel: string;
}

const template = `
  {{ fieldLabel }}
  <input type="text" name={{ fieldName }} class="formField" />`;

export class FormField extends Block<FormFieldProps> {
  constructor(props: FormFieldProps) {
    super('label', props);
  }

  render() {
    const { fieldLabel, fieldName } = this.props;

    return this.compile(template, { fieldLabel, fieldName });
  }
}
