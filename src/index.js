import Handlebars from 'handlebars';
import form from './templates/form.tmpl';
import errorPage from './templates/errorPage.tmpl'
import button from './partials/button';
import link from './partials/link'
import formField from './partials/formField';
import { routes, singinFormFields, singupFormFields } from './consts';

Handlebars.registerPartial('button', button);
Handlebars.registerPartial('link', link);
Handlebars.registerPartial('formField', formField);

const formTemplate = Handlebars.compile(form);
const errorTemplate = Handlebars.compile(errorPage);

const body = document.querySelector('body');

switch (window.location.pathname) {
  case '/':
  case routes.signin: {
    const result = formTemplate({
      formTitle: 'SIGN IN',
      btnLabel: 'sing in',
      fields: singinFormFields,
      link: 'signup',
      linkText: 'Create account',
    });

    body.innerHTML = result;

    break;
  }
  case routes.signup: {
    const result = formTemplate({
      formTitle: 'SIGN UP',
      btnLabel: 'sing up',
      fields: singupFormFields,
      link: 'signin',
      linkText: 'Back to sign in',
    });

    body.innerHTML = result;

    break;
  }
  default: {
    const result = errorTemplate({
      code: '404',
      messege: 'not found',
      link: '/chat',
      linkText: 'Back',
    });

    body.innerHTML = result;
  }
}
