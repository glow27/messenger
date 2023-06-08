import Handlebars from 'handlebars';

import errorPage from '../components/templates/errorPage.tmpl'
import profilePage from '../components/templates/profile.tmpl'
import formField from '../components/partials/formField';
import form from '../components/templates/form.tmpl';
import button from '../components/partials/button';
import link from '../components/partials/link'

Handlebars.registerPartial('formField', formField);
Handlebars.registerPartial('button', button);
Handlebars.registerPartial('link', link);

export const profileTemplate = Handlebars.compile(profilePage);
export const errorTemplate = Handlebars.compile(errorPage);
export const formTemplate = Handlebars.compile(form);
