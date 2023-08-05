import MessagesController from '../controllers/MessagesController'

export class ChatSocket {
  static apiUrl = 'wss://ya-praktikum.tech/ws/chats'
  private _chatId
  private _userId
  private chat?: WebSocket
  private _pingInterval: NodeJS.Timer | null = null
  

  constructor(chatId: number, userId: number) {
    this._chatId = chatId

    this._userId = userId

  }

  public async createChat() {
    try {
      const token = await MessagesController.createToken(this._chatId)

      if (token) {
  
        this.chat = new WebSocket(`${ChatSocket.apiUrl}/${this._userId}/${this._chatId}/${token}`)

        this.chat.addEventListener('open', () => {
          console.log('chat connected');
          
          if (this.chat) {
            this.chat.send(JSON.stringify({
              content: '0',
              type: 'get old',
            }));

            this.chat.send(JSON.stringify({
            content: 'Chat connected!',
            type: 'message',
          }));
        }
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
           this.getMessage(event.data)
        }); 
        
        this.chat.addEventListener('error', event => {
        console.log('Error', event);
        });

        this.setPing()

        return true
      }
    } catch (error) {
      console.error(error);
      return false
    }

    return false
  }

  private getMessage(message: string) {
    const parsedMessage = JSON.parse(message)

    MessagesController.getMessage(parsedMessage)
  }

  public sendMessage(message: string) {
    if (this.chat) {
      this.chat.send(JSON.stringify({
        content: message,
        type: 'message',
      }));
    }
  }

  public closeChat() {
    if (this.chat) {
      if (this._pingInterval) clearInterval(this._pingInterval)
      this._pingInterval = null
      this.chat.close();
    }
  }

  private setPing() {
    this._pingInterval = setInterval(() => {
        this.chat?.send(JSON.stringify({type: 'ping'}))
      }, 50000
    )
  }
}
