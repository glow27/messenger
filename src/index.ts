import { notFoundPage } from './pages/errors';
import { profileForm } from './pages/profile';
import { signupForm } from './pages/signup';
// import { chatPage } from './pages/chat';
import { render } from './utils/renderDom';
import { signinForm } from './pages/signin/index'

const routes = {
  signin: '/signin',
  signup: '/signup',
  profile: '/profile',
  chat: '/chat'
}

const body = document.querySelector('body');
const main = body && body.querySelector('main')

if (main) {
  switch (window.location.pathname) {
    case '/':
    case routes.signin: {
      render("main", signinForm);

      break;
    }
    // case routes.chat: {
    //   main.innerHTML = chatPage;
  
    //   break;
    // }
    case routes.signup: {
      render("main", signupForm);
  
      break;
    }
    case routes.profile: {
      render("main", profileForm);
  
      break;
    }
    default: {
      render("main", notFoundPage);
    }
  }
}
