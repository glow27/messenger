import { settingsIdandInputSelector, settingsWithId } from "../consts";
import { ProfileField } from "../../components/ProfileField";
import { AvatarInput } from "../../components/AvatarInput";
import { Profile } from "../../components/Profile";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";

const profileFormFields = [
  {
    fieldLabel: "Nickname",
    fieldName: "display_name",
    settings: settingsIdandInputSelector,
  },
  {
    fieldLabel: "Email",
    fieldName: "email",
    settings: settingsIdandInputSelector,
  },
  {
    fieldLabel: "First name",
    fieldName: "first_name",
    settings: settingsIdandInputSelector,
  },
  {
    fieldLabel: "Second name",
    fieldName: "second_name",
    settings: settingsIdandInputSelector,
  },
  {
    fieldLabel: "Phone",
    fieldName: "phone",
    settings: settingsIdandInputSelector,
  },
  {
    fieldLabel: "Login",
    fieldName: "login",
    settings: settingsIdandInputSelector,
  },
  {
    fieldLabel: "Password",
    fieldName: "password",
    settings: settingsIdandInputSelector,
  },
  {
    fieldLabel: "Repeat password",
    fieldName: "repeatPass",
    settings: settingsIdandInputSelector,
  },
];

const avatar = new AvatarInput({});

const button = new Button({
  label: "SAVE",
  type: "submit",
  events: {
    click: () => console.log("ck"),
  },
  settings: settingsWithId,
});

const link = new Link({
  linkText: "Back to chat",
  href: "chat",
});

export const profileForm = new Profile({
  fields: profileFormFields.map((el) => new ProfileField(el)),
  avatar,
  button,
  link,
});
