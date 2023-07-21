import { routes, settingsIdandFormSelector, settingsWithId } from '../consts';
import { SettingsBtn } from '../../components/Chat/SettingsBtn';
import { getFormValues } from '../../utils/helpers';
import { appRouter } from '../../utils/router';
import {
  ChatMessage,
  ChatMessageProps,
} from '../../components/Chat/ChatMessage';
import { Button } from '../../components/Button/Button';
import { ChatsList } from '../../components/Chat/ChatsList';
import ChatController from '../../controllers/ChatController';
import { UsersList } from '../../components/Chat/UsersList';

const messages: ChatMessageProps[] = [{ text: '111' },{ text: 'hello111' }, { text: 'bye22' } ,{ text: 'hello111' }, { text: 'bye22' }, { text: 'hello111' }, { text: 'bye22' },{ text: 'hello111' }, { text: 'bye22' },{ text: 'hello111' }, { text: 'bye22' },{ text: 'hello111' }, { text: '88888' }];

const goToProfile = () => {
  appRouter.go(routes.profile);
};

const addChat = async () => {
  const input = document.querySelector(
    'input[name="title"]'
  ) as HTMLInputElement;

  if (!input.value) {
    return;
  } else {
    const data = { title: input.value };
    ChatController.createChat({ data });
  }
};

const addUser = async () => {
  const input = document.querySelector(
    'input[name="userId"]'
  ) as HTMLInputElement;

  if (!input.value) {
    return;
  } else {
    ChatController.addChatUser(+input.value);
  }
};

const settingsBtn = new SettingsBtn({
  settings: settingsWithId,
  events: {
    click: goToProfile,
  },
});

const addChatBtn = new Button({
  label: 'add chat',
  settings: settingsWithId,
  events: {
    click: addChat,
  },
});

const addUserBtn = new Button({
  label: 'add user',
  settings: settingsWithId,
  events: {
    click: addUser,
  },
});

const chatsList = new ChatsList({
  settings: settingsWithId,
});

const usersList = new UsersList({
  settings: settingsWithId,
});

export const chatProps = {
  messages: messages.map((el) => new ChatMessage(el)),
  settings: settingsIdandFormSelector,
  settingsBtn,
  usersList,
  chatsList,
  addChatBtn,
  addUserBtn,
  events: {
    submit: async (e: Event) => {
      e.preventDefault();
      const data = getFormValues(e);
    },
  },
};
