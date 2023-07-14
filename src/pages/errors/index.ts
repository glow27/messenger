import { Link } from '../../components/Link/Link';
import { routes } from '../consts';

const link = new Link({
  linkText: 'Back',
  href: routes.chat,
});

const updateLink = new Link({
  linkText: 'Back',
  href: routes.updatePassword,
});

export const notFoundPageProps = {
  message: 'not found',
  code: '404',
  link,
};

export const passwordErrorProps = {
  message: 'wrong password',
  link: updateLink,
  code: '400',
};
