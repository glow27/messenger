import { RequestPayload } from '../types/common';
import { User } from './AuthApi';
import { API } from './api';

export type CreateChat = {
  title: string
}

export type AddChatUser = {
  users: number[],
  chatId: number
}

export type Chat = {
  id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
      user: User,
      time: Date,
      content: string,
    }
};

export class ChatAPI extends API {
  constructor() {
    super('/chats');
  }

  getChats() {
    return this.http.get<Chat[]>('');
  }

  getChatUsers(id: number) {
    return this.http.get<User[]>(`/${id}/users`);
  }

  createChat(data: RequestPayload<CreateChat>) {
    return this.http.post('', data);
  }

  addChatUser(data: RequestPayload<AddChatUser>) {
    return this.http.put('/users', data);
  }

  deleteChatUser(data: RequestPayload<AddChatUser>) {
    return this.http.delete('/users', data);
  }

}
