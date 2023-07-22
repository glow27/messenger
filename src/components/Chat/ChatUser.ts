import { Block } from '../../utils/block';
import styles from './chat.module.scss'
import { CommonProps } from '../../types/common';

export type ChatUserProps = {
  imgSrc: string;
  name: string;
} & CommonProps

const template = `
  <div><span>{{ name }}</span><button>x</button></div>
  <img src="{{ imgSrc }}"  alt="contactAva" />
  `;

export class ChatUser extends Block<ChatUserProps> {
  constructor(props: ChatUserProps) {
    super(props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add(styles.chatUser);
  }

  render() {
    return this.compile(template, { 
      imgSrc: this.props.imgSrc,
      name: this.props.name
     })
  }
}
