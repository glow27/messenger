import Handlebars from 'handlebars';

interface FormFieldProps {
  fieldName: string;
  fieldLabel: string;
}

export const FormField = ({ fieldName, fieldLabel }: FormFieldProps) =>
  Handlebars.compile(`
    <label for={{ fieldName }} >{{ fieldLabel }}</label>
    <input type="text"  name={{ fieldName }} id={{ fieldName }} class="formField" />`
  )({ fieldName, fieldLabel });
