import { API } from './api';

type Token = {token: string}

export type Message = {
  chat_id: number,
  time: string,
  type: string,
  user_id: number,
  content?: string,
}

export class MessagesAPI extends API {
  constructor() {
    super('/chats');
  }

  createToken(id: number) {
    return this.http.post<Token>(`/token/${id}`);
  }


}
