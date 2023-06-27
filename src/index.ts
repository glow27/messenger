import { signinForm } from './pages/signin/index';
import { notFoundPage } from './pages/errors';
import { profileForm } from './pages/profile';
import { signupForm } from './pages/signup';
import { render } from './utils/renderDom';
import { chatPage } from './pages/chat';

const routes = {
  profile: '/profile',
  signin: '/signin',
  signup: '/signup',
  chat: '/chat',
};

window.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const main = body && body.querySelector('main');

  if (main) {
    switch (window.location.pathname) {
      case '/':
      case routes.signin: {
        render('main', signinForm);

        break;
      }
      case routes.chat: {
        render('main', chatPage);

        break;
      }
      case routes.signup: {
        render('main', signupForm);

        break;
      }
      case routes.profile: {
        render('main', profileForm);

        break;
      }
      default: {
        render('main', notFoundPage);
      }
    }
  }
});
