import { Message, MessagesAPI } from '../api/MessagesApi';
import { ChatSocket } from '../utils/chatSocket';
import store from '../utils/store';

class MessagesController {
  private api = new MessagesAPI();

  async createToken(id: number) {
    try {
      const res = await this.api.createToken(id);

      if (res.status === 200) {
        return res.data.token
      }
    
    } catch (error) {
      console.error(error);
    }
  }

  async sendMessage(message: string) {
    try {

      const { currentChat } = store.getState()

      if (currentChat) currentChat.sendMessage(message)
      
    } catch (error) {
      console.error(error);
    }
  }

  async getMessage(message: Message | Message[]) {
    const curMessages = store.getState().messages

    if (Array.isArray(message)) {
      
     const filtered = message.filter(el => el.content !== 'Chat connected!')
      
      store.set('messages', [...filtered, ...curMessages])

      return
    }

    if (message.type === 'pong' || message.type === 'user connected') return
      
    store.set('messages', [message, ...curMessages])
      
  }

  async setCurrentChat() {
    try {
      const { user, currentChatId, currentChat, chatUsers } = store.getState()

      if (currentChat) currentChat.closeChat()

      if (!chatUsers || chatUsers.length < 2) return

      if (currentChatId && user?.id){
         const newChat = new ChatSocket(currentChatId, user.id)
         const isConnected = await newChat.createChat()

         store.set('messages', [])

         if (isConnected) store.set('currentChat', newChat)
    }
      
    } catch (error) {
      console.error(error);
    }
  }

}

export default new MessagesController();
