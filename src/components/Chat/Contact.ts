import { Block } from '../../utils/block';

import styles from './chat.module.scss'

export interface ChatContactProps {
  lastMessage: string;
  imgSrc: string;
  name: string;
  date: string
}

const template = `
  <img src="{{ imgSrc }}"  alt="contactAva" />
  <div class="${styles.lastMessage}">
    <b>{{ name }}</b><span class="${styles.date}">{{ date }}</span>
    <div class="${styles.text}">{{ lastMessage }}</div>
  </div>`;

export class ChatContact extends Block<ChatContactProps> {
  constructor(props: ChatContactProps) {
    super('div', props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add(styles.chatContact);
  }

  render() {
    const { imgSrc, name, lastMessage, date } = this.props;

    return this.compile(template, { 
      lastMessage,
      imgSrc,
      name,
      date
    });
  }
}
