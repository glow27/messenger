import { ErrorComponent } from './components/ErrorComponent/ErrorComponent';
import { notFoundPageProps, passwordErrorProps } from './pages/errors';
import { updatePasswordProps } from './pages/updatePassword';
import { Profile } from './components/ProfileForm/Profile';
import AuthController from './controllers/AuthController';
import { signinProps } from './pages/signin/index';
import { Form } from './components/AuthForm/Form';
import { profileProps } from './pages/profile';
import { Chat } from './components/Chat/Chat';
import { signupProps } from './pages/signup';
import { appRouter } from './utils/router';
import { chatProps } from './pages/chat';
import { routes } from './pages/consts';
import { Block } from './utils/block';

window.addEventListener('DOMContentLoaded', async () => {
  appRouter.use('/', Form as typeof Block, signinProps)
  .use(routes.signin, Form as typeof Block, signinProps)
  .use(routes.signup, Form as typeof Block, signupProps)
  .use(routes.profile, Profile as typeof Block, profileProps)
  .use(routes.chat, Chat as typeof Block, chatProps)
  .use('', ErrorComponent as typeof Block, notFoundPageProps)
  .use(routes.updatePassword, Form as typeof Block, updatePasswordProps)
  .use(routes.passwordError, ErrorComponent as typeof Block, passwordErrorProps)
  .start()

  let isProtectedRoute = true;

  // const res = await AuthController.fetchUser();

  // if (res.status === 200) {
  //   isProtectedRoute = false
  // }

  

    // switch (window.location.pathname) {
    //   case '/':
    //   case routes.signin: {
    //     appRouter.go(routes.signin)

    //     break;
    //   }
    //   case routes.chat: {
    //     appRouter.go(routes.chat)

    //     break;
    //   }
    //   case routes.signup: {
    //     appRouter.go(routes.signup)

    //     break;
    //   }
    //   case routes.profile: {
    //     appRouter.go(routes.profile)

    //     break;
    //   }
    //   default: {
    //     appRouter.go('')
    //   }
    // }
});
