import { ErrorComponent } from '../../components/ErrorComponent/ErrorComponent';
import { Link } from '../../components/Link/Link';

const link = new Link({
  linkText: 'Back',
  href: 'chat',
});

export const notFoundPage = new ErrorComponent({
  message: 'not found',
  code: '404',
  link,
});
