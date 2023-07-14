import { CommonProps } from '../../types/common';
import { ChatMessage } from './ChatMessage';
import { Block } from '../../utils/block';
import { ChatContact } from './Contact';
import styles from './chat.module.scss';
import { Link } from '../Link/Link';

interface ChatProps extends CommonProps {
  messages: ChatMessage[]
  contacts: ChatContact[]
  link: typeof Link
}

const template = `
  <div class="${styles.chat}">
    {{#each messages}}
      {{{ this }}}
    {{/each}}
    <form class="${styles.messageForm}">
      <textarea name="message" required ></textarea>
      <button>send</button>
    </form>
  </div>
  <div class="${styles.contacts}">
    <div class="${styles.settings}">
      {{{ settingsBtn }}}
      <input type="text" name="search" placeholder="search" />
    </div>
    {{#each contacts}}
      {{{ this }}}
    {{/each}}
  </div>`;

export class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super(props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add('centeredContainer');
  }

  render() {
    const { messages, contacts, link } = this.props

    return this.compile(template, { messages, contacts, link });
  }
}
