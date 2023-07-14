import { ChatContact, ChatContactProps } from '../../components/Chat/Contact';
import { routes, settingsIdandFormSelector, settingsWithId } from '../consts';
import { SettingsBtn } from '../../components/Chat/SettingsBtn';
import emptyAva from '../../../static/emptyAva.png';
import { getFormValues } from '../../utils/helpers';
import { appRouter } from '../../utils/router';
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

const goToProfile = () => {
  appRouter.go(routes.profile)
};

const settingsBtn = new SettingsBtn({
  settings: settingsWithId,
  events: {
    click: goToProfile,
  },
});

export const chatProps = {
  messages: messages.map((el) => new ChatMessage(el)),
  contacts: contacts.map((el) => new ChatContact(el)),
  settings: settingsIdandFormSelector,
  settingsBtn,
  events: {
    submit: async (e: Event) => {
      e.preventDefault()
      const data = getFormValues(e)
    
    },
  },
};
