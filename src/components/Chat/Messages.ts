import { CommonProps } from '../../types/common';
import { Block } from '../../utils/block';
import { State, withStore } from '../../utils/store';
import styles from './chat.module.scss';
import { ChatMessage } from './ChatMessage';
import { Message } from '../../api/MessagesApi';

type MessagesListProps = {
  messages: Message[],
  chatId?: number,
  userId?: number
} & CommonProps

const template = `
  {{#each messages}}
    {{{ this }}}
  {{/each}}`;


class BaseList extends Block<MessagesListProps> {
  constructor(props: MessagesListProps) {
    super(props);
  }

  async init() {
    const currentElement = this.getContent();
    currentElement?.classList.add(styles.messages);
  }

  protected componentDidUpdate(oldProps: MessagesListProps, newProps: MessagesListProps): boolean {
      if (oldProps.messages?.length === newProps.messages?.length && oldProps.chatId === newProps.chatId) return false

      this.children.messages = newProps.messages.map(el => {
        const isCommon = el.content === 'Chat connected!'
        const isOwn = el.user_id === newProps.userId && !isCommon
        const isGuest = !isCommon && !isOwn

        return new ChatMessage({content: el.content, time: el.time, isCommon, isGuest, isOwn})
      })

      return true
  }


  render() {

    return this.compile(template, {});
  }
}

function mapStateToProps(state: State) {
  return { messages: state.messages, chatId: state.currentChatId, userId: state.user?.id };
}

export const MessagesList = withStore(mapStateToProps)(BaseList as typeof Block);

