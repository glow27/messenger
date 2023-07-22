import { routes, settingsIdandFormSelector, settingsWithId } from '../consts';
import { SettingsBtn } from '../../components/Chat/SettingsBtn';
import { getFormValues } from '../../utils/helpers';
import { appRouter } from '../../utils/router';
import { Button } from '../../components/Button/Button';
import { ChatsList } from '../../components/Chat/ChatsList';
import ChatController from '../../controllers/ChatController';
import { UsersList } from '../../components/Chat/UsersList';
import MessagesController from '../../controllers/MessagesController';
import { MessagesList } from '../../components/Chat/Messages';

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

const sendMessage = async (e: Event) => {
  e.preventDefault();
  const data = getFormValues(e); 
  
  const form = e.target as HTMLFormElement
  form?.reset()

  await MessagesController.sendMessage(data.message)
};

const messagesList = new MessagesList({settings: settingsWithId,})

export const chatProps = {
  settings: settingsIdandFormSelector,
  settingsBtn,
  messagesList,
  usersList,
  chatsList,
  addChatBtn,
  addUserBtn,
  events: {
    submit: sendMessage
  },
};
