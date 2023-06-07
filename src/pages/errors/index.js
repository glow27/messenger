import { errorTemplate } from '../../utils/templator';

export const notFoundPage = errorTemplate({
  code: '404',
  messege: 'not found',
  link: '/chat',
  linkText: 'Back',
});
