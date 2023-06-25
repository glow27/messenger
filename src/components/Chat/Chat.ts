import { CommonProps } from '../../types/common';
import { Block } from '../../utils/block';
import { ChatMessage } from './ChatMessage';
import styles from './chat.module.scss';
import settingsIcon from '../../../static/set.png';
import { ChatContact } from './Contact';

interface ChatProps extends CommonProps {
  messages: ChatMessage[]
  contacts: ChatContact[]
}

const template = `
  <div class="${styles.chat}">
    {{#each messages}}
      {{{ this }}}
    {{/each}}
    <form class="${styles.messageForm}">
      <textarea name="message"></textarea>
      <button>send</button>
    </form>
  </div>
  <div class="${styles.contacts}">
    <div class="${styles.settings}">
      <a href="profile"><button><img src=${settingsIcon} /></button></a>
      <input type="text" name="search" placeholder="search" />
    </div>
    {{#each contacts}}
      {{{ this }}}
    {{/each}}
  </div>`;

export class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super('div', props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add('centeredContainer');
  }

  render() {
    return this.compile(template, {messages: this.props.messages, contacts: this.props.contacts});
  }
}
