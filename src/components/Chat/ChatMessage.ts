import { Block } from '../../utils/block';
import styles from './chat.module.scss'

export interface ChatMessageProps {
  text: string;
}

const template = '{{ text }}';

export class ChatMessage extends Block<ChatMessageProps> {
  constructor(props: ChatMessageProps) {
    super('div', props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add(styles.chatMessage);
  }

  render() {
    const { text } = this.props;

    return this.compile(template, { text });
  }
}
