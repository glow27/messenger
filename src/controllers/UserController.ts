import { UpdatePasswordData, UpdateProfileData, UserAPI } from '../api/UserApi';
import { routes } from '../pages/consts';
import { RequestPayload } from '../types/common';
import { appRouter } from '../utils/router';
import store from '../utils/store';

class UserController {
  private api = new UserAPI();

  async updateAvatar(data: RequestPayload<FormData>) {
    try {
      const res = await this.api.updateAvatar(data);

      store.set('user', res.data);

    } catch (error) {
      console.error(error);
    }
  }

  async updateProfile(data: RequestPayload<UpdateProfileData>) {
    try {
      const res = await this.api.updateProfile(data);

      if (res.data) {
        store.set('user', res.data);
      }
    
    } catch (error) {
      console.error(error);
    }
  }

  async updatePassword(data: RequestPayload<UpdatePasswordData>) {
    try {
      const res = await this.api.updatePassword(data);

      if (res.status === 400) {
        appRouter.go(routes.passwordError);
      } else if (res.status === 200) {
        appRouter.go(routes.profile)
      }

    } catch (error) {
      console.error(error);
    }
  }
}

export default new UserController();
