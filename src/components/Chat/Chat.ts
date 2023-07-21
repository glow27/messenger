import { CommonProps } from '../../types/common';
import { ChatsList } from './ChatsList';
import { ChatMessage } from './ChatMessage';
import { Block } from '../../utils/block';
import styles from './chat.module.scss';
import { SettingsBtn } from './SettingsBtn';
import { Button } from '../Button/Button';

interface ChatProps extends CommonProps {
  messages: ChatMessage[];
  settingsBtn: SettingsBtn;
  addBtn: Button;
  chatsList?: typeof ChatsList
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

    <div class="${styles.messages}">
      {{#each messages}}
        {{{ this }}}
      {{/each}}
    </div>

    <form class="${styles.messageForm}">
      <textarea name="message" required ></textarea>
      <button>send</button>
    </form>
  </div>
  <div class="${styles.contacts}">
    <div class="${styles.addChat}">
      {{{ addChatBtn }}}
      <input name="title" placeholder="chat title"></input>
    </div>
    <div class="${styles.settings}">
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
    const { messages, settingsBtn, addBtn, chatsList } = this.props;

    return this.compile(template, { messages, settingsBtn, addBtn, chatsList });
  }
}
