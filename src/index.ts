import { signinProps } from './pages/signin/index';

import { profileProps } from './pages/profile';
import { signupProps } from './pages/signup';

import { appRouter } from './utils/router';
import { Form } from './components/AuthForm/Form';
import { routes } from './pages/consts';
import { Profile } from './components/ProfileForm/Profile';
import { chatProps } from './pages/chat';
import { Chat } from './components/Chat/Chat';
import { ErrorComponent } from './components/ErrorComponent/ErrorComponent';
import { notFoundPageProps } from './pages/errors';
import { Block } from './utils/block';

window.addEventListener('DOMContentLoaded', () => {
  appRouter.use(routes.signin, Form as typeof Block, signinProps)
  appRouter.use(routes.signup, Form as typeof Block, signupProps)
  appRouter.use(routes.profile, Profile as typeof Block, profileProps)
  appRouter.use(routes.chat, Chat as typeof Block, chatProps)
  appRouter.use('', ErrorComponent as typeof Block, notFoundPageProps)

  appRouter.start()

    switch (window.location.pathname) {
      case '/':
      case routes.signin: {
        appRouter.go(routes.signin)

        break;
      }
      case routes.chat: {
        appRouter.go(routes.chat)

        break;
      }
      case routes.signup: {
        appRouter.go(routes.signup)

        break;
      }
      case routes.profile: {
        appRouter.go(routes.profile)

        break;
      }
      default: {
        appRouter.go('')
      }
    }
});
