import Handlebars from 'handlebars';

interface ProfileFieldProps {
  fieldName: string;
  fieldLabel: string;
}

export const ProfileField = ({ fieldName, fieldLabel }: ProfileFieldProps) =>
  Handlebars.compile(`
  <div class="profileField">
    <label for={{ fieldName }} >{{ fieldLabel }}</label>
    <input type="text"  name={{ fieldName }} id={{ fieldName }}  />
  </div>`)(
    { fieldName, fieldLabel }
  );
