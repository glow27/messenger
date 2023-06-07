import Handlebars from 'handlebars';

import form from '../components/templates/form.tmpl';
import errorPage from '../components/templates/errorPage.tmpl'
import button from '../components/partials/button';
import link from '../components/partials/link'
import formField from '../components/partials/formField';

Handlebars.registerPartial('button', button);
Handlebars.registerPartial('link', link);
Handlebars.registerPartial('formField', formField);

export const formTemplate = Handlebars.compile(form);
export const errorTemplate = Handlebars.compile(errorPage);
