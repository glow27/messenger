import { errorTemplate } from '../../components/templates/errorPage.tmpl';
import { Link } from '../../components/Link';

export const notFoundPage = errorTemplate({
  code: '404',
  messege: 'not found',
  link: Link({ href: '/chat', linkText: 'Back' }),
});
