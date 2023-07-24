import { ChatAPI, CreateChat } from '../api/ChatApi';

import { RequestPayload } from '../types/common';

import store from '../utils/store';

class ChatController {
  private api = new ChatAPI();

  async createChat(data: RequestPayload<CreateChat>) {
    try {
      const res = await this.api.createChat(data);

      if (res.status === 200) {
        this.getChats()
      }

    } catch (error) {
      console.error(error);
    }
  }

  async getChats() {
    try {
      const res = await this.api.getChats();

      if (res.status === 200 && res.data.length) {
        store.set('chats', res.data);
        store.set('currentChatId', res.data[0].id)
        this.getChatUsers(res.data[0].id)
      }

    } catch (error) {
      console.error(error);
    }
  }

  async getChatUsers(id: number) {
    try {
      const res = await this.api.getChatUsers(id);

      if (res.status === 200) {
        store.set('chatUsers', res.data);
      }
    
    } catch (error) {
      console.error(error);
    }
  }

  async addChatUser(id: number) {
    try {
      const currentChatId = store.getState().currentChatId

      if (currentChatId) {
        const data = { 
          users: [id],
          chatId: currentChatId
        }

        const res = await this.api.addChatUser({data});
  
        if (res.status === 200) {
          this.getChatUsers(currentChatId)
        }
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  async deleteChatUser(id: number) {
    try {
      const currentChatId = store.getState().currentChatId

      if (currentChatId) {
        const data = { 
          users: [id],
          chatId: currentChatId
        }

        const res = await this.api.deleteChatUser({data});
  
        if (res.status === 200) {
          const curUsers = store.getState().chatUsers
          store.set('chatUsers', curUsers?.filter(el => el.id !== id))
        }
      }

    } catch (error) {
      console.error(error);
    }
  }

}

export default new ChatController();
