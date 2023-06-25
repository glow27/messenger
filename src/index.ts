import { signinForm } from './pages/signin/index';
import { notFoundPage } from './pages/errors';
import { profileForm } from './pages/profile';
import { signupForm } from './pages/signup';
import { render } from './utils/renderDom';
import { chatPage } from './pages/chat';
import { Block } from './utils/block';

const routes = {
  signin: '/signin',
  signup: '/signup',
  profile: '/profile',
  chat: '/chat',
};

window.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const main = body && body.querySelector('main');

  if (main) {
    switch (window.location.pathname) {
      case '/':
      case routes.signin: {
        render('main', signinForm as unknown as Block);

        break;
      }
      case routes.chat: {
        render('main', chatPage as unknown as Block);

        break;
      }
      case routes.signup: {
        render('main', signupForm as unknown as Block);

        break;
      }
      case routes.profile: {
        render('main', profileForm as unknown as Block);

        break;
      }
      default: {
        render('main', notFoundPage as unknown as Block);
      }
    }
  }
});
