import { RequestPayload } from '../types/common';
import { API } from './api';

export type UpdateProfileData = {
  id?: number;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  email?: string;
  phone?: string;
  avatar?: string;
};

export type UpdatePasswordData = {
  oldPassword: string
  newPassword: string
}


export class UserAPI extends API {
  constructor() {
    super('/user');
  }

  updateAvatar(data: RequestPayload<FormData>) {
    return this.http.put('/profile/avatar', data);
  }

  updateProfile(data: RequestPayload<UpdateProfileData>) {
    return this.http.put('/profile', data);
  }

  updatePassword(data: RequestPayload<UpdatePasswordData>) {
    return this.http.put<UpdatePasswordData>('/password', data);
  }

}
