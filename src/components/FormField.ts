import { Block } from "../utils/block";

interface FormFieldProps {
  fieldName: string;
  fieldLabel: string;
}

const template = `
  {{ fieldLabel }}
  <input type="text" name={{ fieldName }} class="formField" />`;

export class FormField extends Block {
  constructor(props) {
    super("label", props);
  }

  render() {
    const { fieldLabel, fieldName } = this.props;

    return this.compile(template, { fieldLabel, fieldName });
  }
}
