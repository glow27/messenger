import { formTemplate } from '../../utils/templator';
import { singinFormFields } from '../../consts';

export const signinForm = formTemplate({
  formTitle: 'SIGN IN',
  btnLabel: 'sing in',
  fields: singinFormFields,
  link: 'signup',
  linkText: 'Create account',
});
