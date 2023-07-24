import { RequestPayload } from '../types/common';
import { API } from './api';

export type SignUpData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignInData = {
  login: string;
  password: string;
};

export type User = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  id: number
};

export class AuthAPI extends API {
  constructor() {
    super('/auth');
  }

  signin(data: RequestPayload<SignInData>) {
    return this.http.post('/signin', data);
  }

  signup(data: RequestPayload<SignUpData>) {
    return this.http.post('/signup', data);
  }

  logout() {
    return this.http.post('/logout');
  }

  getUser() {
    return this.http.get('/user');
  }
}
