import { Block } from '../../utils/block';

import styles from './chat.module.scss'

export type ChatMessageProps = {
  content?: string;
  isOwn: boolean;
  isCommon: boolean;
  isGuest: boolean;
  time: string
}

const template = '{{ content }}';

export class ChatMessage extends Block<ChatMessageProps> {
  constructor(props: ChatMessageProps) {
    super(props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add(styles.chatMessage);
    if (this.props.isOwn) currentElement?.classList.add(styles.ownMessage);
    if (this.props.isCommon) currentElement?.classList.add(styles.commonMessage);
    if (this.props.isGuest) currentElement?.classList.add(styles.guestMessage);
  }

  render() {
    const { content } = this.props;

    return this.compile(template, { content });
  }
}
