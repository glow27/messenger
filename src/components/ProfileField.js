import Handlebars from 'handlebars';

export const ProfileField = ({ fieldName, fieldLabel }) =>
  Handlebars.compile(`
  <div class="profileField">
    <label for={{ fieldName }} >{{ fieldLabel }}</label>
    <input type="text"  name={{ fieldName }} id={{ fieldName }}  />
  </div>`)(
    { fieldName, fieldLabel }
  );
