import { CommonProps } from '../../types/common';
import { Block } from '../../utils/block';
import { State, withStore } from '../../utils/store';
import ChatController from '../../controllers/ChatController';
import emptyAva from '../../../static/emptyAva.png';
import { User } from '../../api/AuthApi';
import { ChatUser } from './ChatUser';
import styles from './chat.module.scss';

type UsersLisProps = {
  users: User[],
  chatId?: number
} & CommonProps

const template = `
  {{#if users}}
    {{#each users}}
      {{{this}}}
    {{/each}}
  {{/if}}
`;

const deleteChatUser = async (id: number) => {
  await ChatController.deleteChatUser(id)
}

class BaseList extends Block<UsersLisProps> {
  constructor(props: UsersLisProps) {
    super(props);
  }

  async init() {
    const currentElement = this.getContent();
    currentElement?.classList.add(styles.usersList);
  }

  protected componentDidUpdate({users, chatId}: UsersLisProps, {users: newUsers, chatId: newChatId}: UsersLisProps): boolean {
      if (newUsers && newChatId && ( users?.length !== newUsers.length || chatId !== newChatId)) {
  
      const users = newUsers.map(({id, avatar }) => {
      
        return new ChatUser({
          imgSrc: avatar ? `https://ya-praktikum.tech/api/v2/resources${avatar}` : emptyAva,
          settings: {
            selectorForEvent: 'button',
            withId: true,
          }, 
          events: {
            click: () => deleteChatUser(id)
          },
        })
      })
  
      this.children.users = users
    
      return true
    }

      return false
  }


  render() {

    return this.compile(template, {});
  }
}

function mapStateToProps(state: State) {
  return { users: state.chatUsers, chatId: state.currentChatId };
}

export const UsersList = withStore(mapStateToProps)(BaseList as typeof Block);

