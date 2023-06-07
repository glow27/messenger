import { singupFormFields } from '../../consts';
import { formTemplate } from '../../utils/templator';

export const signupForm = formTemplate({
  formTitle: 'SIGN UP',
  btnLabel: 'sing up',
  fields: singupFormFields,
  link: 'signin',
  linkText: 'Back to sign in',
});
