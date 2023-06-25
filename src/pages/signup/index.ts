import { settingsIdandInputSelector, settingsWithId } from "../consts";
import { FormField } from "../../components/FormField";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { Form } from "../../components/Form";

const singupFormFields = [
  { fieldLabel: "Email", fieldName: "email", settings: settingsIdandInputSelector },
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
  { fieldLabel: "Phone", fieldName: "phone", settings: settingsIdandInputSelector },
  { fieldLabel: "Login", fieldName: "login", settings: settingsIdandInputSelector },
  { fieldLabel: "Password", fieldName: "password", settings: settingsIdandInputSelector },
  {
    fieldLabel: "Repeat password",
    fieldName: "repeatPass",
    settings: settingsIdandInputSelector,
  },
];

const button = new Button({
  label: "sign up",
  events: {
    click: () => console.log("ck"),
  },
  settings: settingsWithId,
});

const link = new Link({
  linkText: "Back to sign in",
  href: "signin",
});

export const signupForm = new Form({
  fields: singupFormFields.map((el) => new FormField(el)),
  formTitle: "SIGN UP",
  button,
  link,
});
