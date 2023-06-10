import Handlebars from 'handlebars';

export const FormField = ({ fieldName, fieldLabel }) =>
  Handlebars.compile(`
    <label for={{ fieldName }} >{{ fieldLabel }}</label>
    <input type="text"  name={{ fieldName }} id={{ fieldName }} class="formField" />`
  )({ fieldName, fieldLabel });
