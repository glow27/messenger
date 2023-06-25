import { Chat } from '../../components/Chat/Chat';
import { ChatMessage, ChatMessageProps } from '../../components/Chat/ChatMessage';
import { ChatContact, ChatContactProps } from '../../components/Chat/Contact';
import emptyAva from '../../../static/emptyAva.png';
import { SubmitFormValues, settingsIdandFormSelector } from '../consts';

// const link = new Link({
//   linkText: 'Back',
//   href: 'chat',
// });

const messages: ChatMessageProps[] = [
  {text: 'hello111'},
  {text: 'bye22'}
]

const contacts: ChatContactProps[] = [
  {imgSrc: emptyAva, name: 'Vasya', lastMessage: 'asfdsadfa sadfadsfa', date: '11.11.88'},
  {imgSrc: emptyAva, name: 'Pety Petin', lastMessage: 'asfdsadfa sadfadsfa', date: '11.11.88'},
  {imgSrc: emptyAva, name: 'Adfas FFSASSD', lastMessage: 'asfdsadfa sadfadsfa safdasdfasdf sadfsadf asd fdsfsdfddddsfads', date: '11.11.88'}
]

export const chatPage = new Chat({
  messages: messages.map((el) => new ChatMessage(el)),
  contacts: contacts.map((el) => new ChatContact(el)),
  settings: settingsIdandFormSelector,
  events: {
    submit: SubmitFormValues
  }
});
