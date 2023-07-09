import { ChatContact, ChatContactProps } from '../../components/Chat/Contact';
import { submitFormValues } from '../../utils/helpers';
import { settingsIdandFormSelector } from '../consts';
import emptyAva from '../../../static/emptyAva.png';
import {
  ChatMessage,
  ChatMessageProps,
} from '../../components/Chat/ChatMessage';

const messages: ChatMessageProps[] = [{ text: 'hello111' }, { text: 'bye22' }];

const contacts: ChatContactProps[] = [
  {
    imgSrc: emptyAva,
    name: 'Vasya',
    lastMessage: 'asfdsadfa sadfadsfa',
    date: '11.11.88',
  },
  {
    imgSrc: emptyAva,
    name: 'Pety Petin',
    lastMessage: 'asfdsadfa sadfadsfa',
    date: '11.11.88',
  },
  {
    imgSrc: emptyAva,
    name: 'Adfas FFSASSD',
    lastMessage:
      'asfdsadfa sadfadsfa safdasdfasdf sadfsadf asd fdsfsdfddddsfads',
    date: '11.11.88',
  },
];

export const chatProps = {
  messages: messages.map((el) => new ChatMessage(el)),
  contacts: contacts.map((el) => new ChatContact(el)),
  settings: settingsIdandFormSelector,
  events: {
    submit: submitFormValues,
  },
};
