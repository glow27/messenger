import { Block } from '../../utils/block';
import styles from './chat.module.scss'
import { CommonProps } from '../../types/common';

export type ChatContactProps = {
  unread_count?: number;
  imgSrc: string;
  title: string;
  time: string;
  content: string;
} & CommonProps

const template = `
  {{#if unread_count}}<div class="${styles.count}">{{ unread_count }}</div>{{/if}}
  <img src="{{ imgSrc }}"  alt="contactAva" />
  <div class="${styles.lastMessage}">
    <b>{{ title }}</b>
    <span class="${styles.date}">{{ time }}</span>
    <div class="${styles.text}">{{ content }}</div>
  </div>`;

export class ChatContact extends Block<ChatContactProps> {
  constructor(props: ChatContactProps) {
    super(props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add(styles.chatContact);
  }

  render() {

    const {unread_count,
      imgSrc,
      title,
      time,
      content} = this.props

    return this.compile(template, { 
      unread_count,
      imgSrc,
      title,
      time,
      content
     })
  }
}
