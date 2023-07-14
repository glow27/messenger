import { AuthAPI, SignInData, SignUpData } from '../api/AuthApi';
import { routes } from '../pages/consts';
import { RequestPayload } from '../types/common';
import { appRouter } from '../utils/router';
import store from '../utils/store';

class AuthController {
  private api = new AuthAPI();

  async signin(data: RequestPayload<SignInData>) {
    try {
      const res = await this.api.signin(data);

      if (res.status === 200) {
        await this.fetchUser();

        appRouter.go(routes.chat);
      }

      
    } catch (error) {
      console.error(error);
    }
  }

  async signup(data: RequestPayload<SignUpData>) {
    try {
      const res = await this.api.signup(data);

      if (res.status === 200) {
        await this.fetchUser();

        appRouter.go(routes.chat);
      }

    } catch (error) {
      console.error(error);
    }
  }

  async logout() {
    try {
      await this.api.logout();

      appRouter.isProtected = false

      store.set('user', undefined);

      appRouter.go('/');
    } catch (error) {
      console.error(error);
    }
  }

  async fetchUser() {
    try {
      const { user } = store.getState();

      if (!user) {
        const res = await this.api.getUser();

        if (res.status === 200) {
          appRouter.isProtected = true
          store.set('user', res.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default new AuthController();
