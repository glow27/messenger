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

switch (window.location.pathname) {
  case '/':
  case routes.signin: {
    body.innerHTML = signinForm;

    break;
  }
  case routes.chat: {
    body.innerHTML = chatPage;

    break;
  }
  case routes.signup: {
    body.innerHTML = signupForm;

    break;
  }
  case routes.profile: {
    body.innerHTML = profileForm;

    break;
  }
  default: {
    body.innerHTML = notFoundPage;
  }
}
