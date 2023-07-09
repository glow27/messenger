import { Link } from '../../components/Link/Link';
import { routes } from '../consts';

const link = new Link({
  linkText: 'Back',
  href: routes.chat,
});

export const notFoundPageProps = {
  message: 'not found',
  code: '404',
  link,
};
