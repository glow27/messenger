import { notFoundPage } from './pages/errors';
import { profileForm } from './pages/profile';
import { signinForm } from './pages/signin';
import { signupForm } from './pages/signup';
import { chatPage } from './pages/chat';

const routes = {
  signin: '/signin',
  signup: '/signup',
  profile: '/profile',
  chat: '/chat'
}

const body = document.querySelector('body');
const main = body.querySelector('main')

switch (window.location.pathname) {
  case '/':
  case routes.signin: {
    main.innerHTML = signinForm;

    break;
  }
  case routes.chat: {
    main.innerHTML = chatPage;

    break;
  }
  case routes.signup: {
    main.innerHTML = signupForm;

    break;
  }
  case routes.profile: {
    main.innerHTML = profileForm;

    break;
  }
  default: {
    main.innerHTML = notFoundPage;
  }
}
