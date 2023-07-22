import { CommonProps } from '../../types/common';
import { ChatsList } from './ChatsList';
import { MessagesList } from './Messages';
import { Block } from '../../utils/block';
import styles from './chat.module.scss';
import { SettingsBtn } from './SettingsBtn';
import { Button } from '../Button/Button';

interface ChatProps extends CommonProps {
  settingsBtn: SettingsBtn;
  addBtn: Button;
  chatsList?: typeof ChatsList
  messagesList: typeof MessagesList
}

const template = `
  <div class="${styles.chat}">
    <div class="${styles.usersContainer}">
      <div class="${styles.addUser}">
        <input name="userId" placeholder="user id" type="number"></input>
        {{{ addUserBtn }}}
      </div>
      {{{ usersList }}}
    </div>

    {{{ messagesList }}}

    <form class="${styles.messageForm}">
      <textarea name="message" required ></textarea>
      <button>send</button>
    </form>
  </div>
  <div class="${styles.contacts}">
    <div class="${styles.settings}">
    <div class="${styles.addChat}">
      <input name="title" placeholder="chat title"></input>
      {{{ addChatBtn }}}
    </div>
    {{{ settingsBtn }}}
    </div>
    
    {{{ chatsList }}}
  </div>`;

export class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super(props);
  }

  async init() {
    const currentElement = this.getContent();
    currentElement?.classList.add('centeredContainer');
  }

  render() {
    const { settingsBtn, addBtn, chatsList, messagesList } = this.props;

    return this.compile(template, { settingsBtn, addBtn, chatsList, messagesList });
  }
}
