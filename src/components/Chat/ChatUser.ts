import { Block } from '../../utils/block';
import styles from './chat.module.scss'
import { CommonProps } from '../../types/common';

export type ChatUserProps = {
  imgSrc: string;
} & CommonProps

const template = `
  <img src="{{ imgSrc }}"  alt="contactAva" />
  <button>x</button>`;

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
      imgSrc: this.props.imgSrc
     })
  }
}
