import { CommonProps, UnknownObject } from '../../types/common';
import { Block } from '../../utils/block';
import store, { State, withStore } from '../../utils/store';
import { Chat } from '../../api/ChatApi';
import ChatController from '../../controllers/ChatController';
import noChatAva from '../../../static/casino.png';
import { ChatContact } from './Contact';
import { settingsWithId } from '../../pages/consts';

type ChatSettingsProps = {
  chats: Chat[],
  chatId: number
} & CommonProps

const template = `
  {{#if chats}}
    {{#each chats}}
      {{{this}}}
    {{/each}}
  {{/if}}
`;

const setCurrentChatId = async (id: number) => {
   await ChatController.getChatUsers(id)
   store.set('currentChatId', id)
} 

const getChats = async () => {
  await ChatController.getChats()
}

class BaseList extends Block<ChatSettingsProps> {
  constructor(props: ChatSettingsProps) {
    super(props);
  }

  componentDidMount() {
    getChats()
  }

  protected async componentDidUpdate(oldProps: ChatSettingsProps, newProps: ChatSettingsProps) {
    if (newProps.chats && oldProps.chats && oldProps.chats.length === newProps.chats.length && oldProps.chatId === newProps.chatId){ 
      
      return false}

    if (!newProps?.chats) { 
      
      return false
    }

      const chats = newProps.chats.map(({id, title, avatar, unread_count, last_message}) => {
      
        return new ChatContact({
          imgSrc: avatar ? `https://ya-praktikum.tech/api/v2/resources${avatar}` : noChatAva,
          content: last_message ? last_message.content : '',
          time: last_message  ? new Date(last_message.time).toLocaleDateString() : '',
          settings: settingsWithId, 
          events: {
            click: () => setCurrentChatId(id)
          },
          unread_count,
          title
        })
      })
  
      this.children.chats = chats

      return true
  }


  render() {
    return this.compile(template, {});
  }
}

function mapStateToProps(state: State) {
  return { chats: state.chats, chatId: state.currentChatId };
}

export const ChatsList = withStore(mapStateToProps)(BaseList as typeof Block);

