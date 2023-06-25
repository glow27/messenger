import { settingsIdandInputSelector, settingsWithId } from "../consts";
import { FormField } from "../../components/FormField";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { Form } from "../../components/Form";

const singinFormFields = [
  {
    fieldLabel: "Login",
    fieldName: "login",
    events: {
      blur: () => console.log("uk1"),
    },
    settings: settingsIdandInputSelector,
  },
  {
    fieldLabel: "Password",
    fieldName: "password",
    events: {
      click: () => console.log("fk2"),
    },
    settings: settingsIdandInputSelector,
  },
];

const button = new Button({
  label: "sign in",
  events: {
    click: () => console.log("fuck"),
  },
  settings: settingsWithId,
});

const link = new Link({
  linkText: "Create account",
  href: "signup",
});

export const signinForm = new Form({
  fields: singinFormFields.map((el) => new FormField(el)),
  formTitle: 'SIGN IN',
  button,
  link,
});
