import ChatController from '../controllers/ChatController'

export class ChatSocket {
  static apiUrl = 'wss://ya-praktikum.tech/ws/chats'
  private _token = ''
  private _chatId = ''
  private _userId = ''
  public chat?: WebSocket
  

  constructor(chatId: string, userId: string) {
    this._chatId = chatId

    this._userId = userId

    this._createChat(chatId)
  }

  private async _createChat(id: string) {
    const token = await ChatController.createToken(id)

    if (token) {
      this._token = token

      this.chat = new WebSocket(`${ChatSocket.apiUrl}/${this._userId}/${this._chatId}`)

      this.chat.addEventListener('open', () => {
        console.log('chat connected');
      
        if (this.chat) this.chat.send(JSON.stringify({
          content: 'Hello chat!',
          type: 'message',
        }));
      });
      
      this.chat.addEventListener('close', event => {
      if (event.wasClean) {
        console.log('chat is closed');
      } else {
        console.log('connection lose');
      }
  
      console.log(`Code: ${event.code} | reason: ${event.reason}`);
      });
      
      this.chat.addEventListener('message', event => {
      console.log('message', event.data);
      });
      
      this.chat.addEventListener('error', event => {
      console.log('Error', event.message);
      });
    }
  }

  public sendMessage(message: string) {
    if (this.chat) {
      this.chat.send(JSON.stringify({
        content: message,
        type: 'message',
      }));
    }
  }
}
